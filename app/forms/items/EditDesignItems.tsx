import CustomInput from "@/app/components/CustomInput";
import CustomSelect from "@/app/components/CustomSelect";
import CustomTextArea from "@/app/components/CustomTextArea";
import { Ruler, Shield, X, List, User, Hash, FileText, Crop } from "lucide-react";
import { useState } from "react";
import { DesignItemMetaData, CreateDesignItem as CreateItem, DesignItems } from "../../types/DesignItems";
import { toast } from "@/app/components/ToastContainer";


interface ModalProps {
    onCancel?: () => void;
    metaData: DesignItemMetaData;
    isSubmitting: boolean;
    orderId: number;
    productId: number;
    onSubmit?: (data: CreateItem) => Promise<boolean>;
    row: DesignItems
}

export default function EditDesignItem({ onCancel, metaData, isSubmitting, orderId, productId, onSubmit, row } : ModalProps) {
    const [itemName, setItemName] = useState(row.item_name ?? "");
    const [productSize, setProductSize] = useState(() => {
        const match = metaData.productSizes?.find(
            (s) => s.label === row.size_code
        );
        return match ? String(match.value) : "";
    });
    const [playerName, setPlayerName] = useState(row.player_name ?? "");
    const [playerNumber, setPlayerNumber] = useState(row.player_number ?? "");
    const [notes, setNotes] = useState(row.notes ?? "");
    const [status, setStatus] = useState(row.status ?? "");
    const [qaStatus, setQAStatus] = useState(row.qa_status ?? "");
    const [productStyle, setProductStyle] = useState(row.productStyle ?? "");

    const handleClick = async () => {
        if (!itemName) {
            toast.error('Please Enter the Item Name');
            return;
        }

        const selectedProductStyle = metaData.productStyle?.find(
            (style) => style.label === productStyle
        );

        if (!selectedProductStyle) {
            toast.error('Invalid Product Style selected');
            return;
        }

        const success = await onSubmit?.({ 
            design_order_id: orderId, 
            design_product_id: productId, 
            item_name: itemName, 
            status: status, 
            qa_status: qaStatus,
            player_name: playerName,
            product_id: Number(selectedProductStyle.value),
            ...(productSize ? { product_size_id: Number(productSize) } : {}),
            player_number: playerNumber,
            notes: notes
        });

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
                                <List className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Edit Design Item</h2>
                                <p className="text-primary-100 text-sm">Edit your design item here</p>
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
                            <List size={16} className="text-accent-600" />
                            Product Item Name <span className="text-error-600">*</span>
                        </label>
                        <CustomInput 
                            type='text'
                            placeholder="Enter the Item Name"
                            icon={<List />}
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <Ruler size={16} className="text-accent-600" />
                            Product Size
                        </label>
                        <CustomSelect
                            value={productSize}
                            onChange={(e) => setProductSize(e.target.value)}
                            options={metaData.productSizes ?? []}
                            icon={<Ruler />}
                            placeholder="Select Product Size"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <Crop size={16} className="text-accent-600" />
                            Product Style
                        </label>
                        <CustomSelect
                            value={productStyle}
                            onChange={(e) => setProductStyle(e.target.value)}
                            options={metaData.productStyle ?? []}
                            icon={<Crop />}
                            placeholder="Select Product Style"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <User size={16} className="text-accent-600" />
                            Player Name
                        </label>
                        <CustomInput 
                            type='text'
                            placeholder="Enter the Player Name"
                            icon={<User />}
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <Hash size={16} className="text-accent-600" />
                            Player Number
                        </label>
                        <CustomInput 
                            type='text'
                            placeholder="Enter the Player Number"
                            icon={<Hash />}
                            value={playerNumber}
                            onChange={(e) => setPlayerNumber(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                            <FileText size={16} className="text-accent-600" />
                            Notes
                        </label>
                        <CustomTextArea 
                            placeholder="Enter Any Special Notes"
                            icon={<FileText />}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            maxLength={255}
                            rows={3}
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
                            options={metaData.designItemStatus ?? []}
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
                            value={qaStatus}
                            onChange={(e) => setQAStatus(e.target.value)}
                            options={metaData.qaStatus ?? []}
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
                        {isSubmitting ? 'Editing Design Item...' : 'Edit Design Item'}
                    </button>
                </div>
            </div>
        </div>
    )
}