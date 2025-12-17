export interface QARules {
    id: number;
    rule_name: string;
    type: string;
    status: string;
    priority: string;
    description?: string;
    name?: string;
    created_by?: string;
}


interface QARuleTypes {
    value: string;
    label: string;
}

interface QARuleStatus {
    value: string;
    label: string;
}

interface Priorities {
    value: string;
    label: string;
}

export interface QARuleMetaData {
    qaRuleTypes: QARuleTypes[];
    qaRuleStatus: QARuleStatus[];
    priorities: Priorities[];
}

export interface QARule {
    rule_name: string;
    type: string;
    status: string;
    priority: string;
    description?: string;
}

export interface SingleQARule {
    id: number;
    rule_name: string;
    type: string;
    status: string;
    priority: string;
    description?: string;
    name?: string;
    email?: string;
}