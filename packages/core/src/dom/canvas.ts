/**
 * 在画布上绘制旋转后的图像
 *
 * @param {CanvasRenderingContext2D} ctx - 绘图上下文对象
 * @param {HTMLImageElement} image - 要绘制的图像对象
 * @param {number} x - 图像中心点的x坐标
 * @param {number} y - 图像中心点的y坐标
 * @param {number} angleInRadians - 图像旋转的角度（弧度制）
 */

export function drawRotatedImage(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    x: number, y: number, angleInRadians: number
) {
    var width = image.width; // 获取图像宽度
    var height = image.height; // 获取图像高度

    ctx.save(); // 保存当前的绘图状态，以便之后可以恢复

    // 将画布的坐标系中心移动到图像的中心点
    ctx.translate(x, y);
    // 旋转画布，以图像中心点为旋转点
    ctx.rotate(angleInRadians);
    // 绘制图像，先移动图像到画布中心的负坐标，确保图像以中心点旋转
    ctx.drawImage(image, -width / 2, -height / 2, width, height);

    ctx.restore(); // 恢复之前保存的绘图状态
}
