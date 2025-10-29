import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

interface CustomFileInputProps {
    placeholder?: string;
    value?: File | null;
    onChange: (file: File | null) => void;
    icon?: React.ReactNode;
    accept?: string;
}

export default function CustomFileInput({
    placeholder = "Upload file...",
    value,
    onChange,
    icon = <Upload size={20} />,
    accept = "*"
}: CustomFileInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFileName(file?.name || "");
        onChange(file);
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const removeFile = () => {
        setFileName("");
        onChange(null);

        // clear actual input
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-600">
                {icon}
            </div>

            <div
                onClick={triggerFileSelect}
                className="w-full pl-11 pr-24 py-3 border-2 border-light-200 rounded-lg focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100 transition-all text-primary-700 font-semibold placeholder:text-primary-500 bg-light-200 cursor-pointer truncate"
            >
                {fileName || placeholder}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />

            {!fileName && (
                <button
                    type="button"
                    onClick={triggerFileSelect}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-accent-600 hover:bg-accent-700 text-white px-2 py-1 rounded text-xs transition"
                >
                    Browse
                </button>
            )}

            {fileName && (
                <button
                    type="button"
                    onClick={removeFile}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary-700 hover:bg-error-700 text-white p-1 rounded-full transition"
                >
                    <X size={14} />
                </button>
            )}
        </div>
    );
}
