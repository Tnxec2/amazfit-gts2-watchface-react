import Color from "../shared/color";
import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { Background } from "../model/watchFace.model";
  
export default function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, 
                images: IImage[], background: Background) {
    if (background?.imageIndex !== undefined && background?.imageIndex !== null) {
        const i = findImageById(background.imageIndex, images)
        if (i) {
            const img = i
            ctx.drawImage(img, 0, 0, img.width, img.height);
        }
    } else if (background.color && Color.GFG_Fun(background.color)) {
        ctx.fillStyle = background.color
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}
