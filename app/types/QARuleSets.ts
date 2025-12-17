export interface QARuleSets {
    id: number;
    qa_rule_set_name: string;
    description: string;
    status: string;
    created_by?: string;
    name?: string;
    qa_rules: number[];
}

interface QARules {
    value: number;
    label: string;
}

interface QARuleSetStatus {
    value: string;
    label: string;
}

export interface QARuleSetMetaData {
    qaRuleSetStatus: QARuleSetStatus[];
    qaRules: QARules[];
}

export interface QARulesData {
    qaRules: QARules[];
}

export interface QARuleSet {
    qa_rule_set_name: string;
    description?: string;
    status?: string;
    created_by?: string;
    rule_ids: number[];
}

export interface SingleQARuleSet {
    id: number;
    qa_rule_set_name: string;
    description?: string;
    status?: string;
    created_by?: string;
    name?: string;
    email?: string;
    qa_rules: number[];
}