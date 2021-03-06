import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow, OptionsUnitSystemFont } from "../../model/blocks.model";
import { Coordinates, ImageCoord, SystemFont } from "../../model/json.model";
import { FollowType } from "../../model/types.model";
import { WatchCommonDigit } from "../../model/watchFace.model";
import Color from "../../shared/color";

interface IProps {
  title: string;
  digit: WatchCommonDigit;
  onUpdate(digit: WatchCommonDigit): void;
  showNoData?: boolean;
  showDecimalPointer?: boolean;
  showDelimiter?: boolean;
  paddingZeroFix?: boolean;
  followDisabled?: boolean;
  onCopyFromNormal?(): void
}

const SystemFontComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
  paddingZeroFix,
  onCopyFromNormal,
  followDisabled
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'X', type: BlockType.Number, nvalue: digit.json?.Digit?.SystemFont?.Coordinates?.X ? digit.json.Digit.SystemFont.Coordinates.X : 0, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: digit.json?.Digit?.SystemFont?.Coordinates?.Y ? digit.json.Digit.SystemFont.Coordinates.Y : 0, onChange: onChangeY },
        { title: 'Color', type: BlockType.Color, svalue: digit.json?.Digit?.SystemFont?.Color ? Color.colorRead(digit.json.Digit.SystemFont.Color) : Color.DEFAULT_COLOR, onChange: onChangeColor },
      ]
    },
    {
      blocks: [
        { title: 'Size', type: BlockType.Number, nvalue: digit.json?.Digit?.SystemFont?.Size ? digit.json.Digit.SystemFont.Size : 0, onChange: onChangeSize },
        { title: 'Angle', type: BlockType.Number, nvalue: digit.json?.Digit?.SystemFont?.Angle ? digit.json.Digit.SystemFont.Angle : 0, onChange: onChangeAngle },
      ]
    },
    {
      blocks: [
        { title: 'padding zero', type: BlockType.Checkbox, checked: digit.json?.Digit?.PaddingZero || paddingZeroFix, onChange: onChangePaddingZero, disabled: paddingZeroFix },
        { title: 'follow', type: BlockType.Checkbox, checked: digit.json?.CombingMode !== FollowType.Single.json, onChange: onChangeFollow, disabled: followDisabled },
        { title: 'spacing', type: BlockType.Number, nvalue: digit.json?.Digit?.Spacing ? digit.json.Digit.Spacing : 0, onChange: onChangeSpacing },
      ]
    },
    {
      blocks: [
        { title: 'Unit', type: BlockType.Select, svalue: digit.json?.Digit?.SystemFont?.ShowUnitCheck ? digit.json?.Digit?.SystemFont.ShowUnitCheck?.toString() : '0', onChange: onChangeUnitCheck, selectOptions: OptionsUnitSystemFont },
        { title: 'Separator', type: BlockType.Checkbox, checked: digit.json?.Separator ? true : false, onChange: onChangeSeparator },
      ]
    }
  ], [digit])  // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeColor(color: string) {
      const d = { ...digit };
      d.json.Digit.SystemFont.Color = Color.colorWrite(color);
      onUpdate(d);
  }

  function onChangeX(val: number) {
    const d = {...digit};
    d.json.Digit.SystemFont.Coordinates.X = val;
    onUpdate(d);
  }

  function onChangeY(val: number) {
    const d = {...digit};
    d.json.Digit.SystemFont.Coordinates.Y = val;
    onUpdate(d);
  }

  function onChangePaddingZero(val: boolean) {
    const d = {...digit};
    d.json.Digit.PaddingZero = val;
    onUpdate(d);
  }
  function onChangeFollow(checked: boolean) {
    const d = {...digit};
    d.json.CombingMode = checked ? FollowType.Follow.json : FollowType.Single.json;
    onUpdate(d);
  }

  function onChangeSpacing(val: number) {
    const d = {...digit};
    d.json.Digit.Spacing = val;
    onUpdate(d);
  }

  function onChangeSize(val: number) {
    const d = {...digit};
    d.json.Digit.SystemFont.Size = val;
    onUpdate(d);
  }

  function onChangeAngle(val: number) {
    const d = {...digit};
    d.json.Digit.SystemFont.Angle = val;
    onUpdate(d);
  }

  function onChangeSeparator() {
    const d = {...digit};
    if ( d.json.Separator) 
      d.json.Separator = null
    else {
      d.json.Separator = new ImageCoord()
      d.json.Separator.Coordinates.X = -1
      d.json.Separator.Coordinates.Y = -1
    }
    onUpdate(d);
  }

  function onChangeUnitCheck(val: string) {
    const d = {...digit};
    d.json.Digit.SystemFont.ShowUnitCheck = parseInt(val);
    onUpdate(d);
  }
 

  return (
    <Card>
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">{title}</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={digit.enabledSystemFont}
              onChange={() => {
                const d = { ...digit };
                d.enabledSystemFont = !d.enabledSystemFont;
                d.enabled = d.enabledImage || d.enabledSystemFont || d.enabledSystemFontCircle
                if ( !d.json.Digit.SystemFont) {
                  d.json.Digit.SystemFont = new SystemFont()
                  d.json.Digit.SystemFont.Coordinates = new Coordinates()
                }
                onUpdate(d);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {digit.enabledSystemFont ? (
        <Card.Body>
          { !onCopyFromNormal ? '' : <div style={{clear:'both'}}><button className='btn btn-sm btn-secondary mb-1' style={{float:'right'}} onClick={onCopyFromNormal}>Copy from normal screen</button></div> }
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default SystemFontComponent;
