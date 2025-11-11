import React from 'react';
import { User, Hash, FileText, CheckCircle, Clock, AlertCircle, Sparkles, Package, Eye, Pencil, Trash2 } from 'lucide-react';
import { DesignItems } from '../types/DesignItems';

interface DesignItemsCardsProps {
    designItems: DesignItems[];
    onView?: (item: DesignItems) => void;
    onEdit?: (item: DesignItems) => void;
    onDelete?: (id: number) => void;
}

const DesignItemsCards: React.FC<DesignItemsCardsProps> = ({ 
    designItems, 
    onView, 
    onEdit, 
    onDelete 
}) => {
    const getStatusGradient = (status: string) => {
        return status === 'active' 
            ? 'bg-gradient-to-r from-accent-600 to-accent-500' 
            : 'bg-gradient-to-r from-gray-500 to-gray-400';
    };

    const getQAStatusConfig = (qaStatus: string) => {
        switch (qaStatus) {
            case 'approved':
                return { 
                    icon: <CheckCircle className="w-4 h-4" />, 
                    color: 'text-green-600 bg-green-50 border-green-200',
                    glow: 'shadow-green-100'
                };
            case 'pending':
                return { 
                    icon: <Clock className="w-4 h-4" />, 
                    color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
                    glow: 'shadow-yellow-100'
                };
            case 'rejected':
                return { 
                    icon: <AlertCircle className="w-4 h-4" />, 
                    color: 'text-error-700 bg-error-100 border-error-200',
                    glow: 'shadow-error-100'
                };
            default:
                return { 
                    icon: <Clock className="w-4 h-4" />, 
                    color: 'text-gray-600 bg-gray-50 border-gray-200',
                    glow: 'shadow-gray-100'
                };
        }
    };

    if (!designItems || designItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-20 blur-3xl rounded-full" />
                    <Package className="w-24 h-24 text-primary-300 relative" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-primary-800 mt-8 mb-2">No Design Items Yet</h3>
                <p className="text-gray-500 text-center max-w-md">
                    Start creating design items to bring your products to life
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6 mt-8 pb-8">
            {designItems.map((item, index) => {
                const qaConfig = getQAStatusConfig(item.qa_status ?? "");
                const hasPlayerInfo = item.player_name || item.player_number;
                
                return (
                    <div
                        key={item.id}
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-1 flex flex-col"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-100 to-transparent opacity-50 rounded-bl-full" />
                        
                        <div className="relative px-6 pt-6 pb-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Sparkles className="w-4 h-4 text-accent-600" />
                                        <span className="text-xs font-semibold text-accent-700 uppercase tracking-wider">
                                            Design Item
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-800 group-hover:text-accent-600 transition-colors duration-300">
                                        {item.item_name}
                                    </h3>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-xs font-mono text-white bg-primary-700 px-3 py-1.5 rounded-full shadow-md">
                                        #{item.id}
                                    </span>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-light-600 to-light-500 opacity-30 blur-sm rounded-xl" />
                                <div className="relative bg-gradient-to-br from-light-700 to-light-600 p-4 rounded-xl border-2 border-light-500 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-primary-700">Size</span>
                                        <span className="text-2xl font-black text-accent-700 tracking-tight">
                                            {item.size_code}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 pb-6 space-y-4 flex-1">
                            {hasPlayerInfo && (
                                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-4 border border-primary-100">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-accent-600 to-accent-700 rounded-full flex items-center justify-center shadow-md">
                                            <User className="w-5 h-5 text-white" strokeWidth={2.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {item.player_name && (
                                                <p className="text-sm font-bold text-primary-800 truncate">
                                                    {item.player_name}
                                                </p>
                                            )}
                                            {item.player_number && (
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <Hash className="w-3.5 h-3.5 text-accent-600" />
                                                    <span className="text-sm font-semibold text-accent-700">
                                                        {item.player_number}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {item.notes && (
                                <div className="relative">
                                    <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-400 to-accent-600 rounded-full" />
                                    <div className="pl-4 pr-2 py-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="flex items-start gap-2">
                                            <FileText className="w-4 h-4 text-accent-600 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {item.notes}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-2 pt-2">
                                <div className={`${getStatusGradient(item.status ?? "")} text-white text-xs font-bold px-4 py-2 rounded-full shadow-md uppercase tracking-wide`}>
                                    {item.status}
                                </div>
                                <div className={`flex items-center gap-2 ${qaConfig.color} border px-4 py-2 rounded-full shadow-sm ${qaConfig.glow}`}>
                                    {qaConfig.icon}
                                    <span className="text-xs font-bold uppercase tracking-wide">
                                        {item.qa_status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-6 pb-4 mt-auto">
                            <div className="flex items-center gap-2">
                                {onView && (
                                    <button
                                        onClick={() => onView(item)}
                                        className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-600 hover:to-primary-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
                                    >
                                        <div className="relative flex items-center justify-center gap-2">
                                            <Eye className="w-4 h-4" strokeWidth={2.5} />
                                            <span>View</span>
                                        </div>
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300" />
                                    </button>
                                )}
                                
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
                                    >
                                        <div className="relative flex items-center justify-center gap-2">
                                            <Pencil className="w-4 h-4" strokeWidth={2.5} />
                                            <span>Edit</span>
                                        </div>
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300" />
                                    </button>
                                )}
                                
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="group/btn relative overflow-hidden bg-gradient-to-r from-error-700 to-error-600 hover:from-error-600 hover:to-error-500 text-white p-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
                                    >
                                        <div className="relative flex items-center justify-center">
                                            <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                                        </div>
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="relative px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                                        {item.created_by?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Created by</p>
                                        <p className="text-sm font-bold text-primary-800">{item.created_by}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-600 to-primary-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                    </div>
                );
            })}
        </div>
    );
};

export default DesignItemsCards;