import { IImage } from "../model/image.model";
import { ActivityType, FollowType } from "../model/types.model";
import { WatchActivity } from "../model/watchFace.model";
import { WatchState } from "../model/watchState";
import drawDigit from "./digit.element";
import drawImageCoords from "./imageCoords.element";
import drawImageProgress from "./imageProgress.element";
import drawProgressBarCircle from "./progressBarCircle.element";
import drawProgressBarLinear from "./progressBarLinear.element";
import drawclockhand from "./clockHand.element";
import { getSystemFontText } from "./systemfont.element";
import { oneCoordinates } from "../model/json.model";
import { findImageById } from "../shared/helper";

interface IDigitDraw {
    cur: {
        value: number,
        total: number
    },
    min: {
        value: number,
        total: number
    },
    max: {
        value: number,
        total: number
    },
    imageProgress: {
        value: number,
        total: number
    }
}

export default function drawActivityList(
    ctx: CanvasRenderingContext2D, 
    images: IImage[],
    activitys: WatchActivity[],
    watchState: WatchState,
    digitBorder: boolean,
    mainScreen: boolean = false
    ) {
        let val = 0
        let total = 0
        if (!activitys) return

        let weatherIconCenterX = 0
        let weatherTemperatureActivityIndex: number;
        if ( mainScreen) {
            activitys.forEach((activity, index) => {
                if (activity.type === ActivityType.Weather) {
                    if (activity.digit.enabledImage) {
                        weatherTemperatureActivityIndex = index
                    }
                    if (activity.imageProgress.enabled && activity.imageProgress.json?.ImageSet?.ImageIndex &&
                        activity.imageProgress.json?.Coordinates && oneCoordinates(activity.imageProgress.json.Coordinates)
                        ) {

                        let imageIndexWeather = activity.imageProgress.json.ImageSet.ImageIndex;
                        let _image_x = activity.imageProgress.json.Coordinates[0].X;
                        let img = findImageById(imageIndexWeather, images);
                        if (img) {
                            weatherIconCenterX = _image_x + img.width / 2;
                            if ( weatherTemperatureActivityIndex && index >= weatherTemperatureActivityIndex) weatherIconCenterX = 0;
                        }
                    }
                }
            }) 
        }

        activitys.forEach((activity) => {
            switch (activity.type) {
                case ActivityType.Battery:
                    val = watchState.battery
                    total = watchState.batteryGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total }, 
                        min: null, 
                        max: null, 
                        imageProgress: { value: val, total: total}}, 
                        digitBorder)
                    break;
                case ActivityType.Steps:
                    val = watchState.steps
                    total = watchState.stepsGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total }, 
                        min: { value: total, total: null }, 
                        max: null, 
                        imageProgress: { value: val, total: total}}, digitBorder)
                    break;
                case ActivityType.Calories:
                    val = watchState.calories
                    total = watchState.caloriesGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total }, 
                        min: { value: total, total: null }, 
                        max: null, 
                        imageProgress: { value: val, total: total}}, digitBorder)
                    break;
                case ActivityType.HeartRate:
                    val = watchState.hearthrate
                    total = watchState.hearthrateGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total }, 
                        min: null, 
                        max: null, 
                        imageProgress: { value: val, total: total}}, digitBorder)
                    break;
                case ActivityType.Pai:
                    val = watchState.pai
                    total = watchState.paiGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total }, 
                        min: null, 
                        max: null, 
                        imageProgress: { value: val, total: total}}, digitBorder)
                    break;
                case ActivityType.Distance:
                    val = watchState.distance
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: null }, 
                        min: null,
                        max: null, 
                        imageProgress: null}, digitBorder)
                    break;
                case ActivityType.StandUp:
                    val = watchState.standup
                    total = watchState.standupGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total },
                        min: { value: total, total: null }, 
                        max: null, 
                        imageProgress: { value: val, total: total}}, digitBorder)
                    break;
                case ActivityType.Weather:
                    drawActivity(ctx, images, activity, {
                        cur: { value: watchState.temperature, total: null },
                        min: { value: watchState.temperatureMin, total: null }, 
                        max: { value: watchState.temperatureMax, total: null }, 
                        imageProgress: { value: watchState.weatherIcon, total: 29}},
                        digitBorder, weatherIconCenterX)
                        break;
                case ActivityType.UVindex:
                    val = watchState.uvIndex
                    total = watchState.uvIndexGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total }, 
                        min: { value: total, total: null },
                        max: null, 
                        imageProgress: { value: val, total: total}}, 
                        digitBorder)
                    break;
                case ActivityType.AirQuality:
                    val = watchState.airQuality
                    total = watchState.airQualityGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total }, 
                        min: { value: total, total: null }, 
                        max: null, 
                        imageProgress: { value: val, total: total}}, 
                        digitBorder)
                    break;
                case ActivityType.Humidity:
                    val = watchState.humidity
                    total = watchState.humidityGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total }, 
                        min: { value: total, total: null }, 
                        max: null,
                        imageProgress: { value: val, total: total}}, 
                        digitBorder)
                    break;
                case ActivityType.Sunrise:
                    drawActivity(ctx, images, activity, { 
                        cur: { value: watchState.sunrise, total: null }, 
                        min: { value: watchState.sunrise, total: null }, 
                        max: { value: watchState.sunset, total: null }, 
                        imageProgress: { value: 1, total: 2}}, 
                        digitBorder)
                    break;
                case ActivityType.WindForce:
                    val = watchState.windForce
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: null }, 
                        min: null, 
                        max: null, 
                        imageProgress: { value: val, total: null}}, 
                        digitBorder)
                    break;
                case ActivityType.AirPressure:
                    val = watchState.airPressure
                    total = watchState.airPressureGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total }, 
                        min: null, 
                        max: null, 
                        imageProgress: { value: val, total: total}}, 
                        digitBorder)
                    break;
                case ActivityType.Stress:
                    val = watchState.stress
                    total = watchState.stressGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total }, 
                        min: null, 
                        max: null, 
                        imageProgress: { value: val, total: total}}, 
                        digitBorder)
                    break;
                case ActivityType.ActivityGoal:
                    val = watchState.steps
                    total = watchState.stepsGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total }, 
                        min: { value: total, total: null }, 
                        max: null, 
                        imageProgress: { value: val, total: total}}, 
                        digitBorder)
                    break;
                case ActivityType.FatBurning:
                    val = watchState.fatBurning
                    total = watchState.fatBurningGoal
                    drawActivity(ctx, images, activity, { 
                        cur: { value: val, total: total }, 
                        min: { value: total, total: null }, 
                        max: null, 
                        imageProgress: { value: val, total: total}}, 
                        digitBorder)
                    break;
                default:
                    break;
            }
        });
}

