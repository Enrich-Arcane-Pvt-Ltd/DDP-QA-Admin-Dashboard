"use client";

import { useEffect, useState } from "react";

import CreateButton from "@/app/components/CreateButton";
import SearchBar from "@/app/components/SearchBar";
import Table from "@/app/components/Table";

import { PlusIcon } from "lucide-react";

import { useAccessToken } from "@/app/hooks/useAccessToken";
import { useQARules } from "@/app/hooks/useQARules";

import { useRouter } from "next/navigation";

import Loader from "@/app/components/Loader";

import CreateQARule from "@/app/forms/qaRules/CreateQARule";
import DeleteQARule from "@/app/forms/qaRules/DeleteQARule";

import EditQARule from "@/app/forms/qaRules/EditQARule";
import StatusChangeQARule from "@/app/forms/qaRules/StatusChangeQARule";
import ViewQARule from "@/app/forms/qaRules/ViewQARule";
import { QARules } from "@/app/types/QaRules";

export default function QARulesPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRow, setSelectedRow] = useState<QARules | null>(null);
    const [statusModalVisible, setStatusModalVisible] = useState(false);

    const { token } = useAccessToken();
    const { isLoading, qaRules, fetchQARules, fetchQARulesMetaData, qaRuleMetaData, isSubmitting, createQARule, deleteQARules, editQARule, activateQARule } = useQARules();

    const router = useRouter();

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const openDeleteModal = (row: QARules) => {
        setSelectedRow(row);
        setDeleteModalVisible(true)
    };

    const closeDeleteModal = () => setDeleteModalVisible(false);

    const openStatusModal = (row: QARules) => {
        setSelectedRow(row);
        setStatusModalVisible(true);
    }

    const closeStatusModal = () => {
        setStatusModalVisible(false);
    }

    const handleEdit = (row: QARules) => {
        setSelectedRow(row);
        setEditModalVisible(true);
    };

    const handleView = (row: QARules) => {
        setSelectedRow(row);
        setViewModalVisible(true);
    };

    const closedViewModal = () => setViewModalVisible(false);

    const closeEditModal = () => setEditModalVisible(false);

    useEffect(() => {
        if (token) {
            fetchQARules(token);
            fetchQARulesMetaData(token);
        }
    }, [fetchQARules, token, fetchQARulesMetaData]);

    const filteredQARules = qaRules?.filter((rule: QARules) => {
        const term = searchTerm.toLowerCase();
        return (
            rule.rule_name.toLowerCase().includes(term) ||
            rule.priority.toLowerCase().includes(term) ||
            rule.type.toLowerCase().includes(term)
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
                <SearchBar placeholder="Search by Rule name or type..." onChange={setSearchTerm} className="relative w-full xl:w-1/3 md:w-96" />
                <CreateButton icon={<PlusIcon />} label="Create QA Rule" onClick={openModal} />
            </div>

            <Table
                columns={["rule_name", "type", "priority", "created_by", "status"]}
                data={filteredQARules}
                onDelete={openDeleteModal}
                onEdit={handleEdit}
                onView={handleView}
                onStatusChange={openStatusModal}
            />

            {modalVisible && qaRuleMetaData && (
                <CreateQARule
                    isSubmitting={isSubmitting}
                    data={qaRuleMetaData}
                    onCancel={closeModal}
                    onSubmit={(formData) => createQARule(formData, token)}
                />
            )}

            {deleteModalVisible && selectedRow && token && (
                <DeleteQARule
                    row={selectedRow}
                    onCancel={closeDeleteModal}
                    isSubmitting={isSubmitting}
                    onConfirm={async () => {
                        const success = await deleteQARules(selectedRow.id, token);
                        if (success) {
                            closeDeleteModal();
                            fetchQARules(token);
                        }
                    }}
                />
            )}

            {editModalVisible && qaRuleMetaData && selectedRow && token && (
                <EditQARule
                    row={selectedRow}
                    onCancel={closeEditModal}
                    onSubmit={(formData) => editQARule(formData, token, selectedRow.id)}
                    data={qaRuleMetaData}
                    isSubmitting={isSubmitting}
                />
            )}

            {viewModalVisible && qaRuleMetaData && selectedRow && token && (
                <ViewQARule
                    row={selectedRow}
                    onCancel={closedViewModal}
                    data={qaRuleMetaData}
                />
            )}

            {statusModalVisible && selectedRow && token && (
                <StatusChangeQARule
                    row={selectedRow}
                    onCancel={closeStatusModal}
                    isSubmitting={isSubmitting}
                    onConfirm={async () => {
                        const success = await activateQARule(selectedRow.id, token, selectedRow.status);
                        if (success) {
                            closeStatusModal();
                            fetchQARules(token);
                        }
                    }}
                />
            )}
        </div>
    )
}