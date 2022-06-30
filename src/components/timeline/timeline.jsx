import "./timeline.css";
import React, { useState, useEffect } from "react";

const Timeline = () => {
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [timeStamps, setTimeStamp] = useState([]);
  const [hoverStamp, setHoverStamp] = useState(false);

  const setMousePointer = (e) => {
    setCoord({ x: e.screenX - e.target.offsetLeft, y: e.screenY });
  };

  return (
    <div
      className="timeline"
      onMouseMove={setMousePointer}
      onMouseEnter={() => setHoverStamp(true)}
      onMouseLeave={() => setHoverStamp(false)}
      onMouseDown={() =>
        setTimeStamp((timeStamps) => [
          ...timeStamps,
          { left: coord.x },
          { top: coord.y },
        ])
      }
    >
      <div className="line">
        <div className="mark start-mark" />
        <div className="mark end-mark" />
        <div
          className={hoverStamp ? "mark" : ""}
          style={{ position: "absolute", left: coord.x, background: "grey" }}
        />
        {timeStamps.map((mark, i) => (
          <div
            key={i}
            className="mark"
            style={{
              position: "absolute",
              left: mark.left,
              top: mark.top,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
