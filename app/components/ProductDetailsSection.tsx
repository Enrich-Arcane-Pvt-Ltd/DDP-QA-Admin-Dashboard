import { Package, User, FileCheck, Tag, ShoppingBag, CheckCircle, Sparkles } from 'lucide-react';

interface DesignProduct {
    product_name: string;
    status: string;
    qa_status: string;
    order_name: string;
    order_number: string;
    customer_name: string;
    product_type: string;
    created_by: string;
    qa_analyst: string;
}

interface ProductDetailsSectionProps {
    designProduct: DesignProduct;
}

export default function ProductDetailsSection({ designProduct }: ProductDetailsSectionProps) {
    const getStatusColor = (status: string) => {
        if (status === 'active') return 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30';
        if (status === 'completed') return 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-600/30';
        return 'bg-gradient-to-r from-light-600 to-light-700 text-primary-800';
    };

    const getQAStatusColor = (qaStatus: string) => {
        if (qaStatus === 'completed') return 'bg-gradient-to-r from-accent-600 to-accent-700 text-white shadow-lg shadow-accent-600/30';
        if (qaStatus === 'pending') return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30';
        return 'bg-gradient-to-r from-error-500 to-error-600 text-white shadow-lg shadow-error-500/30';
    };

    return (
        <>
            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 rounded-3xl md:p-10 p-6 mb-8 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-white/20 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/30">
                                    <Package className="w-8 h-8 text-white drop-shadow-lg" />
                                </div>
                                <div>
                                    <h1 className="text-xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                                        {designProduct?.product_name}
                                    </h1>
                                    <p className="text-white/80 text-sm md:text-lg flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                                        Product Details Overview
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-3 mt-6">
                                <span className={`${getStatusColor(designProduct?.status ?? "")} px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-semibold flex items-center gap-2 transform hover:scale-105 transition-transform`}>
                                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                                    {designProduct.status.charAt(0).toUpperCase() + designProduct?.status.slice(1)}
                                </span>
                                <span className={`${getQAStatusColor(designProduct?.qa_status ?? "")} px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-semibold flex items-center gap-2 transform hover:scale-105 transition-transform`}>
                                    <FileCheck className="w-4 h-4 md:w-5 md:h-5" />
                                    QA: {designProduct.qa_status.charAt(0).toUpperCase() + designProduct?.qa_status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-light-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-3 md:p-4 rounded-xl shadow-lg group-hover:shadow-accent-500/50 transition-shadow">
                            <ShoppingBag className="w-6 h-6 md:w-7 md:h-7 text-white" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-primary-800">Order Information</h2>
                    </div>
                    <div className="space-y-4 md:space-y-5">
                        <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-light-50 to-light-100 rounded-xl hover:from-accent-50 hover:to-accent-100 transition-colors border border-light-200">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <Tag className="w-4 h-4 md:w-5 md:h-5 text-accent-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs md:text-sm text-primary-600 font-semibold mb-1">Order Name</p>
                                <p className="text-base md:text-lg text-primary-900 font-bold truncate">{designProduct?.order_name}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-light-50 to-light-100 rounded-xl hover:from-accent-50 hover:to-accent-100 transition-colors border border-light-200">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <FileCheck className="w-4 h-4 md:w-5 md:h-5 text-accent-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs md:text-sm text-primary-600 font-semibold mb-1">Order Number</p>
                                <p className="text-base md:text-lg text-primary-900 font-bold font-mono tracking-wide">{designProduct?.order_number}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-light-50 to-light-100 rounded-xl hover:from-accent-50 hover:to-accent-100 transition-colors border border-light-200">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <User className="w-4 h-4 md:w-5 md:h-5 text-accent-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs md:text-sm text-primary-600 font-semibold mb-1">Customer Name</p>
                                <p className="text-base md:text-lg text-primary-900 font-bold truncate">{designProduct?.customer_name}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-light-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-3 md:p-4 rounded-xl shadow-lg group-hover:shadow-primary-600/50 transition-shadow">
                            <Package className="w-6 h-6 md:w-7 md:h-7 text-white" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-primary-800">Product Details</h2>
                    </div>
                    <div className="space-y-4 md:space-y-5">
                        <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-light-50 to-light-100 rounded-xl hover:from-primary-50 hover:to-primary-100 transition-colors border border-light-200">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <Tag className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs md:text-sm text-primary-600 font-semibold mb-1">Product Type</p>
                                <p className="text-base md:text-lg text-primary-900 font-bold truncate">{designProduct?.product_type}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-light-50 to-light-100 rounded-xl hover:from-primary-50 hover:to-primary-100 transition-colors border border-light-200">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <User className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs md:text-sm text-primary-600 font-semibold mb-1">Created By</p>
                                <p className="text-base md:text-lg text-primary-900 font-bold truncate">{designProduct?.created_by}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-light-50 to-light-100 rounded-xl hover:from-primary-50 hover:to-primary-100 transition-colors border border-light-200">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <FileCheck className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs md:text-sm text-primary-600 font-semibold mb-1">QA Analyst</p>
                                <p className="text-base md:text-lg text-primary-900 font-bold truncate">{designProduct?.qa_analyst}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}