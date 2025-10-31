"use client";

import { useState } from "react";
import CustomInput from "@/app/components/CustomInput";
import CustomTextArea from "@/app/components/CustomTextArea";

import { Shield, X, FileText, ShoppingCart, Hash, User, ClipboardCheck, Package, Code } from "lucide-react";

import CustomSelect from "@/app/components/CustomSelect";
import { toast } from "@/app/components/ToastContainer";

import { DesignOrder, DesignOrdersMetaData } from "@/app/types/Orders";

import { CreateProduct, DesignProductsMeta } from "@/app/types/DesignProducts";

interface ModalProps {
    onSubmit?: (data: CreateProduct) => Promise<boolean>;
    onCancel?: () => void;
    data?: DesignProductsMeta;
    isSubmitting: boolean;
    id: number
}

function CreateDesignProduct({ onSubmit, onCancel, data, isSubmitting, id} : ModalProps) {
    const [name, setName] = useState('');
    const [productType, setProductType] = useState('');
    const [analyst, setAnalyst] = useState('');
    const [status, setStatus] = useState('');
    const [qaStatus, setQAStatus] = useState('');
    
    const handleClick = async () => {
        if (!name) {
            toast.error('Product Name is required');
            return;
        }

        if (!productType) {
            toast.error('Product Type is required');
            return;
        }

        if (!status) {
            toast.error('Status is required');
            return;
        }

        if (!qaStatus) {
            toast.error('QA Status is required');
            return;
        }

        const success = await onSubmit?.({ design_order_id: Number(id), product_name: name, product_type_id: Number(productType), status, qa_status: qaStatus, qa_analyst_id: Number(analyst) });
        if (success) onCancel?.();
    };

    return (
        <div onClick={onCancel} className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/40 backdrop-blur-sm p-4 animate-fadeIn">
            <div onClick={(e) => e.stopPropagation()} className="bg-gradient-to-br from-primary-100 to-primary-400 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 animate-slideUp">
                <div className="relative bg-gradient-to-r from-primary-700 to-primary-600 rounded-t-2xl p-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-800/20 rounded-full -ml-12 -mb-12"></div>
                    
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                <Package className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Create Design Product</h2>
                                <p className="text-primary-100 text-sm">Add a new design product to your order</p>
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
                            <Package size={16} className="text-accent-600" />
                            Product Name <span className="text-error-600">*</span>
                        </label>
                        <CustomInput 
                            type='text'
                            placeholder="Enter the Product Name"
                            icon={<Package />}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <User size={16} className="text-accent-600" />
                            QA Analyst
                        </label>
                        <CustomSelect
                            value={analyst}
                            onChange={(e) => setAnalyst(e.target.value)}
                            options={data?.qaAnalysts ?? []}
                            icon={<User />}
                            placeholder="Select QA Analyst"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <Code size={16} className="text-accent-600" />
                            Product Type <span className="text-error-600">*</span>
                        </label>
                        <CustomSelect
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            options={data?.productTypes ?? []}
                            icon={<Code />}
                            placeholder="Select Product Type"
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
                            options={data?.designProductStatus ?? []}
                            icon={<Shield />}
                            placeholder="Select Status"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <ClipboardCheck size={16} className="text-accent-600" />
                            QA Status <span className="text-error-600">*</span>
                        </label>
                        <CustomSelect
                            value={qaStatus}
                            onChange={(e) => setQAStatus(e.target.value)}
                            options={data?.qaStatus ?? []}
                            icon={<ClipboardCheck />}
                            placeholder="Select QA Status"
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
                        {isSubmitting ? 'Creating...' : 'Create Design Product'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateDesignProduct