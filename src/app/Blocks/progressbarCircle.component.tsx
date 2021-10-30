import React, { FC } from "react";
import { Card } from "react-bootstrap";
import Color from "../shared/color";
import SelectFileListComponent from "../shared/selectFileList.component";
import { AngleSettings, ProgressBar } from "../model/json.model";
import { WatchProgressBar } from "../model/watchFace.model";

interface IProps {
  progressBar: WatchProgressBar;
  onUpdate(progressBar: WatchProgressBar): void;
}

const ProgressbarCircleCodmponent: FC<IProps> = ({ progressBar, onUpdate }) => {
  function changeLineEnding(e: React.ChangeEvent<HTMLSelectElement>) {
    const pBar = { ...progressBar };
    const value = parseInt(e.target.value);
    if (!isNaN(value)) pBar.jsonObj.Flatness = value;
    else pBar.jsonObj.Flatness = 0;
    onUpdate(pBar);
  }

  function toggle() {
    const pb = { ...progressBar };
    pb.enabledCircle = !pb.enabledCircle;
    if (!pb.jsonObj)
      pb.jsonObj = new ProgressBar();
    if (!pb.jsonObj.AngleSettings)
      pb.jsonObj.AngleSettings = new AngleSettings();
    onUpdate(pb);
  }

  function changeX(e) {
    const d = { ...progressBar };
    const v = parseInt(e.target.value);
    if (!isNaN(v)) {
      d.jsonObj.AngleSettings.X = v;
      onUpdate(d);
    }
  }

  function changeY(e) {
    const d = { ...progressBar };
    const v = parseInt(e.target.value);
    if (!isNaN(v)) {
      d.jsonObj.AngleSettings.Y = v;
      onUpdate(d);
    }
  }

  function changeRadius(e) {
    const d = { ...progressBar };
    const v = parseInt(e.target.value);
    if (!isNaN(v)) {
      d.jsonObj.AngleSettings.Radius = Math.abs(v);
      onUpdate(d);
    }
  }

  function changeWidth(e) {
    const d = { ...progressBar };
    const v = parseInt(e.target.value);
    if (!isNaN(v)) {
      d.jsonObj.Width = Math.max(0, Math.min(v, 100));
      onUpdate(d);
    }
  }

  function changeStartAngle(e) {
    const d = { ...progressBar };
    const v = parseInt(e.target.value);
    if (!isNaN(v)) {
      d.jsonObj.AngleSettings.StartAngle = v;
      onUpdate(d);
    }
  }

  function changeEndAngle(e) {
    const d = { ...progressBar };
    const v = parseInt(e.target.value);
    if (!isNaN(v)) {
      d.jsonObj.AngleSettings.EndAngle = v;
      onUpdate(d);
    }
  }

  function changeForegroundImageIndex(i: number) {
    const ip = { ...progressBar };
    ip.jsonObj.ForegroundImageIndex = i;
    onUpdate(ip);
  }

  function changeColor(e) {
    const d = { ...progressBar };
    d.jsonObj.Color = Color.colorWrite(e.target.value);
    onUpdate(d);
  }

  function changePointerImageIndex(i: number) {
    const ip = { ...progressBar };
    ip.jsonObj.PointerImageIndex = i;
    onUpdate(ip);
  }

  function changeBackgroundImageIndex(i: number) {
    const ip = { ...progressBar };
    ip.jsonObj.BackgroundImageIndex = i;
    onUpdate(ip);
  }

  return (
    <Card>
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">Progress circle</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={progressBar.enabledCircle}
              onChange={toggle}
            />
          </div>
        </div>
      </Card.Header>
      {progressBar.enabledCircle ? (
        <Card.Body>
          <div className="input-group input-group-sm flex-nowrap mb-1 mt-1">
            <span className="input-group-text" id="addon-wrapping">
              Center
            </span>
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={progressBar.jsonObj.AngleSettings.X}
              onChange={changeX}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={progressBar.jsonObj.AngleSettings.Y}
              onChange={changeY}
            />
          </div>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text" id="addon-wrapping">
              Radius
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={progressBar.jsonObj.AngleSettings.Radius}
              onChange={changeRadius}
            />
            <span className="input-group-text" id="addon-wrapping">
              Width
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              min="0"
              max="100"
              value={progressBar.jsonObj.Width}
              onChange={changeWidth}
            />
            <span className="input-group-text" id="addon-wrapping">
              Start angle
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={progressBar.jsonObj.AngleSettings.StartAngle}
              onChange={changeStartAngle}
            />
            <span className="input-group-text" id="addon-wrapping">
              End angle
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={progressBar.jsonObj.AngleSettings.EndAngle}
              onChange={changeEndAngle}
            />
          </div>
          <div className="input-group input-group-sm mb-1">
            <SelectFileListComponent
              title='Foreground image'
              setSelectedFileIndex={changeForegroundImageIndex}
              imageIndex={progressBar.jsonObj.ForegroundImageIndex}
            />
            <span className="input-group-text">Color</span>
            <div className="input-group-text">
              <input
                type="color"
                className="form-control form-control-sm"
                style={{ width: 40 }}
                value={Color.colorRead(progressBar.jsonObj.Color)}
                onChange={changeColor}
                defaultValue="#000000"
                title="Choose progress bar color"
              />
            </div>
            <span className="input-group-text" id="addon-wrapping">
              Line ending
            </span>
            <div className="input-group-text">
              <select
                className="form-select form-select-sm"
                onChange={changeLineEnding}
              >
                <option value="0" selected={progressBar.jsonObj.Flatness === 0}>
                  Circle
                </option>
                <option
                  value="90"
                  selected={progressBar.jsonObj.Flatness === 90}
                >
                  Triangle
                </option>
                <option
                  value="180"
                  selected={progressBar.jsonObj.Flatness === 180}
                >
                  Flat
                </option>
              </select>
            </div>
          </div>
          <div className="input-group input-group-sm mb-1">
            <SelectFileListComponent
              title='Pointer'
              setSelectedFileIndex={changePointerImageIndex}
              imageIndex={progressBar.jsonObj.PointerImageIndex}
            />
            <SelectFileListComponent
              title='Background image'
              setSelectedFileIndex={changeBackgroundImageIndex}
              imageIndex={progressBar.jsonObj.BackgroundImageIndex}
            />
          </div>
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ProgressbarCircleCodmponent;
