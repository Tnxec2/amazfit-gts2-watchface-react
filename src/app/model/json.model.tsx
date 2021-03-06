import Color from "../shared/color";
import { AlignmentType, FollowType, ImageProgressDisplayType, LangCodeType } from "./types.model";


export class DeviceId {
  DeviceId: number;
}

export class Background {
  Preview: MultilangImage[] = [];
  BackgroundImageIndex: number;
  Color: string;
}

export class Coordinates {
  X: number = 0;
  Y: number = 0;
}

export class ImageSetGTR2 {
  ImageIndex: number = null;
  ImagesCount: number = 1;
}

export class ScreenNormal {
  DigitalDialFace: DigitalDialFace;
  AnalogDialFace: AnalogDialFace;
  ProgressDialFace: ProgressDialFace;
}

export class System {
  Status: Status;
  Date: Date;
  Activity: Activity[];
}

export class Widgets {
  Widget: Widget[];
  TopMaskImageIndex: number;
  UnderMaskImageIndex: number;
  Unknown4: number = 0;
}

export class ScreenIdle {
  DialFace: ScreenNormal;
  Date: Date;
  Activity: Activity[];
  BackgroundImageIndex: number;
}

export class ImageCoord {
  Coordinates: Coordinates = new Coordinates();
  ImageIndex: number = null;
  ImageIndex2: number = null;
  ImageIndex3: number = null;
}

export class Widget {
  X: number = 0;
  Y: number = 0;
  Width: number = 0;
  Height: number = 0;
  WidgetElement: WidgetElement[] = [];
  BorderActivImageIndex: number;
  BorderInactivImageIndex: number;
  DescriptionImageBackground: ImageCoord = new ImageCoord();
  DescriptionWidthCheck: number = 0;
}

export class WidgetElement {
  Preview: MultilangImage[] = [];
  Date: Date;
  Activity: Activity[];
}

export class Date {
  DateDigits: DigitalDigit[];
  WeeksDigits: DigitalDigit;
  DateClockHand: DateClockHand;
  DateProgressBar: DateProgressBar;
}

export class DateProgressBar {
  MonthProgressBar: ProgressBar;
  DayProgressBar: ProgressBar;
  WeekDayProgressBar: ProgressBar;
}

export class Status {
  Bluetooth: ImageCoord;
  DoNotDisturb: ImageCoord;
  Lock: ImageCoord;
  Alarm: ImageCoord;
}

export class Activity {
  Type: string;
  PointerProgress: ClockHand;
  ProgressBar: ProgressBar;
  ImageProgress: ImageProgress;
  Digits: DigitalDigit[];
  Shortcut: Shortcut;
  Icon: ImageCoord;
}

export class Shortcut {
  BoxElement: BoxElement;
  ImageIndex: number;
}

export class BoxElement {
  TopLeftX: number;
  TopLeftY: number;
  Width: number;
  Height: number;
}

export class ImageProgress {
  Coordinates: Coordinates[] = [];
  ImageSet = new ImageSetGTR2();
  DisplayType: string = ImageProgressDisplayType.Single.json;
}

export class ProgressDialFace {
  Hours: ProgressBar;
  Minutes: ProgressBar;
  Seconds: ProgressBar;
}

export class ProgressBar {
  AngleSettings: AngleSettings;
  LinearSettings: LinearSettings;
  ForegroundImageIndex: number;
  Color: string;
  Width: number;
  Flatness: number;
  PointerImageIndex: number;
  BackgroundImageIndex: number;
}

export class LinearSettings {
  StartX: number = 0;
  StartY: number = 0;
  EndX: number = 0;
  EndY: number = 0;
  Unknown5: number;
}

export class AngleSettings {
  X: number = 0;
  Y: number = 0;
  StartAngle: number = 0;
  EndAngle: number = 360;
  Radius: number = 0;
}

export class AnalogDialFace {
  Hours: ClockHand;
  Minutes: ClockHand;
  Seconds: ClockHand;
}

export class DateClockHand {
  MonthClockHand: ClockHand;
  DayClockHand: ClockHand;
  WeekDayClockHand: ClockHand;
}

export class ClockHand {
  X: number;
  Y: number;
  Scale: MultilangImageCoord;
  Pointer: ImageCoord;
  Cover: ImageCoord;
  StartAngle: number;
  EndAngle: number;
  Unknown16: number;
}

export class DigitalDialFace {
  Digits: DigitalDigit[];
  AM: MultilangImageCoord;
  PM: MultilangImageCoord;
}

export class MultilangImageCoord {
  Coordinates: Coordinates = new Coordinates();
  ImageSet: MultilangImage[] = [
    {
      LangCode: LangCodeType.All.json,
      ImageSet: {
        ImageIndex: null,
        ImagesCount: 1
      }
    }
  ];
}

export class Text {
  Image: Image;
  SystemFont: SystemFont;
  Alignment: string = AlignmentType.Left.json;
  Spacing: number = 0;
  PaddingZero: boolean = false;
  DisplayFormAnalog: boolean = false;
}

export class Image {
  X: number = 0;
  Y: number = 0;
  NoDataImageIndex: number = null;
  MultilangImage: MultilangImage[] = [
    {
      LangCode: LangCodeType.All.json,
      ImageSet: {
        ImageIndex: null,
        ImagesCount: 1
      }
    }
  ];
  DecimalPointImageIndex: number = null;
  MultilangImageUnit: MultilangImage[];
  DelimiterImageIndex: number = null;
  MultilangImageUnitMile: MultilangImage[];
}

export class SystemFont {
  FontRotate: FontRotate;
  Coordinates: Coordinates;
  Angle: number = 0;
  Size: number = 20;
  Color: string =  Color.colorWrite("#000000");
  ShowUnitCheck: number = -1;
}


export class FontRotate {
  X: number = 0;
  Y: number = 0;
  Radius: number = 0;
  RotateDirection: number = 0;
}

export class DigitalDigit {
  Type: string;
  TimeType: string;
  DateType: string;
  CombingMode: string = FollowType.Single.json;
  Digit: Text = new Text();
  Separator: ImageCoord;
}

export class MultilangImage {
  LangCode: string = LangCodeType.All.json;
  ImageSet: ImageSetGTR2 = new ImageSetGTR2();
}

export class WatchJson {
  Info: DeviceId;
  Background: Background;
  DialFace: ScreenNormal;
  System: System;
  Widgets: Widgets;
  ScreenIdle: ScreenIdle;
}

export function oneCoordinates(coordinates: Coordinates[]): Boolean {
    if (coordinates.length === 1) return true;
    let result = true;
    let x = coordinates[0].X;
    let y = coordinates[0].Y;
    coordinates.forEach( (coordinate) => {
        if (x !== coordinate.X || y !== coordinate.Y) result = false;
    })
    return result;
}