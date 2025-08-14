import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
  { name: "May", value: 450 },
  { name: "Jun", value: 380 }
];

// Glassmorphism style
const glassStyles = {
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "20px",
  padding: "20px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)"
};

// Colors
const colors = {
  barFill: "rgba(155, 176, 195, 0.38)",
  barHover: "rgba(155, 176, 195, 0.8)",
  axisText: "#000221"
};

export default function GlassBarChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div style={{ width: "100%", height: 350, ...glassStyles }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <XAxis
            dataKey="name"
            stroke={colors.axisText}
            tick={{ fill: colors.axisText, fontSize: 14 }}
          />
          <YAxis
            stroke={colors.axisText}
            tick={{ fill: colors.axisText, fontSize: 14 }}
          />
          <Tooltip
            cursor={false} // prevents grey hover background
            contentStyle={{
              background: "rgba(0,0,0,0.7)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              backdropFilter: "blur(4px)"
            }}
          />
          <Bar
            dataKey="value"
            barSize={40}
            radius={[8, 8, 0, 0]}
            activeBar={false} // disable default highlight
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={activeIndex === index ? colors.barHover : colors.barFill}
                onMouseEnter={() => setActiveIndex(index)}
                style={{
                  transition: "fill 0.3s ease",
                  cursor: "pointer"
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
