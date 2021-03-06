import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { WatchImageProgress } from "../model/watchFace.model";
import { ImageProgressDisplayType } from "../model/types.model";

export default function drawImageProgress(ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    imageProgress: WatchImageProgress,
    value: number, total: number) {
        if (total === null) return
        if (imageProgress.enabled && imageProgress.json.ImageSet?.ImageIndex) {
            if ( imageProgress.json.Coordinates) {

                let count = imageProgress.json.ImageSet.ImagesCount-1
                let coors = imageProgress.json.Coordinates

                let s = Math.ceil(value / (total / count))
                if (s > count) s = count

                if (value > total) value = total

                let initial = 0
                if (imageProgress.json.DisplayType !== ImageProgressDisplayType.Continuous.json)
                    initial = s

                for (let i = initial; i <= s; i++) {
                    let x = i < coors?.length ? (coors[i]?.X ? coors[i].X : 0) : (coors[coors.length-1]?.X ? coors[coors.length-1].X : 0)
                    let y = i < coors?.length ? (coors[i]?.Y ? coors[i].Y : 0) : (coors[coors.length-1]?.Y ? coors[coors.length-1].Y : 0)
                    let imageIndex = imageProgress.json.ImageSet.ImageIndex + i
                    const img = findImageById(imageIndex, images)
                    if (img) ctx.drawImage(img, x, y, img.width, img.height);
                }
            }
        }
}