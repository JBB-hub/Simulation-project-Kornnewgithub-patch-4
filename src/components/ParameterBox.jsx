import React from "react";

const ParameterBox = ({
  x,
  y,
  setX,
  setY,
  activeTarget,
  setActiveTarget,
  onSimulate,
  fieldType,
  setFieldType, // 👈 รับมาใช้
}) => {
  const handleDefault = () => {
    setX("1.5");
    setY("0");
  };

  return (
    <div className="mt-24 px-4 py-4 rounded-lg text-white space-y-4">
      <h2 className="text-lg font-semibold">Input Parameters</h2>

      {/* 🔄 เลือกสนาม */}
      <div className="space-y-1">
        <label className="text-sm font-semibold">Field Background</label>
        <select
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
          className="bg-gray-800 text-white px-2 py-1 rounded w-full"
        >
          <option value="D">D.png (default)</option>
          <option value="field">field.png</option>
        </select>
      </div>

      {/* Flexible */}
      <div className="space-y-1">
        <div className="font-semibold text-sm">Flexible Parameters</div>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label className="mb-1 text-sm">x (m):</label>
            <input
              type="number"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className="px-2 py-1 rounded bg-gray-800 text-white w-24"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">y (m):</label>
            <input
              type="number"
              value={y}
              onChange={(e) => setY(e.target.value)}
              className="px-2 py-1 rounded bg-gray-800 text-white w-24"
            />
          </div>
        </div>
      </div>

      {/* Fixed */}
      <div className="space-y-1">
        <div className="font-semibold text-sm mt-2">Fixed Parameters</div>
        {[
          { label: "gravity", value: "9.81", unit: "m/s²" },
          { label: "Launcher_height", value: "0.35", unit: "m" },
          { label: "Ball_mass", value: "0.057", unit: "kg" },
          { label: "stick_theta", value: "0–90", unit: "°" },
          { label: "BallDropper_height", value: "1.2", unit: "m" },
        ].map((item) => (
          <div key={item.label}>
            <label className="text-sm">
              {item.label} ({item.unit}):
            </label>
            <input
              type="text"
              value={item.value}
              disabled
              className="px-2 py-1 rounded bg-gray-800 text-white w-full opacity-80 cursor-not-allowed"
            />
          </div>
        ))}
      </div>

      {/* Sim + Default */}
      <div className="flex justify-between pt-4">
        <button
          className="bg-green-600 hover:bg-green-500 px-4 py-1 rounded"
          onClick={onSimulate}
        >
          ▶️ Simulate
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-400 px-4 py-1 rounded"
          onClick={handleDefault}
        >
          Default
        </button>
      </div>

      {/* CAD Target Selector */}
      <div className="pt-6 space-y-2">
        <div className="font-semibold text-sm">Target Object</div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTarget("hitter")}
            className={`px-3 py-1 rounded ${
              activeTarget === "hitter" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            🎯 เครื่องตีลูก (Hitter)
          </button>
          <button
            onClick={() => setActiveTarget("dropper")}
            className={`px-3 py-1 rounded ${
              activeTarget === "dropper" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            📤 เครื่องปล่อยลูก (Dropper)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParameterBox;
