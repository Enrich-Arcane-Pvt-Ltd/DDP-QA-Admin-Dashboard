"use client";

import CustomInput from "@/app/components/CustomInput";
import CustomSelect from "@/app/components/CustomSelect";
import { useState } from "react";

import CustomTextArea from "@/app/components/CustomTextArea";
import { toast } from "@/app/components/ToastContainer";
import { QARuleMetaData, QARules } from "@/app/types/QaRules";
import { ClipboardCheck, FileText, Shield, ShoppingCart, User, X } from "lucide-react";

interface ModalProps {
    row: QARules;
    onSubmit?: (data: QARules) => Promise<boolean | undefined>;
    onCancel?: () => void,
    data: QARuleMetaData;
    isSubmitting: boolean;
    updateSubmitting?: boolean;
}

function EditQARule({ onSubmit, onCancel, row, data, isSubmitting, updateSubmitting }: ModalProps) {
    const [ruleName, setRuleName] = useState(row.rule_name);
    const [description, setDescription] = useState(row.description);
    const [status, setStatus] = useState(row.status);
    const [type, setType] = useState(row.type);
    const [priority, setPriority] = useState(row.priority);
    const [createdBy, setCreatedBy] = useState(row.name);
    const [id, setId] = useState(row.id);

    const handleClick = async () => {
        if (!ruleName) {
            toast.error('Rule Name is required');
            return;
        }

        if (!type) {
            toast.error('Type is required');
            return;
        }

        if (!status) {
            toast.error('Status is required');
            return;
        }

        if (!priority) {
            toast.error('Priority Status is required');
            return;
        }

        const success = await onSubmit?.({ rule_name: ruleName, type: type, priority: priority, status, description, name: createdBy, id });
        if (success) onCancel?.();
    };


    return (
        <div onClick={onCancel} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-900/40 backdrop-blur-sm animate-fadeIn">
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg transition-all duration-300 transform shadow-2xl bg-gradient-to-br from-primary-100 to-primary-400 rounded-2xl animate-slideUp">
                <div className="relative p-6 overflow-hidden bg-gradient-to-r from-primary-700 to-primary-600 rounded-t-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full bg-primary-500/20"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 rounded-full bg-primary-800/20"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 shadow-lg rounded-xl bg-white/20 backdrop-blur-sm">
                                <ShoppingCart className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Edit QA Rule</h2>
                                <p className="text-sm text-primary-100">Edit the QA Rule</p>
                            </div>
                        </div>
                        <button
                            onClick={onCancel}
                            className="flex items-center justify-center w-10 h-10 transition-all duration-200 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm hover:scale-110"
                        >
                            <X className="text-white" size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <ShoppingCart size={16} className="text-accent-600" />
                            Rule Name <span className="text-error-600">*</span>
                        </label>
                        <CustomInput
                            type='text'
                            placeholder="Enter the Order Name"
                            icon={<ShoppingCart />}
                            value={ruleName}
                            onChange={(e) => setRuleName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <User size={16} className="text-accent-600" />
                            Priority
                        </label>
                        <CustomSelect
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            options={data?.priorities ?? []}
                            icon={<Shield />}
                            placeholder="Select Status"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <Shield size={16} className="text-accent-600" />
                            Status <span className="text-error-600">*</span>
                        </label>
                        <CustomSelect
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            options={data?.qaRuleStatus ?? []}
                            icon={<Shield />}
                            placeholder="Select Status"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <ClipboardCheck size={16} className="text-accent-600" />
                            QA Rule Types <span className="text-error-600">*</span>
                        </label>
                        <CustomSelect
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            options={data?.qaRuleTypes ?? []}
                            icon={<ClipboardCheck />}
                            placeholder="Select QA Rule Type"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <FileText size={16} className="text-accent-600" />
                            Description
                        </label>
                        <CustomTextArea
                            placeholder="Enter description..."
                            icon={<FileText size={20} />}
                            value={description ?? ""}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            maxLength={255}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3 p-6 pt-0 sm:flex-row">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-3 font-semibold transition-all duration-200 border rounded-xl bg-primary-100 text-primary-700 hover:bg-primary-200 hover:scale-105 border-primary-200"
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-6 py-3 font-semibold text-white transition-all duration-200 shadow-lg rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 hover:scale-105 hover:shadow-xl"
                        onClick={handleClick}
                    >
                        {isSubmitting || updateSubmitting ? 'Updating...' : 'Update QA Rule'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditQARule