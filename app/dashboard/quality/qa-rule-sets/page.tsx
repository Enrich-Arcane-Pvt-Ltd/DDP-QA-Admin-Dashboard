"use client";

import { useEffect, useState } from "react";

import CreateButton from "@/app/components/CreateButton";
import SearchBar from "@/app/components/SearchBar";
import Table from "@/app/components/Table";

import { PlusIcon } from "lucide-react";

import { useAccessToken } from "@/app/hooks/useAccessToken";

import { useRouter } from "next/navigation";

import Loader from "@/app/components/Loader";


import DeleteQARuleSet from "@/app/forms/qaRuleSets/DeleteQARuleSet";
import StatusChangeQARuleSet from "@/app/forms/qaRuleSets/StatusChangeQARuleSet";
import ViewQARuleSet from "@/app/forms/qaRuleSets/ViewQARuleSet";

import { useQARuleSets } from "@/app/hooks/useQARuleSets";
import { QARuleSets } from "@/app/types/QARuleSets";

export default function QARulesPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRow, setSelectedRow] = useState<QARuleSets | null>(null);
    const [statusModalVisible, setStatusModalVisible] = useState(false);

    const { token } = useAccessToken();
    const { isLoading, qaRuleSets, fetchQARuleSets, fetchQARuleSetsMetaData, qaRuleSetMetaData, isSubmitting, createQARuleSet, deleteQARuleSet, editQARuleSet, activateQARuleSet } = useQARuleSets();

    const router = useRouter();

    const openModal = () => {
        router.push('/dashboard/quality/qa-rule-sets/create')
    }
    const closeModal = () => setModalVisible(false);

    const openDeleteModal = (row: QARuleSets) => {
        setSelectedRow(row);
        setDeleteModalVisible(true)
    };

    const closeDeleteModal = () => setDeleteModalVisible(false);

    const openStatusModal = (row: QARuleSets) => {
        setSelectedRow(row);
        setStatusModalVisible(true);
    }

    const closeStatusModal = () => {
        setStatusModalVisible(false);
    }

    const handleEdit = (row: QARuleSets) => {
        router.push(`/dashboard/quality/qa-rule-sets/${row.id}`);
    };

    const closedViewModal = () => setViewModalVisible(false);

    const closeEditModal = () => setEditModalVisible(false);

    useEffect(() => {
        if (token) {
            fetchQARuleSets(token);
            fetchQARuleSetsMetaData(token);
        }
    }, [fetchQARuleSets, token, fetchQARuleSetsMetaData]);

    const filteredQARuleSets = qaRuleSets?.filter((rule: QARuleSets) => {
        const term = searchTerm.toLowerCase();
        return (
            rule.qa_rule_set_name.toLowerCase().includes(term) ||
            rule.description.toLowerCase().includes(term) ||
            rule.status.toLowerCase().includes(term)
        );
    });

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div>
            <div className="flex flex-col gap-3 my-2 mb-4 sm:flex-row sm:justify-between sm:items-center">
                <SearchBar placeholder="Search by QA Rule Name, description..." onChange={setSearchTerm} className="relative w-full xl:w-1/3 md:w-96" />
                <CreateButton icon={<PlusIcon />} label="Create QA Rule Set" onClick={openModal} />
            </div>

            <Table
                columns={["qa_rule_set_name", "description", "created_by", "status"]}
                data={filteredQARuleSets}
                onDelete={openDeleteModal}
                onEdit={handleEdit}
                onStatusChange={openStatusModal}
            />

            {deleteModalVisible && selectedRow && token && (
                <DeleteQARuleSet
                    row={selectedRow}
                    onCancel={closeDeleteModal}
                    isSubmitting={isSubmitting}
                    onConfirm={async () => {
                        const success = await deleteQARuleSet(selectedRow.id, token);
                        if (success) {
                            closeDeleteModal();
                            fetchQARuleSets(token);
                        }
                    }}
                />
            )}

            {viewModalVisible && qaRuleSetMetaData && selectedRow && token && (
                <ViewQARuleSet
                    row={selectedRow}
                    onCancel={closedViewModal}
                    data={qaRuleSetMetaData}
                />
            )}

            {statusModalVisible && selectedRow && token && (
                <StatusChangeQARuleSet
                    row={selectedRow}
                    onCancel={closeStatusModal}
                    isSubmitting={isSubmitting}
                    onConfirm={async () => {
                        const success = await activateQARuleSet(selectedRow.id, token, selectedRow.status);
                        if (success) {
                            closeStatusModal();
                            fetchQARuleSets(token);
                        }
                    }}
                />
            )}
        </div>
    )
}