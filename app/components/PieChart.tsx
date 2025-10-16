"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    { name: "Pending", value: 400 },
    { name: "Confirm", value: 300 },
    { name: "Completed", value: 200 },
    { name: "Cancelled", value: 100 },
];

const COLORS = ["#1f7a8c", "#022b3a", "#4d82b0", "#840032"];

export default function PieChartComponent() {
    return (
        <div className="w-full h-80 bg-white p-4 rounded-xl shadow-lg border border-primary-100">
            <h2 className="text-lg font-semibold text-primary-800 mb-4">
                Orders by Category
            </h2>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#1f7a8c"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#1f7a8c",
                        }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
