"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
    { name: "Jan", orders: 400 },
    { name: "Feb", orders: 300 },
    { name: "Mar", orders: 500 },
    { name: "Apr", orders: 250 },
    { name: "May", orders: 600 },
];

export default function BarChartComponent() {
    return (
        <div className="w-full h-80 bg-white p-4 rounded-xl shadow-lg border border-primary-100">
            <h2 className="text-lg font-semibold text-primary-800 mb-4">
                Monthly Orders
            </h2>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#bfdbf7" />
                    <XAxis dataKey="name" stroke="#022b3a" />
                    <YAxis stroke="#022b3a" />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#1f7a8c" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
