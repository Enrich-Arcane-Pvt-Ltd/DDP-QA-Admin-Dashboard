import CustomInput from "@/app/components/CustomInput";
import CustomSelect from "@/app/components/CustomSelect";
import CustomTextArea from "@/app/components/CustomTextArea";
import { Ruler, Shield, X, List, User, Hash, FileText, Layers, Plus, Trash2, Type, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { DesignItemMetaData, CreateDesignItem as CreateItem, Layer } from "../../types/DesignItems";
import { toast } from "@/app/components/ToastContainer";
import CreateButton from "@/app/components/CreateButton";

interface ModalProps {
    onCancel?: () => void;
    metaData: DesignItemMetaData;
    isSubmitting: boolean;
    orderId: number;
    productId: number;
    onSubmit?: (data: CreateItem) => Promise<boolean>;
}

const layerTypeOptions = [
    { value: "text", label: "Text/Number" },
    { value: "graphic", label: "Logo/Graphic" },
    { value: "body", label: "Body/Fill" },
    { value: "other", label: "Other" },
];

export default function CreateDesignItem({ onCancel, metaData, isSubmitting, orderId, productId, onSubmit } : ModalProps) {
    const [itemName, setItemName] = useState('');
    const [productSize, setProductSize] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [playerNumber, setPlayerNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState('');
    const [qaStatus, setQAStatus] = useState('');
    const [layers, setLayers] = useState<Layer[]>([]);

    const mapLayersForSubmit = (layers: Layer[]) => {
        return layers.map(layer => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mappedLayer: any = {
                layer_name: layer.layerName,
                layer_type: layer.layerType,
            };

            const hasTextDetails =
                layer.textContent ||
                layer.fontName ||
                layer.fontSize ||
                layer.fillColorName;

            if (hasTextDetails) {
                mappedLayer.text_details = {
                    ...(layer.textContent && { content: layer.textContent }),
                    ...(layer.fontName && { font_name: layer.fontName }),
                    ...(layer.fontSize && { size_pt: Number(layer.fontSize) }),
                    ...(layer.fillColorName && { color_fill_name: layer.fillColorName }),
                };
            }

            const hasColorDetails =
                layer.totalSwatches ||
                layer.primarySpot ||
                layer.primaryColor;

            if (hasColorDetails) {
                mappedLayer.color_details = {
                    ...(layer.totalSwatches && { total_swatches: Number(layer.totalSwatches) }),
                    ...(layer.primarySpot && { primary_spot: layer.primarySpot }),
                    ...(layer.primaryColor && { primary_color: layer.primaryColor }),
                };
            }

            if (layer.layerCategory === 'text') {
                mappedLayer.is_text_layer = true;
            }

            if (layer.layerCategory === 'logo') {
                mappedLayer.is_logo_layer = true;
            }

            return mappedLayer;
        });
    };

    useEffect(() => {
        if (metaData?.designItemStatus?.length > 0 && !status) {
            setStatus(metaData.designItemStatus[0].value);
        }
        if (metaData?.qaStatus?.length > 0 && !qaStatus) {
            setQAStatus(metaData.qaStatus[0].value);
        }
    }, [metaData, status, qaStatus]);

    const addLayer = () => {
        const newLayer: Layer = {
            id: `layer-${Date.now()}`,
            layerName: '',
            layerType: '',
            layerCategory: 'text',
            textContent: '',
            fontName: '',
            fontSize: '',
            fillColorName: '',
            totalSwatches: '',
            primarySpot: '',
            primaryColor: ''
        };
        setLayers([...layers, newLayer]);
    };

    const deleteLayer = (id: string) => {
        setLayers(layers.filter(layer => layer.id !== id));
    };

    const updateLayer = (id: string, field: keyof Layer, value: string | 'text' | 'logo') => {
        setLayers(layers.map(layer => 
            layer.id === id ? { ...layer, [field]: value } : layer
        ));
    };

    const handleClick = async () => {
        if (!itemName) {
            toast.error('Please Enter the Item Name');
            return;
        }        

        const success = await onSubmit?.({ 
            design_order_id: orderId, 
            design_product_id: productId, 
            item_name: itemName, 
            status: status, 
            qa_status: qaStatus,
            player_name: playerName,
            ...(productSize ? { product_size_id: Number(productSize) } : {}),
            player_number: playerNumber,
            notes: notes,
            layers: mapLayersForSubmit(layers),
        });
        if (success) onCancel?.();
    }

    return (
        <div onClick={onCancel} className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/40 backdrop-blur-sm p-4 animate-fadeIn">
            <div onClick={(e) => e.stopPropagation()} className="bg-gradient-to-br from-primary-100 to-primary-400 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 animate-slideUp">
                <div className="relative bg-gradient-to-r from-primary-700 to-primary-600 rounded-t-2xl p-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-800/20 rounded-full -ml-12 -mb-12"></div>
                    
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                <List className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Create Design Item</h2>
                                <p className="text-primary-100 text-sm">Add a new design item to your design product</p>
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

                    {layers.map((layer, index) => (
                        <div key={layer.id} className="space-y-4 p-5 rounded-xl backdrop-blur-sm border-2 border-primary-200 relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
                                        <Layers size={16} className="text-accent-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-primary-800">Layer {index + 1}</h3>
                                </div>
                                <button
                                    onClick={() => deleteLayer(layer.id)}
                                    className="w-8 h-8 rounded-lg bg-error-100 hover:bg-error-200 flex items-center justify-center transition-all duration-200 hover:scale-110"
                                >
                                    <Trash2 size={16} className="text-error-600" />
                                </button>
                            </div>

                            <div className="space-y-4 p-4 rounded-lg bg-primary-50/50">
                                <h4 className="font-semibold text-accent-700 text-lg flex items-center gap-2">
                                    <Layers size={16} className="text-accent-600" />
                                    Layer Details
                                </h4>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                            <Layers size={14} className="text-accent-600" />
                                            Layer Name
                                        </label>
                                        <CustomInput 
                                            type='text'
                                            placeholder="Enter Layer Name"
                                            icon={<Layers />}
                                            value={layer.layerName}
                                            onChange={(e) => updateLayer(layer.id, 'layerName', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                            <List size={14} className="text-accent-600" />
                                            Layer Type
                                        </label>
                                        <CustomSelect
                                            value={layer.layerType}
                                            onChange={(e) => updateLayer(layer.id, 'layerType', e.target.value)}
                                            options={layerTypeOptions}
                                            icon={<List />}
                                            placeholder="Select Layer Type"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                        Layer Category
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name={`layerCategory-${layer.id}`}
                                                value="text"
                                                checked={layer.layerCategory === 'text'}
                                                onChange={(e) => updateLayer(layer.id, 'layerCategory', 'text')}
                                                className="w-4 h-4 text-accent-600 border-primary-300 focus:ring-accent-500"
                                            />
                                            <span className="text-sm font-medium text-primary-800">Is Text Layer</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name={`layerCategory-${layer.id}`}
                                                value="logo"
                                                checked={layer.layerCategory === 'logo'}
                                                onChange={(e) => updateLayer(layer.id, 'layerCategory', 'logo')}
                                                className="w-4 h-4 text-accent-600 border-primary-300 focus:ring-accent-500"
                                            />
                                            <span className="text-sm font-medium text-primary-800">Is Logo Layer</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 p-4 rounded-lg bg-primary-50/50">
                                <h4 className="font-semibold text-accent-700 text-lg flex items-center gap-2">
                                    <Type size={16} className="text-accent-600" />
                                    Text Details
                                </h4>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                        <FileText size={14} className="text-accent-600" />
                                        Content
                                    </label>
                                    <CustomInput 
                                        type='text'
                                        placeholder="Enter Text Content"
                                        icon={<FileText />}
                                        value={layer.textContent}
                                        onChange={(e) => updateLayer(layer.id, 'textContent', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                        <Type size={14} className="text-accent-600" />
                                        Font Name
                                    </label>
                                    <CustomInput 
                                        type='text'
                                        placeholder="Enter Font Name"
                                        icon={<Type />}
                                        value={layer.fontName}
                                        onChange={(e) => updateLayer(layer.id, 'fontName', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                        <Hash size={14} className="text-accent-600" />
                                        Font Size
                                    </label>
                                    <CustomInput 
                                        type='number'
                                        placeholder="Enter Font Size"
                                        icon={<Hash />}
                                        value={layer.fontSize}
                                        onChange={(e) => updateLayer(layer.id, 'fontSize', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                        <Palette size={14} className="text-accent-600" />
                                        Fill Color Name
                                    </label>
                                    <CustomInput 
                                        type='text'
                                        placeholder="Enter Fill Color Name"
                                        icon={<Palette />}
                                        value={layer.fillColorName}
                                        onChange={(e) => updateLayer(layer.id, 'fillColorName', e.target.value)}
                                    />
                                </div>
                                </div>
                            </div>

                            <div className="space-y-4 p-4 rounded-lg bg-primary-50/50">
                                <h4 className="font-semibold text-accent-700 text-lg flex items-center gap-2">
                                    <Palette size={16} className="text-accent-600" />
                                    Color Details
                                </h4>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                            <Hash size={14} className="text-accent-600" />
                                            Total Swatches
                                        </label>
                                        <CustomInput 
                                            type='text'
                                            placeholder="Enter Total Swatches"
                                            icon={<Hash />}
                                            value={layer.totalSwatches}
                                            onChange={(e) => updateLayer(layer.id, 'totalSwatches', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                            <Palette size={14} className="text-accent-600" />
                                            Primary Spot
                                        </label>
                                        <CustomInput 
                                            type='text'
                                            placeholder="Enter Primary Spot"
                                            icon={<Palette />}
                                            value={layer.primarySpot}
                                            onChange={(e) => updateLayer(layer.id, 'primarySpot', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                            <Palette size={14} className="text-accent-600" />
                                            Primary Color
                                        </label>
                                        <CustomInput 
                                            type='text'
                                            placeholder="Enter Primary Color"
                                            icon={<Palette />}
                                            value={layer.primaryColor}
                                            onChange={(e) => updateLayer(layer.id, 'primaryColor', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <CreateButton 
                            icon={<Plus />}
                            label="Add Layer"
                            onClick={addLayer}
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
                        {isSubmitting ? 'Creating Design Item...' : 'Create Design Item'}
                    </button>
                </div>
            </div>
        </div>
    )
}