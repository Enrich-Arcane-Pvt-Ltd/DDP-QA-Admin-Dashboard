"use client";

import { useState } from "react";
import { Eye, Download, FileText, File, HardDrive, FolderOpen, CheckCircle2, AlertCircle, Clock, Trash, SquarePen, LockKeyholeOpen, LockKeyhole } from "lucide-react";
import { DesignFiles as DesignFileType, CreateDesignFile, DesignFileStatus, DesignFileQAStatus, FileTypes } from "@/app/types/DesignFiles";

import DeleteDesignFile from "../forms/files/DeleteDesignFile";
import StatusDesignFile from "../forms/files/StatusDesignFile";
import EditDesignFile from "../forms/files/EditDesignFile";

interface DesignFilesProps {
    designFiles: DesignFileType[];
    onDelete?: (id: number) => void;
    isSubmitting: boolean;
    onStatus?: (id: number, status: string) => void;
    onEdit?: (id: number, formData: CreateDesignFile) => void;
    designFileStatus: DesignFileStatus[];
    qaStatus: DesignFileQAStatus[];
    designId: number;
    orderId: number;
    productId: number;
    fileTypes: FileTypes[];
}

export default function DesignFiles({ designFiles, onDelete, isSubmitting, onStatus, onEdit, designFileStatus, designId , qaStatus, orderId, productId, fileTypes }: DesignFilesProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<DesignFileType | null>(null);

    const handleOpenDelete = (id: number) => {
        setSelectedFileId(id);
        setShowDeleteModal(true);
    };

    const handleOpenEdit = (file : DesignFileType) => {
        setSelectedFile(file);
        setShowEditModal(true);
    };

    const handleOpenStatus = (id: number, status: string) => {
        setSelectedFileId(id);
        setSelectedStatus(status);
        setShowStatusModal(true);
    };

    const handleCloseDelete = () => {
        setShowDeleteModal(false);
        setSelectedFileId(null);
    };

    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedFile(null);
    };

    const handleCloseStatus = () => {
        setShowStatusModal(false);
        setSelectedStatus(null);
        setSelectedFileId(null);
    };

    const handleConfirmDelete = async () => {
        if (selectedFileId && onDelete) {
            await onDelete(selectedFileId);
        }
        handleCloseDelete();
    };

    const handleConfirmEdit = async (formData: CreateDesignFile) => {
        if (selectedFile && onEdit) {
            await onEdit(selectedFile.id, formData);
        }
        handleCloseEdit();
    };

    const handleConfirmStatus = async () => {
        if (selectedFileId && selectedStatus && onStatus) {
            await onStatus(selectedFileId, selectedStatus);
        }
        handleCloseStatus();
    };

    if (!designFiles || designFiles.length === 0) {
        return (
            <div className='relative flex flex-col items-center justify-center my-4 py-20 px-4 bg-gradient-to-br from-light-100 via-white to-light-100 rounded-2xl border-2 border-dashed border-primary-300 overflow-hidden'>
                <div className='absolute top-10 left-10 w-32 h-32 bg-accent-200 rounded-full opacity-20 blur-2xl'></div>
                    <div className='absolute bottom-10 right-10 w-40 h-40 bg-primary-200 rounded-full opacity-20 blur-2xl'></div>

                    <div className='relative z-10 flex flex-col items-center'>
                    <div className='bg-white rounded-2xl p-6 shadow-lg mb-6 border-2 border-primary-200'>
                        <FileText className='w-16 h-16 text-primary-400' strokeWidth={1.5} />
                    </div>
                    <h3 className='text-primary-800 text-2xl font-bold mb-2'>No Files Yet</h3>
                    <p className='text-primary-500 text-sm text-center max-w-sm'>
                        Start by creating your first design file to see it appear here
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full py-3 my-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                {designFiles.map((file) => (
                    <div
                        key={file.id}
                        className='group relative bg-gradient-to-br from-white to-light-100 rounded-2xl overflow-hidden border-2 border-primary-200 hover:border-accent-500 transition-all duration-300 hover:shadow-xl'
                    >
                        <div className='absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent-500/20 to-transparent rounded-bl-full'></div>

                        <div className='relative p-6 pb-4'>
                            <div className='relative bg-white rounded-xl shadow-inner p-8 mb-4 border-2 border-dashed border-primary-200 group-hover:border-accent-400 transition-colors duration-300'>
                                <div className='absolute top-4 left-4 right-4 space-y-2'>
                                    <div className='h-1 bg-primary-200 rounded w-3/4'></div>
                                    <div className='h-1 bg-primary-200 rounded w-full'></div>
                                    <div className='h-1 bg-primary-200 rounded w-5/6'></div>
                                </div>

                                <div className='flex justify-center items-center h-32'>
                                    <div className='relative'>
                                        <FileText className='w-16 h-16 text-error-600' strokeWidth={1.5} />
                                        <div className='absolute -top-1 -right-1 bg-error-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded'>
                                            {file.file_type?.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex gap-2'>
                                <button
                                    onClick={() => window.open(file.file_url, "_blank")}
                                    className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-800 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium'
                                >
                                    <Eye className='w-4 h-4' />
                                    View
                                </button>
                                <a
                                    href={file.file_url}
                                    download
                                    className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium'
                                    >
                                    <Download className='w-4 h-4' />
                                    Download
                                </a>
                            </div>
                        </div>

                        <div className='h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent mx-6'></div>

                        <div className='p-6 pt-4'>
                            <div className='flex items-start justify-between mb-3'>
                                <h3 className='text-base font-bold text-primary-800 leading-tight flex-1 pr-2'>
                                    {file.file_name}
                                </h3>
                                <div className='bg-primary-800 text-white px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap'>
                                    V{Number(file.version)}
                                </div>
                            </div>

                            <div className='space-y-2 mb-4'>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div className='bg-white/50 rounded-lg p-2.5'>
                                        <div className='flex items-center gap-1.5 mb-1'>
                                            <File className='w-3.5 h-3.5 text-accent-600' />
                                            <span className='text-xs font-semibold text-primary-600'>Type</span>
                                        </div>
                                        <p className='text-xs text-primary-800 font-bold uppercase'>{file.file_type}</p>
                                    </div>

                                    <div className='bg-white/50 rounded-lg p-2.5'>
                                        <div className='flex items-center gap-1.5 mb-1'>
                                            <HardDrive className='w-3.5 h-3.5 text-accent-600' />
                                            <span className='text-xs font-semibold text-primary-600'>Size</span>
                                        </div>
                                        <p className='text-xs text-primary-800 font-medium'>
                                            {(file.file_size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                </div>

                                <div className='bg-white/50 rounded-lg p-2.5'>
                                    <div className='flex items-center gap-1.5 mb-1'>
                                        <FolderOpen className='w-3.5 h-3.5 text-accent-600' />
                                        <span className='text-xs font-semibold text-primary-600'>File Path</span>
                                    </div>
                                    <p className='text-xs text-primary-800 font-medium break-all'>{file.file_path}</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-2'>
                                <div
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs uppercase font-bold ${
                                        file.status === "active"
                                        ? "bg-gradient-to-r from-accent-500 to-accent-600 text-white"
                                        : "bg-primary-200 text-primary-700"
                                    }`}
                                >
                                    <div
                                        className={`w-1.5 h-1.5 rounded-full ${
                                        file.status === "active" ? "bg-white" : "bg-primary-600"
                                        }`}
                                    ></div>
                                    {file.status}
                                </div>

                                <div
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                        file.qa_status === "completed"
                                        ? "bg-gradient-to-r from-light-500 to-light-600 text-white"
                                        : file.qa_status === "pending"
                                        ? "bg-gradient-to-r from-error-500 to-error-600 text-white"
                                        : "bg-primary-200 text-primary-700"
                                    }`}
                                >
                                    {file.qa_status === "completed" ? (
                                        <CheckCircle2 className='w-3 h-3' />
                                    ) : file.qa_status === "pending" ? (
                                        <AlertCircle className='w-3 h-3' />
                                    ) : (
                                        <Clock className='w-3 h-3' />
                                    )}
                                    <span className='uppercase'>{file.qa_status}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-3 mt-4 gap-2">
                                <button
                                    onClick={() => handleOpenDelete(file.id)}
                                    className="bg-error-600 p-2 rounded-md text-error-100 font-semibold hover:bg-error-700 flex justify-center items-center text-sm"
                                >   
                                    <Trash className='w-5 h-5 mr-1' />
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleOpenEdit(file)}
                                    className="bg-primary-600 p-2 rounded-md text-error-100 font-semibold hover:bg-primary-700 flex justify-center items-center text-sm"
                                >
                                    <SquarePen className='w-5 h-5 mr-1' />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleOpenStatus(file.id, file.status)}
                                    className={
                                        file.status === 'active' ? 
                                            'bg-primary-800 p-2 rounded-md text-error-100 font-semibold hover:bg-primary-700  flex justify-center items-center text-sm' : 
                                            'bg-light-800 p-2 rounded-md text-error-100 font-semibold hover:bg-light-900  flex justify-center items-center text-sm'
                                    }
                                >
                                    {file.status === 'active' ?
                                        <LockKeyhole className='w-5 h-5 mr-1' /> : 
                                        <LockKeyholeOpen className='w-5 h-5 mr-1' />
                                    }
                                    {file.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
                        </div>

                        {showDeleteModal && (
                            <DeleteDesignFile
                                isSubmitting={isSubmitting}
                                onConfirm={handleConfirmDelete}
                                onCancel={handleCloseDelete}
                            />
                        )}

                        {showStatusModal && (
                            <StatusDesignFile
                                isSubmitting={isSubmitting}
                                onConfirm={handleConfirmStatus}
                                onCancel={handleCloseStatus}
                                status={file.status}
                            />
                        )}

                        {showEditModal && (
                            <EditDesignFile
                                isSubmitting={isSubmitting}
                                onConfirm={handleConfirmEdit}
                                onCancel={handleCloseEdit}
                                designFileStatus={designFileStatus}
                                qaStatus={qaStatus}
                                designId={designId}
                                orderId={orderId}
                                productId={productId}
                                fileTypes={fileTypes}
                                selectedFile={selectedFile}
                            />
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}
