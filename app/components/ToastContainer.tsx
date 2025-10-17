"use client";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastContainerProps {
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

const toastConfig = {
    success: {
        icon: CheckCircle,
        gradient: "from-accent-600 to-accent-500",
        borderColor: "border-accent-400",
        bgColor: "bg-white",
        iconColor: "text-accent-600",
        titleColor: "text-accent-800",
        progressColor: "bg-accent-600",
        color: "text-accent-800"
    },
    error: {
        icon: XCircle,
        gradient: "from-error-800 to-error-700",
        borderColor: "border-error-600",
        bgColor: "bg-white",
        iconColor: "text-error-800",
        titleColor: "text-error-900",
        progressColor: "bg-error-800",
        color: "text-error-900"
    },
    warning: {
        icon: AlertTriangle,
        gradient: "from-yellow-500 to-orange-500",
        borderColor: "border-yellow-400",
        bgColor: "bg-white",
        iconColor: "text-yellow-600",
        titleColor: "text-yellow-900",
        progressColor: "bg-yellow-600",
        color: 'text-yellow-900'
    },
    info: {
        icon: Info,
        gradient: "from-light-800 to-light-700",
        borderColor: "border-light-600",
        bgColor: "bg-white",
        iconColor: "text-light-800",
        titleColor: "text-light-900",
        progressColor: "bg-light-800",
        color: 'text-light-900'
    },
};

let toastListeners: ((toast: Toast) => void)[] = [];

export const toast = {
    success: (message: string, duration = 4000) => {
        showToast({ type: "success", message, duration });
    },
    error: (message: string, duration = 4000) => {
        showToast({ type: "error", message, duration });
    },
    warning: (message: string, duration = 4000) => {
        showToast({ type: "warning", message, duration });
    },
    info: (message: string, duration = 4000) => {
        showToast({ type: "info", message, duration });
    },
};

function showToast(toast: Omit<Toast, "id">) {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    toastListeners.forEach((listener) => listener(newToast));
}

export default function ToastContainer({ position = "top-right" }: ToastContainerProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        const listener = (toast: Toast) => {
            setToasts((prev) => [...prev, toast]);

            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== toast.id));
            }, toast.duration || 4000);
        };

        toastListeners.push(listener);

        return () => {
            toastListeners = toastListeners.filter((l) => l !== listener);
        };
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const positionClasses = {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "top-center": "top-4 left-1/2 -translate-x-1/2",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    };

    return (
        <div className={`fixed ${positionClasses[position]} z-50 flex flex-col gap-3 pointer-events-none`}>
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(100);
    const config = toastConfig[toast.type];
    const Icon = config.icon;

    useEffect(() => {
        const duration = toast.duration || 4000;
        const interval = 50;
        const decrement = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev - decrement;
                return newProgress <= 0 ? 0 : newProgress;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [toast.duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(onClose, 300);
    };

    return (
        <div
            className={`pointer-events-auto transform transition-all duration-300 ${
                isExiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
            }`}
        >
            <div
                className={`relative w-80 ${config.bgColor} border-l-4 ${config.borderColor} rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm`}
            >
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${config.gradient}`}></div>

                <div className="p-4 flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon size={20} className="text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold ${config.titleColor} mb-1`}>
                            {toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}
                        </p>
                        <p className={`text-sm ${config.color}`}>{toast.message}</p>
                    </div> 

                    <button
                        onClick={handleClose}
                        className={`flex-shrink-0 ${config.iconColor} hover:opacity-70 transition-opacity`}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="h-1 bg-gray-200">
                    <div
                        className={`h-full ${config.progressColor} transition-all duration-50 ease-linear`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}