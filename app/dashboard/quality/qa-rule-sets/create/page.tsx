"use client";

import CustomInput from "@/app/components/CustomInput";
import CustomSelect from "@/app/components/CustomSelect";
import { toast } from "@/app/components/ToastContainer";
import { useAccessToken } from "@/app/hooks/useAccessToken";
import { CheckCircle2, List, Shield, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import Loader from "@/app/components/Loader";
import { useQARuleSets } from "@/app/hooks/useQARuleSets";

export default function CreateQARuleSetPage() {
    const { token } = useAccessToken();
    const { isLoading, qaRuleSetMetaData, fetchQARuleSetsMetaData, isSubmitting, createQARuleSet } = useQARuleSets();

    const router = useRouter();

    const [ruleSetName, setRuleSetName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [selectedRules, setSelectedRules] = useState<number[]>([]);

    useEffect(() => {
        if (token) {
            fetchQARuleSetsMetaData(token);
        }
    }, [fetchQARuleSetsMetaData, token]);

    const availableRules = useMemo(() => {
        if (!qaRuleSetMetaData?.qaRules) return [];

        return qaRuleSetMetaData.qaRules.map(rule => ({
            id: rule.value,
            name: rule.label,
        }));
    }, [qaRuleSetMetaData]);

    const toggleRule = (id: number) => {
        setSelectedRules(prev =>
            prev.includes(id)
                ? prev.filter(pid => pid !== id)
                : [...prev, id]
        );
    };

    const handleClick = async () => {
        if (!ruleSetName) {
            toast.error("QA Rule Name is required");
            return;
        }

        if (!status) {
            toast.error("Status is required");
            return;
        }

        if (selectedRules.length === 0) {
            toast.error("At least one QA Rule must be selected");
            return;
        }


        const data = {
            qa_rule_set_name: ruleSetName,
            status: status,
            description: description, // **NEW: Including description in the payload**
            qa_rules: selectedRules
        }

        const success = await createQARuleSet(data, token);
        if (success) {
            setRuleSetName('');
            setStatus('');
            setDescription('');
            setSelectedRules([]);

            setTimeout(() => {
                router.push('/dashboard/quality/qa-rule-sets');
            }, 2000);
        }
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }

    const statusOptions = qaRuleSetMetaData?.qaRuleSetStatus ?? [];

    return (
        <div>
            <div className="my-4">
                <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-primary-800">
                    Create New QA Rule Set
                </h1>
                <p className="mt-2 text-sm text-primary-600 sm:text-base">
                    Define QA Rule Set details and assign rules to control quality.
                </p>
            </div>

            <div className="overflow-hidden border shadow-xl bg-light-100 backdrop-blur-sm rounded-2xl border-primary-200/50">
                <div className="p-6 space-y-8 sm:p-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-3 border-b-2 border-accent-600/20">
                            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-accent-600 to-primary-700"></div>
                            <h2 className="text-xl font-bold text-primary-800">Basic Information</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                    <User size={16} className="text-accent-600" />
                                    Rule Set Name
                                    <span className="text-error-600">*</span>
                                </label>
                                <CustomInput
                                    type='text'
                                    placeholder="Enter the Rule Set Name"
                                    icon={<User />}
                                    value={ruleSetName}
                                    onChange={(e) => setRuleSetName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                    <Shield size={16} className="text-accent-600" />
                                    Status
                                    <span className="text-error-600">*</span>
                                </label>
                                <CustomSelect
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    options={statusOptions}
                                    icon={<Shield />}
                                    placeholder="Select Status"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 col-span-full">
                            <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                <List size={16} className="text-accent-600" />
                                Description
                            </label>
                            <textarea
                                placeholder="Enter a detailed description for the QA Rule Set (Optional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 text-sm transition-all duration-200 bg-white border-2 rounded-lg shadow-sm resize-none focus:outline-none focus:border-accent-500 border-primary-200 text-primary-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b-2 border-accent-600/20">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-accent-600 to-primary-700"></div>
                                <h2 className="text-xl font-bold text-primary-800">Available QA Rules</h2> <span className="text-error-600">*</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-primary-600">
                                <CheckCircle2 size={16} className="text-accent-600" />
                                <span className="font-medium">
                                    **{selectedRules.length}** selected
                                </span>
                            </div>
                        </div>

                        <div className="p-5 border-2 rounded-xl border-primary-200/50 bg-light-100">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {availableRules.map((rule) => {
                                    const isChecked = selectedRules.includes(rule.id);
                                    return (
                                        <label
                                            key={rule.id}
                                            className={`
                                                flex items-center gap-2.5 p-3 rounded-lg text-sm cursor-pointer
                                                transition-all duration-200 border-2
                                                ${isChecked
                                                    ? 'bg-gradient-to-br from-accent-100 to-primary-100 border-accent-600 shadow-sm'
                                                    : 'bg-white border-primary-200 hover:border-accent-400 hover:bg-light-100'
                                                }
                                            `}
                                        >
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => toggleRule(rule.id)}
                                                    className="w-5 h-5 transition-all border-2 rounded appearance-none cursor-pointer peer border-primary-300 checked:bg-accent-600 checked:border-accent-600"
                                                />
                                                <CheckCircle2
                                                    className="absolute top-0 left-0 w-5 h-5 text-white transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100"
                                                    size={20}
                                                />
                                            </div>
                                            <span className={`font-medium ${isChecked ? 'text-primary-800' : 'text-primary-700'}`}>
                                                {rule.name}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-6 border-t sm:flex-row border-primary-200">
                        <button
                            onClick={handleClick}
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-600 to-primary-700 hover:from-accent-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {isSubmitting ? 'Creating Rule Set...' : 'Create Rule Set'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}