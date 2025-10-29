"use client";

import { useState } from "react";

import SearchBar from "@/app/components/SearchBar";
import CreateButton from "@/app/components/CreateButton";
import Table from "@/app/components/Table";

import { toast } from "@/app/components/ToastContainer";

import { PlusIcon } from "lucide-react";

export default function QualityPage() {
    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 my-2">
                <SearchBar placeholder="Search orders..." />
            </div>
    
            <Table
                columns={["order_no", "customer_name", "customer_PO", "designer", "product_name"]}
                data={[
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                    { order_no: "000029662", customer_name: "Rally Cry Inc.", customer_PO: "Fix of Templates for new Rally Cry Designs", designer: "Enrich Designer", product_name: "Test Product" },
                ]}
            />
        </div>
    )
}