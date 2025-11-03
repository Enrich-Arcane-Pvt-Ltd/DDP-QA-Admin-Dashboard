"use client";

import { QARuleSetMetaData, QARuleSets } from "@/app/types/QARuleSets";
import { ClipboardCheck, FileText, Shield, ShoppingCart, User, X } from "lucide-react";

interface ModalProps {
    row: QARuleSets;
    onCancel?: () => void;
    data: QARuleSetMetaData;
}

function ViewQARuleSet({ onCancel, row, data }: ModalProps) {
    const InfoField = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
        <div className="p-4 transition-all duration-200 border rounded-xl bg-white/60 border-primary-200 hover:bg-white/80 hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-100">
                    <Icon size={16} className="text-accent-600" />
                </div>
                <label className="text-sm font-semibold text-primary-700">{label}</label>
            </div>
            <p className="pl-10 text-base text-primary-900">{value || "—"}</p>
        </div>
    );

    const StatusBadge = ({ status }: { status: string }) => {
        const statusColors: { [key: string]: string } = {
            'active': 'bg-green-100 text-green-700 border-green-200',
            'inactive': 'bg-gray-100 text-gray-700 border-gray-200',
            'draft': 'bg-yellow-100 text-yellow-700 border-yellow-200',
        };

        const normalizedStatus = status?.toLowerCase();
        const colorClass = statusColors[normalizedStatus] || 'bg-primary-100 text-primary-700 border-primary-200';

        return (
            <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold border rounded-lg ${colorClass} capitalize`}>
                {status}
            </span>
        );
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onCancel?.();
    };

    const handleBackdropClick = () => {
        onCancel?.();
    };

    return (
        <div onClick={handleBackdropClick} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-900/40 backdrop-blur-sm animate-fadeIn">
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl transition-all duration-300 transform shadow-2xl bg-gradient-to-br from-primary-100 to-primary-400 rounded-2xl animate-slideUp max-h-[90vh] overflow-y-auto">
                <div className="relative p-6 overflow-hidden bg-gradient-to-r from-primary-700 to-primary-600 rounded-t-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full bg-primary-500/20"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 rounded-full bg-primary-800/20"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 shadow-lg rounded-xl bg-white/20 backdrop-blur-sm">
                                <ShoppingCart className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">QA Rule Set Details</h2>
                                <p className="text-sm text-primary-100">View complete QA rule Set information</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="flex items-center justify-center w-10 h-10 transition-all duration-200 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm hover:scale-110"
                        >
                            <X className="text-white" size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Rule Name - Featured */}
                    <div className="p-5 border-2 shadow-md rounded-xl bg-gradient-to-br from-white to-primary-50 border-accent-200">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <ShoppingCart size={18} className="text-accent-600" />
                                    <label className="text-sm font-semibold text-primary-700">Rule Set Name</label>
                                </div>
                                <h3 className="text-xl font-bold text-primary-900">{row.qa_rule_set_name}</h3>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-xs font-medium text-primary-600">Status</div>
                                <StatusBadge status={row.status} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <InfoField
                            icon={ClipboardCheck}
                            label="QA Rule Status"
                            value={row.status}
                        />

                        <InfoField
                            icon={User}
                            label="Created By"
                            value={row.created_by || row.name || "—"}
                        />

                        <InfoField
                            icon={Shield}
                            label="Rule ID"
                            value={row.id?.toString() || "—"}
                        />
                    </div>

                    {/* Description - Full Width */}
                    {row.description && (
                        <div className="p-4 transition-all duration-200 border rounded-xl bg-white/60 border-primary-200 hover:bg-white/80 hover:shadow-md">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-100">
                                    <FileText size={16} className="text-accent-600" />
                                </div>
                                <label className="text-sm font-semibold text-primary-700">Description</label>
                            </div>
                            <p className="pl-10 text-base leading-relaxed whitespace-pre-wrap text-primary-900">{row.description}</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 p-6 pt-0">
                    <button
                        onClick={handleClose}
                        className="px-8 py-3 font-semibold text-white transition-all duration-200 shadow-lg rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 hover:scale-105 hover:shadow-xl"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ViewQARuleSet;