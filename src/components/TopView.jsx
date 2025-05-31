import React, { useEffect, useRef, useState } from "react";

const TopView = ({ fieldType, triggerSimulate, angle = 48 }) => {
  const PIXEL_WIDTH = 950;
  const PIXEL_HEIGHT = 500;

  const FIELD_WIDTH_M = fieldType === "field" ? 4.55 : 2.65;
  const FIELD_HEIGHT_M = 2.0;

  const ORIGIN_X_PX = fieldType === "field" ? 755 : 778;
  const ORIGIN_Y_PX = fieldType === "field" ? 340 : 255;

  const backgroundImage =
    fieldType === "field"
      ? "/desktop_pc/S.png"
      : "/desktop_pc/B.png";

  const dropperPosition = fieldType === "field"
    ? { left: "745px", top: "286px", width: "290px", height: "170px" }
    : { left: "760px", top: "160px", width: "350px", height: "350px" };

  const hitterSize = fieldType === "field"
    ? { width: "240px", height: "190px" }
    : { width: "300px", height: "300px" };

  const stickSize = fieldType === "field"
    ? { width: "14px", height: "80px" }
    : { width: "18px", height: "100px" };

  const cadOffsetsByField = {
    big: {
      0: { left: ORIGIN_X_PX + 1, top: ORIGIN_Y_PX - 1 },
      12: { left: ORIGIN_X_PX + 10, top: ORIGIN_Y_PX + 1 },
      24: { left: ORIGIN_X_PX + 17, top: ORIGIN_Y_PX + 5 },
      48: { left: ORIGIN_X_PX + 30, top: ORIGIN_Y_PX + 18 },
    },
    small: {
      0: { left: ORIGIN_X_PX + 1, top: ORIGIN_Y_PX + 17},
      12: { left: ORIGIN_X_PX + 6, top: ORIGIN_Y_PX + 18 },
      24: { left: ORIGIN_X_PX + 9, top: ORIGIN_Y_PX + 20 },
      48: { left: ORIGIN_X_PX + 14, top: ORIGIN_Y_PX + 25 },
    },
  };

  const stickOffsetsByField = {
    big: {
      0: { left: ORIGIN_X_PX - 12, top: ORIGIN_Y_PX - 35 },
      12: { left: ORIGIN_X_PX - 9, top: ORIGIN_Y_PX - 38 },
      24: { left: ORIGIN_X_PX - 6, top: ORIGIN_Y_PX - 42 },
      48: { left: ORIGIN_X_PX, top: ORIGIN_Y_PX - 49 },
    },
    small: {
      0: { left: ORIGIN_X_PX - 8, top: ORIGIN_Y_PX - 25 },
      12: { left: ORIGIN_X_PX - 10, top: ORIGIN_Y_PX - 34 },
      24: { left: ORIGIN_X_PX - 7, top: ORIGIN_Y_PX - 39 },
      48: { left: ORIGIN_X_PX - 1, top: ORIGIN_Y_PX - 45 },
    },
  };

  const fieldKey = fieldType === "field" ? "small" : "big";
  const cadPos = cadOffsetsByField[fieldKey][angle] || cadOffsetsByField[fieldKey][0];
  const stickPos = stickOffsetsByField[fieldKey][0] || stickOffsetsByField[fieldKey][0];

  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const requestRef = useRef();

  const vx = 2;
  const vy = 0;

  const startAnimation = () => {
    setBallPos({ x: 0, y: 0 });
    setIsAnimating(true);
  };

  useEffect(() => {
    if (triggerSimulate) startAnimation();
  }, [triggerSimulate]);

  useEffect(() => {
    let lastTime = null;
    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      setBallPos((prev) => {
        const newX = prev.x + vx * delta;
        const newY = prev.y + vy * delta;
        if (newX > FIELD_WIDTH_M) {
          setIsAnimating(false);
          return prev;
        }
        return { x: newX, y: newY };
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    if (isAnimating) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isAnimating]);

  const meterToPixel = (mx, my) => {
    const px = ORIGIN_X_PX + (mx / FIELD_WIDTH_M) * PIXEL_WIDTH;
    const py = ORIGIN_Y_PX - (my / FIELD_HEIGHT_M) * PIXEL_HEIGHT;
    return [px, py];
  };

  const [ballX, ballY] = meterToPixel(ballPos.x, ballPos.y);

  return (
    <div
      className="relative bg-black border border-gray-700 rounded overflow-hidden"
      style={{
        width: `${PIXEL_WIDTH}px`,
        height: `${PIXEL_HEIGHT}px`,
      }}
    >
      <img
        src={backgroundImage}
        alt="Top View Background"
        className="absolute top-0 left-0 object-fill"
        style={{ zIndex: 0, width: "950px", height: "500px" }}
      />

      {/* จุด 0,0 */}
      <div
        style={{
          position: "absolute",
          left: `${ORIGIN_X_PX - 6}px`,
          top: `${ORIGIN_Y_PX - 6}px`,
          width: "12px",
          height: "12px",
          backgroundColor: "lime",
          borderRadius: "50%",
          border: "2px solid white",
          zIndex: 100,
        }}
      />

      {/* ลูกบอล */}
      {isAnimating && (
        <div
          style={{
            position: "absolute",
            left: `${ballX - 6}px`,
            top: `${ballY - 6}px`,
            width: "12px",
            height: "12px",
            backgroundColor: "red",
            borderRadius: "50%",
            zIndex: 200,
          }}
        />
      )}

      {/* ตัวเครื่อง CAD */}
      <div
        className="absolute"
        style={{
          left: `${cadPos.left}px`,
          top: `${cadPos.top}px`,
          width: hitterSize.width,
          height: hitterSize.height,
          transform: `translate(-50%, -100%) rotate(${angle}deg)`,
          transformOrigin: "bottom center",
          zIndex: 10,
        }}
      >
        <img
          src="/desktop_pc/C.png"
          alt="Hitter Body"
          style={{
            width: "40%",
            height: "100%",
            objectFit: "contain",
            position: "absolute",
            left: "28%",
            top: "80%",
            transform: "scale(-1, -1)",
            //border: "2px solid purple"
          }}
        />
      </div>

      {/* ไม้ตี */}
      <img
        src="/desktop_pc/W.png"
        alt="Hitter Stick"
        className="absolute"
        style={{
          left: `${stickPos.left}px`,
          top: `${stickPos.top}px`,
          width: stickSize.width,
          height: stickSize.height,
          objectFit: "contain",
          zIndex: 11,
          transform: "scale(-1, -1)",
          //border: "2px solid yellow"
        }}
      />

      {/* Dropper */}
      <img
        src="/desktop_pc/Main_Assembly1.PNG"
        alt="Dropper"
        className="absolute"
        style={{
          left: dropperPosition.left,
          top: dropperPosition.top,
          width: dropperPosition.width,
          height: dropperPosition.height,
          objectFit: "contain",
          zIndex: 9,
          //border: "2px solid blue",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default TopView;
