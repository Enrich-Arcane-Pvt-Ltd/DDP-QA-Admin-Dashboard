"use client";

import React from "react";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    icon?: React.ReactNode;
    placeholder?: string;
}

function CustomSelect({
    value,
    onChange,
    options,
    icon,
    placeholder = "Select an option",
}: CustomSelectProps) {
    return (
        <div className="relative">
            {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-600">
                    {icon}
                </div>
            )}
            <select
                value={value}
                onChange={onChange}
                className={`w-full ${
                    icon ? "pl-11" : "pl-3"
                } pr-3 py-3 border-2 border-light-200 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100 transition-all font-semibold placeholder:text-primary-600 text-primary-700 bg-light-200`}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CustomSelect;
