"use client";

import SceneClient from '@/app/components/SceneClient';
import { AlertCircle, CheckCircle2, Download, FileType, GitBranch, HardDrive, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function ObjectPageClient() {
    const searchParams = useSearchParams();

    const url = searchParams.get("url");
    const fileName = searchParams.get("file_name");
    const fileSize = searchParams.get("file_size");
    const fileType = searchParams.get("file_type");
    const qaStatus = searchParams.get("qa_status");
    const status = searchParams.get("status");
    const version = searchParams.get("version");

    if (!url) {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 to-primary-800">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-error-500 mx-auto mb-4" />
                    <p className="text-light-700 text-lg">No model URL provided.</p>
                </div>
            </div>
        )
    }

    const formatFileSize = (bytes: string | null) => {
        if (!bytes) return 'N/A';
        const size = parseInt(bytes);
        if (isNaN(size)) return bytes;
        
        const units = ['B', 'KB', 'MB', 'GB'];
        let index = 0;
        let value = size;
        
        while (value >= 1024 && index < units.length - 1) {
            value /= 1024;
            index++;
        }
        
        return `${value.toFixed(2)} ${units[index]}`;
    };

    const getStatusConfig = (statusValue: string | null) => {
        switch(statusValue?.toLowerCase()) {
            case 'approved':
            case 'active':
            case 'completed':
                return { icon: CheckCircle2, color: 'text-accent-500', bg: 'bg-accent-500/10', label: statusValue };
            case 'rejected':
            case 'failed':
            case 'error':
                return { icon: XCircle, color: 'text-error-500', bg: 'bg-error-500/10', label: statusValue };
            case 'pending':
            case 'processing':
                return { icon: AlertCircle, color: 'text-light-500', bg: 'bg-light-500/10', label: statusValue };
            default:
                return { icon: AlertCircle, color: 'text-light-600', bg: 'bg-light-600/10', label: statusValue || 'Unknown' };
        }
    };

    const statusConfig = getStatusConfig(status);
    const qaStatusConfig = getStatusConfig(qaStatus);
    const StatusIcon = statusConfig.icon;
    const QaStatusIcon = qaStatusConfig.icon;

    return (
        <div className='h-screen overflow-hidden flex flex-col xl:flex-row bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900'>
            <div className='w-full xl:w-2/3 h-1/2 xl:h-full'>
                <SceneClient modelUrl={url} />
            </div>
            
            <div className='w-full xl:w-1/3 h-1/2 xl:h-full overflow-y-auto bg-primary-800/50 backdrop-blur-sm border-t xl:border-t-0 xl:border-l border-primary-700/50'>
                <div className='p-6 xl:p-8 space-y-6'>
                    <div className='space-y-3 pb-6 border-b border-primary-700/50'>
                        <div className='flex items-start justify-between gap-4'>
                            <div className='flex-1 min-w-0'>
                                <h3 className='text-2xl xl:text-3xl font-bold text-light-700 truncate'>
                                    {fileName || 'Untitled Model'}
                                </h3>
                            </div>
                            <button 
                                onClick={() => window.open(url, '_blank')}
                                className='flex-shrink-0 p-2 rounded-lg bg-accent-600/20 hover:bg-accent-600/30 text-accent-400 hover:text-accent-300 transition-all duration-200 hover:scale-105'
                                title='Download Model'
                            >
                                <Download className='w-5 h-5' />
                            </button>
                        </div>
                        
                        <div className='flex flex-wrap gap-2'>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs capitalize font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                                <StatusIcon className='w-3.5 h-3.5' />
                                {statusConfig.label}
                            </span>
                            {qaStatus && (
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs capitalize font-medium ${qaStatusConfig.bg} ${qaStatusConfig.color}`}>
                                    <QaStatusIcon className='w-3.5 h-3.5' />
                                    QA: {qaStatusConfig.label}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <h4 className='text-sm font-semibold text-light-600 uppercase tracking-wider'>Model Details</h4>
                        
                        <div className='grid gap-4'>
                            <div className='group p-4 rounded-xl bg-primary-700/30 hover:bg-primary-700/50 border border-primary-600/30 transition-all duration-200'>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2 rounded-lg bg-accent-600/20 text-accent-400 group-hover:scale-110 transition-transform duration-200'>
                                        <HardDrive className='w-5 h-5' />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-xs text-light-500 font-medium'>File Size</p>
                                        <p className='text-lg font-semibold text-light-700 truncate'>
                                            {formatFileSize(fileSize)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='group p-4 rounded-xl bg-primary-700/30 hover:bg-primary-700/50 border border-primary-600/30 transition-all duration-200'>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2 rounded-lg bg-light-600/20 text-light-400 group-hover:scale-110 transition-transform duration-200'>
                                        <FileType className='w-5 h-5' />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-xs text-light-500 font-medium'>File Type</p>
                                        <p className='text-lg font-semibold text-light-700 uppercase truncate'>
                                            {fileType || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {version && (
                                <div className='group p-4 rounded-xl bg-primary-700/30 hover:bg-primary-700/50 border border-primary-600/30 transition-all duration-200'>
                                    <div className='flex items-center gap-3'>
                                        <div className='p-2 rounded-lg bg-accent-600/20 text-accent-400 group-hover:scale-110 transition-transform duration-200'>
                                            <GitBranch className='w-5 h-5' />
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='text-xs text-light-500 font-medium'>Version</p>
                                            <p className='text-lg font-semibold text-light-700 truncate'>
                                                {version}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}