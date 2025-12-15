import { useCallback, useState } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";
import { QARule, QARuleMetaData, QARules, SingleQARule } from "../types/QaRules";


export function useQARules() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateSubmitting, setUpdateSubmitting] = useState(false);
    const [qaRules, setQaRules] = useState<QARules[]>([]);
    const [qaRuleMetaData, setQaRuleMetaData] = useState<QARuleMetaData | null>(null);
    const [qaRule, setQaRule] = useState<SingleQARule | null>(null);

    // API Call to Fetch QA Rules
    const fetchQARules = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${APP_URL}qa-rules`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching qa rules : ", responseJson.message);
                return;
            }

            const formattedQARules = responseJson.qaRules.map((rule: any) => ({
                id: rule.id,
                rule_name: rule.rule_name,
                type: rule.type,
                priority: rule.priority,
                description: rule?.description,
                status: rule.status,
                created_by: rule.created_by?.name,
            }));

            setQaRules(formattedQARules);
        } catch (error: any) {
            console.log('Error fetching qa rules : ', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Fetch QA Rules Meta Data
    const fetchQARulesMetaData = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${APP_URL}qa-rules/meta`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching qa rules meta data : ", responseJson.message);
                return;
            }

            setQaRuleMetaData(responseJson);
        } catch (error: any) {
            console.log('Error fetching qa rules meta data : ', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Create a QA Rules
    const createQARule = useCallback(async (data: QARule, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}qa-rules`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            });

            const responseJson = await response.json();

            if (!response.ok) {
                console.log("Response Error in creating qa rules : ", responseJson.message);
                toast.error(responseJson.message)
                return false;
            }

            toast.success(responseJson.message);
            await fetchQARules(token);
            return true;
        } catch (error: any) {
            console.log("Error creating qa rules : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Delete a QA Rule
    const deleteQARules = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}qa-rules/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in deleting qa rule : ", responseJson.message);
                toast.error('Failed to delete the qa rule');
                return false;
            }

            toast.success('QA Rule deleted successfully !');
            return true;
        } catch (error: any) {
            console.log("Error deleting qa rule : ", error.message);
            toast.error('Failed to delete the qa rule');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Edit QA Rule
    const editQARule = useCallback(async (data: QARules, token: string | null, id: number,) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsSubmitting(true);
        setUpdateSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}qa-rules/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in updating qa rule : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success('QA Rule updated successfully !');
            await fetchQARules(token);
            return true;
        } catch (error: any) {
            console.log("Error updating qa rule : ", error.message);
            toast.error('Failed to update the qa rule');
            return false;
        } finally {
            setIsSubmitting(false);
            setUpdateSubmitting(false);
        }
    }, []);

    // API Call to Fetch a QA Rule
    const fetchQARule = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}qa-rules/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching qa rule : ", responseJson.message);
                return;
            }

            setQaRule(responseJson.qaRule)
        } catch (error: any) {
            console.log("Error fetching qa rules : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const activateQARule = useCallback(async (id: number, token: string | null, status: string) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsSubmitting(true);
        try {
            const currentStatus = status === 'active' ? 'block' : 'unblock';

            const response = await fetch(`${APP_URL}qa-rules/${id}/${currentStatus}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in changing status of the QA Rule : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success(responseJson.message);
            return true;
        } catch (error: any) {
            console.log("Error in changing the status of the QA Rule : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        fetchQARules, isLoading, qaRules,
        qaRuleMetaData, fetchQARulesMetaData,
        isSubmitting, createQARule,
        deleteQARules, editQARule, fetchQARule, qaRule, updateSubmitting, activateQARule
    }
}