import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import ClockHandComponent from "./clockHand.component";

const TimeAnalogComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  return (
    <Card>
      <Card.Header
        onClick={() => {
          let w = {...watchface};
          w.dialFace.collapsedAnalog = !w.dialFace.collapsedAnalog;
          setWatchface(w);
        }}
      >
        Time Analog
      </Card.Header>
      <Card.Body className={`${watchface.dialFace.collapsedAnalog ? "collapse" : ""}`}>
        <ClockHandComponent
          title="Hours"
          clockHand={{...watchface.dialFace.hoursClockhand}}
          showAngle={false}
          onUpdate={(ch) => {
            const w = { ...watchface };
            w.dialFace.hoursClockhand = ch;
            setWatchface(w);
          }}
        />

        <ClockHandComponent
          title="Minutes"
          clockHand={{...watchface.dialFace.minutesClockhand}}
          onUpdate={(ch) => {
            const d = { ...watchface };
            d.dialFace.minutesClockhand = ch;
            setWatchface(d);
          }}
          showAngle={false}
        />

        <ClockHandComponent
          title="Seconds"
          clockHand={{...watchface.dialFace.secondsClockhand}}
          onUpdate={(ch) => {
            const w = { ...watchface };
            w.dialFace.secondsClockhand = ch;
            setWatchface(w);
          }}
          showAngle={false}
        />
      </Card.Body>
    </Card>
  );
};

export default TimeAnalogComponent;
