import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface CustomInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    showPasswordToggle?: boolean;
}

function CustomInput({ 
    type, 
    placeholder, 
    value, 
    onChange, 
    icon,
    showPasswordToggle = false 
}: CustomInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPasswordToggle && showPassword ? "text" : type;

    return (
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-600">
                {icon}
            </div>
            <input
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full pl-11 pr-12 py-3 border-2 border-light-200 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100 transition-all text-primary-700 font-semibold placeholder:text-primary-500 bg-light-200"
            />
            {showPasswordToggle && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-700 transition-colors"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
    );
}

export default CustomInput;