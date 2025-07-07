#!/usr/bin/env node
const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// 执行带超时的命令
function executeCommand(command, cwd = process.cwd(), timeout = 300000) { // 默认5分钟超时
  console.log(`\n[${new Date().toISOString()}] 执行命令: ${command} in ${cwd}`);
  console.log('='.repeat(80));
  
  return new Promise((resolve) => {
    const childProcess = exec(command, { cwd, encoding: 'utf8' }, (error, stdout, stderr) => {
      clearTimeout(timer);
      
      // 输出命令执行结果
      if (stdout) {
        console.log('命令输出:');
        console.log(stdout);
      }
      
      if (stderr) {
        console.error('命令错误输出:');
        console.error(stderr);
      }
      
      if (error) {
        console.error(`\n[${new Date().toISOString()}] ❌ 命令执行失败: ${command}`);
        console.error(`错误详情: ${error.message}`);
        console.log('='.repeat(80) + '\n');
        resolve({ success: false, error, stdout, stderr });
        return;
      }
      
      console.log(`\n[${new Date().toISOString()}] ✅ 命令执行成功: ${command}`);
      console.log('='.repeat(80) + '\n');
      resolve({ success: true, stdout, stderr });
    });

    // 实时输出命令执行过程
    if (childProcess.stdout) {
      childProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
      });
    }
    
    if (childProcess.stderr) {
      childProcess.stderr.on('data', (data) => {
        process.stderr.write(data);
      });
    }

    const timer = setTimeout(() => {
      console.error(`\n[${new Date().toISOString()}] ⏱️  命令执行超时: ${command}`);
      childProcess.kill();
      console.log('='.repeat(80) + '\n');
      resolve({ 
        success: false, 
        error: new Error(`Command timed out after ${timeout/1000} seconds`),
        timedOut: true
      });
    }, timeout);
  });
}

// 提示用户输入OTP验证码
async function getOTP() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise(resolve => {
    readline.question('请输入npm的OTP验证码: ', code => {
      readline.close();
      resolve(code.trim());
    });
  });
}

// 主函数
async function main() {
  let currentRegistry = 'npm'; // 默认值
  let otp = ''; // 存储OTP验证码
  try {
    console.log('Starting package publishing process...');
    
    // 1. 获取当前registry
    console.log('\n=== 保存当前registry ===');
    const registryOutput = execSync('nrm current', { encoding: 'utf8' }).trim();
    // 处理nrm current的输出格式
    currentRegistry = registryOutput.replace('You are using npm registry.', '').trim() || 'npm';
    console.log(`当前registry: ${currentRegistry}`);

    // 2. 切换到npm registry
    console.log('\n=== 切换到npm registry ===');
    await executeCommand('nrm use npm');

    // 3. 读取lerna.json
    console.log('\n=== 读取lerna.json ===');
    const lernaConfigPath = path.join(__dirname, '..', 'lerna.json');
    const lernaConfig = JSON.parse(fs.readFileSync(lernaConfigPath, 'utf8'));
    const packages = lernaConfig.packages || [];
    
    if (packages.length === 0) {
      console.log('lerna.json中没有找到任何包');
      return;
    }

    console.log(`找到 ${packages.length} 个需要发布的包`);

    // 在开始发布前获取一次OTP
    console.log('\n=== 准备发布包 ===');
    otp = await getOTP();
    
    // 发布每个包
    for (const pkgPath of packages) {
      const fullPath = path.join(process.cwd(), pkgPath);
      console.log('\n' + '='.repeat(50));
      console.log(`开始发布包: ${pkgPath}`);
      console.log('='.repeat(50));
      
      // 检查package.json是否存在
      const packageJsonPath = path.join(fullPath, 'package.json');
      if (!fs.existsSync(packageJsonPath)) {
        console.log(`⚠️ 跳过 ${pkgPath}: 未找到package.json`);
        continue;
      }

      // 读取包信息
      const packageInfo = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      console.log(`包名: ${packageInfo.name}@${packageInfo.version}`);

      try {
        // 发布包
        console.log('\n开始发布...');
        const { success, error } = await executeCommand(`npm publish --access public --otp=${otp}`, fullPath);
        
        if (success) {
          console.log(`✅ 成功发布 ${pkgPath}`);
        } else {
          console.error(`❌ 发布失败 ${pkgPath}`);
          if (error) console.error(`错误详情: ${error.message}`);
          // 继续发布下一个包
        }
      } catch (err) {
        console.error(`❌ 发布过程中发生错误: ${err.message}`);
      }
    }

    console.log('\n' + '='.repeat(30));
    console.log('所有包发布完成');
    console.log('='.repeat(30));

  } catch (error) {
    console.error('\n❌ 发布过程中发生错误:', error.message);
    process.exit(1);
  } finally {
    // 5. 恢复原始registry
    if (currentRegistry) {
      console.log('\n=== 恢复原始registry ===');
      try {
        await executeCommand(`nrm use ${currentRegistry}`);
        console.log(`✅ 已恢复registry到: ${currentRegistry}`);
      } catch (err) {
        console.error(`❌ 恢复registry失败: ${err.message}`);
      }
    }
  }
}

// Run the script
main();
