const axios = require('axios');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');

export async function downloadAndOpenFile(url) {
    try {
        const originUrl = decodeURI(url);
        const extension = path.extname(originUrl).toLowerCase();
        const response = await axios.get(encodeURI(originUrl), { responseType: 'stream' });
        const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'download-'));
        const filePath = path.join(tempDir, 'downloaded_file.' + extension);
        const fileStream = fs.createWriteStream(filePath);
        response.data.pipe(fileStream);
        return new Promise((resolve, reject) => {
            fileStream.on('finish', () => {
                // File download is complete
                fileStream.close();
                exec(`start ${filePath}`, {encoding: 'utf8'}, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(null);
                    }
                });
            });
            fileStream.on('error', (error) => {
                reject(error);
            });
        });
    } catch (error) {
        throw new Error('Failed to download and open file: ' + error.message);
    }
}
