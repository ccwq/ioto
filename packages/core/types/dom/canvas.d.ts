/**
 * 在画布上绘制旋转后的图像
 *
 * @param {CanvasRenderingContext2D} ctx - 绘图上下文对象
 * @param {HTMLImageElement} image - 要绘制的图像对象
 * @param {number} x - 图像中心点的x坐标
 * @param {number} y - 图像中心点的y坐标
 * @param {number} angleInRadians - 图像旋转的角度（弧度制）
 */
export declare function drawRotatedImage(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, angleInRadians: number): void;
