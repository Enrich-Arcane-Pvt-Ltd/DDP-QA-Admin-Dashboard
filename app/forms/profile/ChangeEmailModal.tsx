import CustomInput from "@/app/components/CustomInput";
import { Lock, Mail, X } from "lucide-react";
import { useState } from "react";

import { toast } from "@/app/components/ToastContainer";

import { UpdateEmail } from "@/app/types/Users";

interface ModalProps {
    onSubmit?: (data: UpdateEmail) => Promise<boolean>;
    onCancel?: () => void;
    isSubmitting: boolean;
}

function ChangeEmailModal ({ onSubmit, onCancel, isSubmitting} : ModalProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = async () => {
        if (!email || !password) {
            toast.error('Please Enter both email & password');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return toast.error("Please enter a valid email");

        const success = await onSubmit?.({ email, password });
        if (success) onCancel?.();
    }

    return (
        <div onClick={onCancel} className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/40 backdrop-blur-sm p-4 animate-fadeIn">
            <div onClick={(e) => e.stopPropagation()} className="bg-gradient-to-br from-primary-100 to-primary-400 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 animate-slideUp">
                <div className="relative bg-gradient-to-r from-primary-700 to-primary-600 rounded-t-2xl p-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-800/20 rounded-full -ml-12 -mb-12"></div>
                    
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                <Mail className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Change Email</h2>
                                <p className="text-primary-100 text-sm">Enter email & password to change email</p>
                            </div>
                        </div>
                        <button
                            onClick={onCancel}
                            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                        >
                            <X className="text-white" size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <Mail size={16} className="text-accent-600" />
                            Email <span className="text-error-600">*</span>
                        </label>
                        <CustomInput 
                            type='email'
                            placeholder="Enter the Email"
                            icon={<Mail />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <Lock size={16} className="text-accent-600" />
                            Password <span className="text-error-600">*</span>
                        </label>
                        <CustomInput 
                            type='password'
                            placeholder="Enter the Password"
                            icon={<Lock />}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            showPasswordToggle
                        />
                    </div>
                </div>

                <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-3 rounded-xl bg-primary-100 text-primary-700 font-semibold hover:bg-primary-200 transition-all duration-200 hover:scale-105 border border-primary-200"
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 text-white font-semibold hover:from-accent-700 hover:to-accent-600 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                        onClick={handleClick}
                    >
                        {isSubmitting ? 'Changing...' : 'Change Email'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangeEmailModal;