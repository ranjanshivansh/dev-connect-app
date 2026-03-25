"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TechChart({ data }: any) {
  return (
    <div className="w-full bg-background/30 backdrop-blur p-4 rounded-xl border shadow-sm">
      
      {/* Title */}
      <h2 className="text-base font-semibold mb-2 text-gray-800">
         Tech Proficiency
      </h2>

      {/* Chart */}
      <div className="h-44"> {/* 🔥 reduced height */}
        <ResponsiveContainer>
          <BarChart
            data={data}
            barSize={30} // 🔥 thinner bars
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }} // 🔥 compact spacing
          >
            {/* Light grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false} // 🔥 remove vertical lines
              stroke="#e5e7eb"
            />

            {/* X Axis */}
            <XAxis
              dataKey="tech"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y Axis */}
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={20}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            />

            {/* Gradient */}
            <defs>
              <linearGradient id="colorTech" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.4} />
              </linearGradient>
            </defs>

            {/* Bars */}
            <Bar
              dataKey="count"
              fill="url(#colorTech)"
              radius={[6, 6, 0, 0]} // 🔥 less rounded (cleaner)
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}