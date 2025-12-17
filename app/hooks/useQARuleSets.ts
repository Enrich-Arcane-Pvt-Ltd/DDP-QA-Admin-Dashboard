import { useCallback, useState } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";
import { QARulesData, QARuleSet, QARuleSetMetaData, QARuleSets, SingleQARuleSet } from "../types/QARuleSets";


export function useQARuleSets() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateSubmitting, setUpdateSubmitting] = useState(false);
    const [qaRules, setQARules] = useState<QARulesData[]>([]);
    const [qaRuleSets, setQaRuleSets] = useState<QARuleSets[]>([]);
    const [qaRuleSetMetaData, setQaRuleSetMetaData] = useState<QARuleSetMetaData | null>(null);
    const [qaRuleSet, setQaRuleSet] = useState<SingleQARuleSet | null>(null);

    // API Call to Fetch QA Rules
    const fetchQARuleSets = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${APP_URL}qa-rule-sets`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching qa rule sets: ", responseJson.message);
                return;
            }
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formattedQARuleSets = responseJson.qaRuleSets.map((rule: any) => ({
                id: rule.id,
                qa_rule_set_name: rule.qa_rule_set_name,
                description: rule?.description,
                status: rule.status,
                created_by: rule.created_by?.name,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                rule_ids: rule.qa_rules ? rule.qa_rules.map((r: any) => r.id) : [],
            }));

            setQaRuleSets(formattedQARuleSets);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log('Error fetching qa rule sets : ', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Fetch QA Rules Meta Data
    const fetchQARuleSetsMetaData = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${APP_URL}qa-rule-sets/meta`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching qa rules sets meta data : ", responseJson.message);
                return;
            }

            setQaRuleSetMetaData(responseJson);
            setQARules(responseJson.qaRules);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log('Error fetching qa rules sets meta data : ', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Create a QA Rules
    const createQARuleSet = useCallback(async (data: QARuleSet, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}qa-rule-sets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    qa_rule_set_name: data.qa_rule_set_name,
                    status: data.status,
                    description: data.description,
                    rule_ids: data.qa_rules,
                })
            });

            const responseJson = await response.json();

            if (!response.ok) {
                console.log("Response Error in creating qa rule sets : ", responseJson.message);
                toast.error(responseJson.message)
                return false;
            }

            toast.success(responseJson.message);
            await fetchQARuleSets(token);
            return true;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error creating qa rule sets : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Delete a QA Rule
    const deleteQARuleSet = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}qa-rule-sets/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in deleting qa rule set : ", responseJson.message);
                toast.error('Failed to delete the qa rule set');
                return false;
            }

            toast.success('QA Rule Set deleted successfully !');
            return true;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error deleting qa rule set : ", error.message);
            toast.error('Failed to delete the qa rule set');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Edit QA Rule Set
    const editQARuleSet = useCallback(async (data: QARuleSets, token: string | null, id: number,) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsSubmitting(true);
        setUpdateSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}qa-rule-sets/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    qa_rule_set_name: data.qa_rule_set_name,
                    status: data.status,
                    description: data.description,
                    rule_ids: data.qa_rules,
                })
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in updating qa rule set : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success('QA Rule Set updated successfully !');
            await fetchQARuleSets(token);
            return true;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error updating qa rule set : ", error.message);
            toast.error('Failed to update the qa rule set');
            return false;
        } finally {
            setIsSubmitting(false);
            setUpdateSubmitting(false);
        }
    }, []);

    // API Call to Fetch a QA Rule
    const fetchQARuleSet = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}qa-rule-sets/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching qa rule set: ", responseJson.message);
                return;
            }

            setQaRuleSet(responseJson.qaRuleSet)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error fetching qa rule sets : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const activateQARuleSet = useCallback(async (id: number, token: string | null, status: string) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsSubmitting(true);
        try {
            const currentStatus = status === 'active' ? 'block' : 'unblock';

            const response = await fetch(`${APP_URL}qa-rule-sets/${id}/${currentStatus}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in changing status of the QA Rule Set : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success(responseJson.message);
            return true;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error in changing the status of the QA Rule Set : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        fetchQARuleSets, isLoading, qaRuleSets,
        qaRuleSetMetaData, fetchQARuleSetsMetaData, qaRules,
        isSubmitting, createQARuleSet,
        deleteQARuleSet, editQARuleSet, fetchQARuleSet, qaRuleSet, updateSubmitting, activateQARuleSet
    }
}