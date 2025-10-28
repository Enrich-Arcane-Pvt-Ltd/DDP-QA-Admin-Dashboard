import React from "react";

interface CustomTextAreaProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    icon?: React.ReactNode;
    rows?: number;
    maxLength?: number;
}

export default function CustomTextArea({
    placeholder = "Enter text...",
    value,
    onChange,
    icon,
    rows = 4,
    maxLength,
}: CustomTextAreaProps) {
    return (
        <div className="relative">
            {icon && (
                <div className="absolute left-3 top-4 text-primary-600">
                    {icon}
                </div>
            )}

            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                maxLength={maxLength}
                className={`w-full ${icon ? "pl-11" : "pl-4"} pr-4 py-3 border-2 border-light-200 rounded-lg 
                focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100 
                transition-all text-primary-700 font-semibold placeholder:text-primary-500 bg-light-200 resize-none`}
            />

            {maxLength && (
                <span className="absolute bottom-2 right-3 text-xs text-primary-400">
                    {value.length}/{maxLength}
                </span>
            )}
        </div>
    );
}
