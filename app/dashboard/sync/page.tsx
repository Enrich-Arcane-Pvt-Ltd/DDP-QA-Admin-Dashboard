"use client";

import CreateButton from "@/app/components/CreateButton";
import { CloudDownload, User, FileText, Hash, Package, CheckSquare, Square } from "lucide-react";

import { useState } from "react";
import { useAccessToken } from "@/app/hooks/useAccessToken";
import { useSyncOrders } from "@/app/hooks/useSyncOrders";

import RetrieveOrders from "@/app/forms/sync/RetrieveOrders";
import { GetExternal, SyncOrders } from "@/app/types/SyncOrders";
import { useRouter } from "next/navigation";

export default function OrderSyncPage() {
    const { token } = useAccessToken();
    const { isLoading, isSubmitting, fetchExternal, customer, externalChildOrders, syncOrders, id } = useSyncOrders();

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
    const router = useRouter();

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    
    const handleSubmit = async (formData: GetExternal) => {
        const success = await fetchExternal(token, formData);
        if (success) {
            closeModal();
        }
    };

    const handleSync = async () => {
        if (!customer || selectedOrders.length === 0) return;

        const payload: SyncOrders = {
            order_number: customer.order_no,
            child_order_ids: selectedOrders,
        };

        const newId = await syncOrders(token, payload);

        if (newId) {
            router.push(`/dashboard/orders/${newId}`);
        }
    };

    const toggleOrder = (id: number) => {
        setSelectedOrders(prev => 
            prev.includes(id) 
                ? prev.filter(orderId => orderId !== id)
                : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedOrders.length === externalChildOrders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(externalChildOrders.map(order => order.id));
        }
    };

    const isAllSelected = selectedOrders.length === externalChildOrders.length && externalChildOrders.length > 0;

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <CreateButton label="Retrieve Orders" icon={<CloudDownload />} onClick={openModal} />
            </div>

            {(!externalChildOrders || externalChildOrders.length === 0) && !isLoading && (
                <div className="flex justify-center">
                    <div className="relative xl:w-2/3 bg-light-200 flex justify-center rounded-3xl shadow-2xl overflow-hidden border-2 border-primary-200">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-accent-50 to-light-100"></div>
                    
                        <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
                            <div className="absolute top-10 right-10 w-32 h-32 border-4 border-accent-400 rounded-full"></div>
                            <div className="absolute top-20 right-32 w-20 h-20 border-4 border-primary-400 rounded-full"></div>
                            <div className="absolute top-40 right-20 w-16 h-16 bg-accent-300 rounded-full"></div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 w-80 h-80 opacity-10">
                            <div className="absolute bottom-10 left-10 w-28 h-28 border-4 border-primary-400 rounded-full"></div>
                            <div className="absolute bottom-32 left-24 w-24 h-24 bg-light-600 rounded-full"></div>
                            <div className="absolute bottom-20 left-40 w-12 h-12 border-4 border-accent-400 rounded-full"></div>
                        </div>
                    
                        <div className="relative z-10 flex flex-col items-center justify-center text-center py-10 px-4">
                            <div className="mb-8 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-600 rounded-2xl blur-2xl opacity-30 transform rotate-6"></div>
                                <div className="relative bg-gradient-to-br from-primary-700 to-accent-600 p-6 rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <Package className="w-16 h-16 text-white" strokeWidth={2} />
                                </div>
                            </div>
                            
                            <h3 className="text-4xl font-bold bg-gradient-to-r from-primary-800 to-accent-700 bg-clip-text text-transparent mb-4">
                                Ready to Sync Orders?
                            </h3>
                            
                            <p className="text-lg text-primary-700 max-w-lg mb-8 leading-relaxed">
                                Get started by retrieving external orders from your system. Select the orders you want to sync and manage them all in one place.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex items-center gap-3 px-6 py-3 bg-accent-100 rounded-full border-2 border-accent-300">
                                    <div className="w-3 h-3 bg-accent-600 rounded-full animate-bounce"></div>
                                    <span className="font-semibold text-accent-800">Click &quot;Retrieve Orders&quot; above</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {modalVisible && (
                <RetrieveOrders 
                    onCancel={closeModal}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                />
            )}

            {customer && (
                <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 rounded-2xl shadow-2xl p-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-600 rounded-full opacity-10 blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-light-700 rounded-full opacity-10 blur-3xl -ml-24 -mb-24"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-accent-600 rounded-xl">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Customer Details</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
                                <div className="flex items-center gap-3 mb-2">
                                    <User className="w-5 h-5 text-light-700" />
                                    <p className="text-sm font-medium text-light-300">Name</p>
                                </div>
                                <p className="text-lg font-semibold text-white">{customer.name}</p>
                            </div>
                            
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
                                <div className="flex items-center gap-3 mb-2">
                                    <FileText className="w-5 h-5 text-light-700" />
                                    <p className="text-sm font-medium text-light-300">Order No</p>
                                </div>
                                <p className="text-lg font-semibold text-white">{customer.order_no}</p>
                            </div>
                            
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
                                <div className="flex items-center gap-3 mb-2">
                                    <Hash className="w-5 h-5 text-light-700" />
                                    <p className="text-sm font-medium text-light-300">Customer Ref No</p>
                                </div>
                                <p className="text-lg font-semibold text-white">{customer.customer_ref_no}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {externalChildOrders && externalChildOrders.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary-700 to-accent-600 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Child Orders</h3>
                                    <p className="text-sm text-light-300">{selectedOrders.length} of {externalChildOrders.length} selected</p>
                                </div>
                            </div>
                            
                            <button
                                onClick={toggleAll}
                                className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all text-white font-medium"
                            >
                                {isAllSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                <span>{isAllSelected ? 'Deselect All' : 'Select All'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {externalChildOrders.map((order) => {
                                const isSelected = selectedOrders.includes(order.id);
                                return (
                                    <div
                                        key={order.id}
                                        onClick={() => toggleOrder(order.id)}
                                        className={`
                                            relative cursor-pointer rounded-xl p-4 border-2 transition-all
                                            ${isSelected 
                                                ? 'border-accent-600 bg-accent-50 shadow-md' 
                                                : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'
                                            }
                                        `}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-gray-500 mb-1">Child Order ID</p>
                                                <p className="text-sm font-semibold text-gray-900 truncate">{order.order_no}</p>
                                            </div>
                                            <div className={`
                                                flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                                                ${isSelected 
                                                    ? 'bg-accent-600 border-accent-600' 
                                                    : 'border-gray-300 bg-white'
                                                }
                                            `}>
                                                {isSelected && <CheckSquare className="w-4 h-4 text-white" />}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-center my-4">
                            <CreateButton 
                                label={isSubmitting ? 'Syncing...' : 'Sync Orders'}
                                onClick={handleSync}
                                icon={<CloudDownload />} 
                                className="w-full bg-gradient-to-r from-accent-600 to-accent-500 text-white px-4 py-2 rounded 
                                hover:from-accent-700 hover:to-accent-600 transition-all duration-200 
                                    hover:scale-110 flex flex-row justify-center items-center font-semibold 
                                    text-sm md:text-base" 
                                />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}