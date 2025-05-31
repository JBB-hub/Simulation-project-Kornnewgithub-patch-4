import React, { useState } from "react";
import TopView from "./TopView";
import ParameterBox from "./ParameterBox";

const Simulation = () => {
  const [activeTarget, setActiveTarget] = useState("hitter");
  const [x, setX] = useState("1.5");
  const [y, setY] = useState("0");
  const [fieldType, setFieldType] = useState("D");

  const [triggerSimulate, setTriggerSimulate] = useState(false);
  const [trajectoryData, setTrajectoryData] = useState(null); // สำหรับอนาคต

  const handleSimulate = async () => {
    // ⚠️ สำหรับตอนนี้: ใช้ยิง animation ใน TopView แบบไม่มี backend
    setTriggerSimulate(false); // reset ก่อน
    setTimeout(() => setTriggerSimulate(true), 50); // กระตุ้นยิงใหม่

    // 🔁 เตรียมไว้สำหรับใช้ backend จริง
    try {
      const response = await fetch("http://localhost:5000/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ x: parseFloat(x), y: parseFloat(y) }),
      });

      const data = await response.json();
      console.log("📡 Trajectory from backend:", data.trajectory);

      // บันทึกไว้เผื่อใช้ต่อ
      setTrajectoryData(data.trajectory);
    } catch (error) {
      console.error("Simulation error:", error);
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-[#0f0f0f] text-white">
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="text-xl font-bold mt-6 mb-2">Top View</div>
        <TopView
          x={x}
          y={y}
          activeTarget={activeTarget}
          fieldType={fieldType}
          triggerSimulate={triggerSimulate} // ✅ ส่ง trigger ให้ TopView
          trajectoryData={trajectoryData}   // (optional สำหรับอนาคต)
        />
      </div>

      <div className="w-[350px] mt-16 px-4 pb-6 bg-[#1a1a1a] border-l border-gray-700">
        <ParameterBox
          x={x}
          y={y}
          setX={setX}
          setY={setY}
          activeTarget={activeTarget}
          setActiveTarget={setActiveTarget}
          onSimulate={handleSimulate}
          fieldType={fieldType}
          setFieldType={setFieldType}
        />
      </div>
    </div>
  );
};

export default Simulation;
