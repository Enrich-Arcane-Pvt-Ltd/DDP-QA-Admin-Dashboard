"use client";

import { CheckCircle2, List, Lock, Shield, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import Loader from "@/app/components/Loader";
import { useAccessToken } from "@/app/hooks/useAccessToken";
import { useQARuleSets } from "@/app/hooks/useQARuleSets";

export default function ViewQARuleSetPage() {
    const { id } = useParams();
    const ruleSetId = Number(id);
    const router = useRouter();

    const { token } = useAccessToken();
    const {
        isLoading,
        qaRuleSet,
        fetchQARuleSet,
        qaRuleSetMetaData
    } = useQARuleSets();

    useEffect(() => {
        if (!isNaN(ruleSetId) && token) {
            fetchQARuleSet(ruleSetId, token);
        }
    }, [fetchQARuleSet, token, ruleSetId]);

    const availableRules = useMemo(() => {
        return qaRuleSetMetaData?.qaRules.map(rule => ({
            id: rule.value,
            name: rule.label
        })) ?? [];
    }, [qaRuleSetMetaData]);

    const selectedRules = useMemo(() => {
        // Map assigned rules to IDs if needed
        return qaRuleSet?.qa_rules?.map((r: any) => r.id) ?? [];
    }, [qaRuleSet]);

    const rulesGroupedForUI = useMemo(() => {
        if (!availableRules.length) return [];

        return [{
            category: "General Rules",
            permissions: availableRules.map(r => ({ id: r.id, name: r.name })),
        }];
    }, [availableRules]);

    if (isLoading || !qaRuleSet) {
        return <Loader />;
    }

    return (
        <div>
            <div className="my-4">
                <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-primary-800">
                    View QA Rule Set: {qaRuleSet.qa_rule_set_name}
                </h1>
                <p className="mt-2 text-sm text-primary-600 sm:text-base">
                    Detailed information and assigned QA Rules
                </p>
            </div>

            <div className="overflow-hidden border shadow-xl bg-light-100 backdrop-blur-sm rounded-2xl border-primary-200/50">
                <div className="p-6 space-y-8 sm:p-8">

                    {/* Basic Information */}
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
                                </label>
                                <div className="px-4 py-3 text-sm bg-white border rounded-lg border-primary-200 text-primary-800">
                                    {qaRuleSet.qa_rule_set_name}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                    <Shield size={16} className="text-accent-600" />
                                    Status
                                </label>
                                <div className="px-4 py-3 text-sm bg-white border rounded-lg border-primary-200 text-primary-800">
                                    {qaRuleSet.status}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 col-span-full">
                            <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                <List size={16} className="text-accent-600" />
                                Description
                            </label>
                            <div className="w-full px-4 py-3 text-sm whitespace-pre-wrap bg-white border rounded-lg border-primary-200 text-primary-800">
                                {qaRuleSet.description || "-"}
                            </div>
                        </div>
                    </div>

                    {/* QA Rules */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b-2 border-accent-600/20">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-accent-600 to-primary-700"></div>
                                <h2 className="text-xl font-bold text-primary-800">QA Rules</h2>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-primary-600">
                                <CheckCircle2 size={16} className="text-accent-600" />
                                <span className="font-medium">{selectedRules.length} selected</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {rulesGroupedForUI?.map((group) => {
                                return (
                                    <div
                                        key={group.category}
                                        className="overflow-hidden border shadow-md group bg-gradient-to-br from-white to-light-100 rounded-xl border-primary-200/50"
                                    >
                                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-700 to-accent-600">
                                            <Lock className="text-white" size={20} />
                                            <h3 className="text-lg font-bold text-white">{group.category}</h3>
                                        </div>

                                        <div className="p-5">
                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                                {group.permissions?.map((rule) => {
                                                    const isChecked = selectedRules.includes(rule.id);
                                                    return (
                                                        <div
                                                            key={rule.id}
                                                            className={`
                                                                flex items-center gap-2.5 p-3 rounded-lg text-sm
                                                                border-2 ${isChecked
                                                                    ? "bg-gradient-to-br from-accent-100 to-primary-100 border-accent-600 shadow-sm"
                                                                    : "bg-white border-primary-200"
                                                                }
                                                            `}
                                                        >
                                                            <CheckCircle2 className={`w-5 h-5 ${isChecked ? "text-accent-600" : "text-primary-300"}`} />
                                                            <span className={`font-medium ${isChecked ? "text-primary-800" : "text-primary-700"}`}>
                                                                {rule.name}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="flex justify-end pt-6 border-t border-primary-200">
                        <button
                            onClick={() => router.push('/dashboard/quality/qa-rule-sets')}
                            className="px-6 py-3 font-semibold text-white transition-all duration-200 shadow-lg bg-primary-700 hover:bg-primary-800 rounded-xl hover:shadow-xl"
                        >
                            Back to QA Rule Sets
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
