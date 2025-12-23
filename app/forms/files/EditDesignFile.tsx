"use client";

import CustomInput from "@/app/components/CustomInput";
import { useState } from "react";

import { File, FileText, FileUp, Folder, History, Shield, Tag, X } from "lucide-react";

import CustomFileInput from "@/app/components/CustomFileInput";
import CustomSelect from "@/app/components/CustomSelect";
import { toast } from "@/app/components/ToastContainer";
import { CreateDesignFile as CreateFile, DesignFileQAStatus, DesignFiles, DesignFileStatus, FileTypes } from "@/app/types/DesignFiles";

interface ModalProps {
    onConfirm?: (data: CreateFile) => void;
    onCancel?: () => void;
    isSubmitting: boolean;
    designFileStatus: DesignFileStatus[];
    qaStatus: DesignFileQAStatus[],
    designId: number;
    orderId: number;
    productId: number;
    fileTypes: FileTypes[];
    selectedFile: DesignFiles | null
}

function EditDesignFile({ onConfirm, onCancel, isSubmitting, designFileStatus, qaStatus, designId, orderId, productId, fileTypes, selectedFile} : ModalProps) {
    const [name, setName] = useState(selectedFile?.file_name);
    const [filePath, setFilePath] = useState(selectedFile?.file_path ?? "");
    const [fileType, setFileType] = useState(selectedFile?.file_type ?? "");
    const [version, setVersion] = useState(String(selectedFile?.version) ?? "");
    const [status, setStatus] = useState(selectedFile?.status);
    const [qaFileStatus, setQAStatus] = useState(selectedFile?.qa_status);
    const [file, setFile] = useState<File | null>(null);  
    
    const handleClick = async () => {
        if (!fileType) {
            toast.error('Please Select a File Type');
            return;
        }

        if (!version) {
            toast.error('Please Enter the Version');
            return;
        }

        if (!selectedFile?.file_url) {
            toast.error('Please Select a Design File');
            return;
        }

        if (!status) {
            toast.error('Please Select a Status');
            return;
        }

        if (!qaFileStatus) {
            toast.error('Please Select a QA Status');
            return;
        }

        const success = await onConfirm?.({ 
            design_order_id: orderId, 
            design_product_id: productId, 
            design_item_id: designId,
            file: file,
            file_name: name ?? "",
            file_type: fileType,
            file_path: filePath,
            version: version,
            status: status,
            qa_status: qaFileStatus,
            preserve_ai_editing: true
        });
        if (success) onCancel?.();
    };

    return (
        <div onClick={onCancel} className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm p-4 animate-fadeIn">
            <div onClick={(e) => e.stopPropagation()} className="bg-gradient-to-br from-primary-100 to-primary-400 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 animate-slideUp">
                <div className="relative bg-gradient-to-r from-primary-700 to-primary-600 rounded-t-2xl p-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-800/20 rounded-full -ml-12 -mb-12"></div>
                    
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                <File className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Edit Design File</h2>
                                <p className="text-primary-100 text-sm">Update your design file</p>
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

                <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-transparent hover:scrollbar-thumb-primary-800">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <FileUp size={16} className="text-accent-600" />
                            File Name
                        </label>
                        <CustomInput 
                            type='text'
                            placeholder="Enter the File Name"
                            icon={<FileUp />}
                            value={name ?? ""}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <Folder size={16} className="text-accent-600" />
                            File Path
                        </label>
                        <CustomInput 
                            type='text'
                            placeholder="Enter the File Path"
                            icon={<Folder />}
                            value={filePath}
                            onChange={(e) => setFilePath(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <Tag size={16} className="text-accent-600" />
                            File Type <span className="text-error-600">*</span>
                        </label>
                        <CustomSelect
                            value={fileType}
                            onChange={(e) => setFileType(e.target.value)}
                            options={fileTypes ?? ""}
                            icon={<Tag />}
                            placeholder="Select File Type"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <History size={16} className="text-accent-600" />
                            Version <span className="text-error-600">*</span>
                        </label>
                        <CustomInput 
                            type='text'
                            placeholder="Enter the Version"
                            icon={<History />}
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <FileText size={16} className="text-accent-600" />
                            Design File <span className="text-error-600">*</span>
                        </label>

                        {selectedFile?.file_name ? (
                            <div className="group relative border border-primary-200 rounded-xl bg-primary-100 hover:shadow-md transition-all overflow-hidden">
                                <div className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary-100 p-3 rounded-lg">
                                            <FileText className="text-primary-700" size={22} />
                                        </div>
                                        <div>
                                            <p className="text-primary-800 font-medium truncate w-40 sm:w-64">
                                                {selectedFile.file_name}
                                            </p>
                                            <p className="text-xs text-primary-500">Click below to replace PDF</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-primary-100 bg-primary-50">
                                    <CustomFileInput
                                        placeholder="Replace PDF file"
                                        value={file}
                                        onChange={(selected) => {
                                            setFile(selected)
                                        }}
                                        accept=".pdf"
                                    />
                                </div>
                            </div>
                        ) : (
                            <CustomFileInput
                                placeholder="Choose a document"
                                value={file}
                                onChange={(selected) => setFile(selected)}
                                accept=".pdf"
                            />
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <Shield size={16} className="text-accent-600" />
                            Status <span className="text-error-600">*</span>
                        </label>
                        <CustomSelect
                            value={status ?? ""}
                            onChange={(e) => setStatus(e.target.value)}
                            options={designFileStatus ?? ""}
                            icon={<Shield />}
                            placeholder="Select Status"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <Shield size={16} className="text-accent-600" />
                            QA Status <span className="text-error-600">*</span>
                        </label>
                        <CustomSelect
                            value={qaFileStatus ?? ""}
                            onChange={(e) => setQAStatus(e.target.value)}
                            options={qaStatus ?? ""}
                            icon={<Shield />}
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
                        {isSubmitting ? 'Editing Design File...' : 'Edit Design File'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditDesignFile