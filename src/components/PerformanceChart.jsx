import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const GlassBarChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [chartHeight, setChartHeight] = useState(350);
  const [barSize, setBarSize] = useState(40);
  const [chartPadding, setChartPadding] = useState("20px");

  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
    { name: "Apr", value: 200 },
    { name: "May", value: 450 },
    { name: "Jun", value: 380 }
  ];

  // Adjust chart dimensions based on screen size and orientation
  useEffect(() => {
    const handleResize = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      
      if (window.innerWidth < 640) { // Mobile
        setChartHeight(isLandscape ? 200 : 250);
        setBarSize(25);
        setChartPadding(isLandscape ? "10px" : "15px");
      } else if (window.innerWidth < 1024) { // Tablet
        setChartHeight(isLandscape ? 250 : 300);
        setBarSize(35);
        setChartPadding(isLandscape ? "15px" : "20px");
      } else { // Desktop
        setChartHeight(350);
        setBarSize(40);
        setChartPadding("20px");
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Glassmorphism style with dynamic padding
  const glassStyles = {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    padding: chartPadding,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
    width: "100%",
    height: chartHeight,
    transition: "all 0.3s ease"
  };

  // Colors
  const colors = {
    barFill: "rgba(155, 176, 195, 0.38)",
    barHover: "rgba(155, 176, 195, 0.8)",
    axisText: "#000221"
  };

  return (
    <div style={glassStyles}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ 
            top: 10, 
            right: window.innerWidth < 640 ? 5 : 15, 
            left: 0, 
            bottom: 5 
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <XAxis
            dataKey="name"
            stroke={colors.axisText}
            tick={{ 
              fill: colors.axisText, 
              fontSize: window.innerWidth < 640 ? 10 : 12 
            }}
          />
          <YAxis
            stroke={colors.axisText}
            tick={{ 
              fill: colors.axisText, 
              fontSize: window.innerWidth < 640 ? 10 : 12 
            }}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              background: "rgba(0,0,0,0.7)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              backdropFilter: "blur(4px)",
              fontSize: "12px",
              padding: "8px 12px"
            }}
          />
          <Bar
            dataKey="value"
            barSize={barSize}
            radius={[6, 6, 0, 0]} // Slightly smaller radius for mobile
            activeBar={false}
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
};

export default GlassBarChart;