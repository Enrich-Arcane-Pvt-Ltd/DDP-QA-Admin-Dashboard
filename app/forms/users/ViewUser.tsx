"use client";

import React, { useState } from "react";
import { Shield, User, X, Sparkles, Users, Mail, Phone, CheckCircle2, XCircle } from "lucide-react";

import { UserData } from "@/app/types/Users";

interface ModalProps {
    row: UserData;
    onCancel?: () => void,
}

export default function ViewUser({ onCancel, row } : ModalProps) {    
    return (
        <div onClick={onCancel} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-fadeIn">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg transform transition-all duration-300 animate-slideUp overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-3xl opacity-20 -mr-32 -mt-32 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary-500 to-primary-700 rounded-full blur-3xl opacity-20 -ml-24 -mb-24 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8 pb-20">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                    
                    <div className="relative flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary-400 rounded-2xl blur-lg opacity-50"></div>
                                <div className="relative w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-200">
                                    <Shield className="text-primary-600" size={28} strokeWidth={2.5} />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white tracking-tight">User Details</h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <Sparkles className="text-primary-200" size={14} />
                                    <p className="text-primary-100 text-sm font-medium">Complete Profile Overview</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onCancel}
                            className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90 group"
                        >
                            <X className="text-white group-hover:text-primary-100" size={22} strokeWidth={2.5} />
                        </button>
                    </div>
                    
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
                            <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-2xl border-4 border-white overflow-hidden">
                                {row.profile_picture_url ? (
                                    <img
                                        src={row.profile_picture_url}
                                        alt={row.name}
                                        className="w-full h-full object-cover rounded-3xl"
                                    />
                                ) : (
                                    <User className="text-white" size={56} strokeWidth={2} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative px-8 pt-20 pb-8">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{row.name}</h3>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 border border-primary-300">
                            <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></div>
                            <span className="text-primary-700 font-semibold text-sm capitalize">{row.status}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-5 hover:shadow-lg transition-all duration-300 border border-gray-200">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                                    <Users className="text-white" size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Role</p>
                                    <p className="text-base font-bold text-gray-800">{row.role}</p>
                                </div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-5 hover:shadow-lg transition-all duration-300 border border-gray-200">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                                    <Mail className="text-white" size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</p>
                                    <p className="text-base font-bold text-gray-800 truncate">{row.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onCancel}
                        className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}