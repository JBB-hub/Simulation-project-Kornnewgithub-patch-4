import React from "react";
import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ResultPage = () => {
  const { state } = useLocation();

  const speedData = [
    { shot: 1, speed: 12.6 },
    { shot: 2, speed: 13.3 },
    { shot: 3, speed: 12.1 },
    { shot: 4, speed: 13.9 },
    { shot: 5, speed: 12.7 },
    { shot: 6, speed: 13.6 },
    { shot: 7, speed: 12.4 },
  ];

  return (
    <div className="min-h-screen bg-[#111827] text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Result Summary</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Parameters Overview */}
        <div className="bg-[#1f2937] p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Parameters Overview</h2>

          <div className="bg-yellow-500/20 p-3 rounded mb-3">
            <h3 className="text-yellow-300 font-bold mb-2"></h3>
            <p>x: {state?.x} m</p>
            <p>y: {state?.y} m</p>
          </div>

          <div className="bg-green-500/20 p-3 rounded">
            <h3 className="text-green-300 font-bold mb-2"></h3>
            <p>gravity: {state?.gravity} m/s²</p>
            <p>Launcher_height: {state?.Launcher_height} m</p>
            <p>Ball_mass: {state?.Ball_mass} kg</p>
            <p>stick_theta: {state?.stick_theta}°</p>
            <p>BallDropper_height: {state?.BallDropper_height} m</p>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="bg-[#1f2937] p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Calculated Results</h2>

          <div className="bg-red-500/20 p-3 rounded mb-3">
            <h3 className="text-red-300 font-bold mb-2"></h3>
            <p>DrivenGear: {state?.DrivenGear}</p>
            <p>RPMmotor: {state?.RPMmotor} rpm</p>
          </div>

          <div className="bg-gray-500/10 p-3 rounded">
            <h3 className="text-gray-300 font-bold mb-2"></h3>
            <p>stick_length: {state?.stick_length} m</p>
            <p>stick_mass: {state?.stick_mass} kg</p>
            <p>DriverGear: {state?.DriverGear}</p>
            <p>Bounce_coefficient: {state?.Bounce_coefficient}</p>
          </div>
        </div>
      </div>

      {/* ✅ Full-width Line Chart */}
      <div className="bg-[#1f2937] p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Ball Speed per Shot (m/s)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={speedData}>
            <XAxis dataKey="shot" label={{ value: "Shot", position: "insideBottomRight", offset: -5 }} />
            <YAxis label={{ value: "Speed (m/s)", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Line
              type="natural"
              dataKey="speed"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultPage;