function drawActivity(
    ctx: CanvasRenderingContext2D, images: IImage[], a: WatchActivity, 
    values: IDigitDraw, digitBorder: boolean, weatherIconCenterX?: number) {
    let followXY = null

    if (a.imageProgress.enabled) {
        drawImageProgress(ctx, images, a.imageProgress, values.imageProgress.value, values.imageProgress.total)
    }
    if (a.progressBar.enabledLinear) {
        drawProgressBarLinear(ctx, images, a.progressBar, values.cur.value, values.cur.total)
    }
    if (a.progressBar.enabledCircle) {
        drawProgressBarCircle(ctx, images, a.progressBar, values.cur.value, values.cur.total)
    }
    if (a.pointerProgress.enabled) {
        drawclockhand(ctx, images, a.pointerProgress, values.cur.value, values.cur.total)
    }
    if (a.icon.enabled) {
        drawImageCoords(ctx, images, a.icon.json)
    }
    if (a.digit?.enabled) {
        followXY = drawDigit(ctx, images, a.digit, values.cur.value, 
            followXY, digitBorder, 
            false, getSystemFontText(a.digit, values.cur.value), weatherIconCenterX)
    }
    if (a.digitMin?.enabled && values.min) {
        followXY = drawDigit(ctx, images, a.digitMin, values.min.value, 
            a.digitMin.json.CombingMode === FollowType.Single.json ? null : followXY, digitBorder, 
            false, getSystemFontText(a.digitMin, values.min.value))
    }
    if (a.digitMax?.enabled && values.max) {
        drawDigit(ctx, images, a.digitMax, values.max.value, 
            a.digitMax.json.CombingMode === FollowType.Single.json ? null : followXY, digitBorder, 
            false, 
            getSystemFontText(a.digitMax, values.max.value))
    }
}
