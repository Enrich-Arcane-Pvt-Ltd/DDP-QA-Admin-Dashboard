"use client";

import React, { useState } from "react";
import { LogOut, X, AlertTriangle, Shield } from "lucide-react";

interface LogoutModalProps {
    onConfirm?: () => void;
    onCancel?: () => void;
}

export default function LogoutModal({ onConfirm, onCancel }: LogoutModalProps) {
    return (
        <div 
            onClick={onCancel} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn"
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-slideUp overflow-hidden"
            >
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-error-400 to-error-600 rounded-full blur-3xl opacity-10 -mr-24 -mt-24 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-error-500 to-error-700 rounded-full blur-3xl opacity-10 -ml-20 -mb-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Close Button */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90 group"
                >
                    <X className="text-gray-600 group-hover:text-gray-800" size={20} strokeWidth={2.5} />
                </button>

                {/* Content */}
                <div className="relative p-8 pt-6">
                    {/* Icon Section */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            {/* Pulsing rings */}
                            <div className="absolute inset-0 rounded-full bg-error-500 animate-ping opacity-20"></div>
                            <div className="absolute inset-0 rounded-full bg-error-500 animate-pulse opacity-10" style={{ animationDelay: '0.5s' }}></div>
                            
                            {/* Main icon container */}
                            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-error-500 to-error-700 flex items-center justify-center shadow-2xl border-4 border-white">
                                <LogOut className="text-white" size={40} strokeWidth={2} />
                            </div>
                            
                            {/* Warning badge */}
                            <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg border-2 border-white">
                                <AlertTriangle className="text-white" size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            Logout Confirmation
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Are you sure you want to logout from your account? You'll need to login again to access the dashboard.
                        </p>
                    </div>

                    {/* User Info Card */}
                    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-md">
                                <span className="text-white font-bold text-lg">AD</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-800">Admin User</p>
                                <p className="text-xs text-gray-500">admin@example.com</p>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-error-600 to-error-700 hover:from-error-700 hover:to-error-800 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>

                    {/* Security Note */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Shield size={14} />
                        <span>Your session will be securely terminated</span>
                    </div>
                </div>
            </div>
        </div>
    );
}