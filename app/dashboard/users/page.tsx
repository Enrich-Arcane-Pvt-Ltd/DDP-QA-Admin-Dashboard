import SearchBar from "@/app/components/SearchBar";
import CreateButton from "@/app/components/CreateButton";
import Table from "@/app/components/Table";

import { PlusIcon } from "lucide-react";

export default function UsersPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 my-2">
        <SearchBar placeholder="Search users..." />
        <CreateButton icon={<PlusIcon />} label="Create User" />
      </div>

      <Table
        columns={["Name", "Email", "Role", "Contact", "Status"]}
        data={[
          { Name: "John Doe", Email: "john@example.com", Role: "Admin", Contact: "+94 1234567", Status: "Active" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
          { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
        ]}
      />
    </div>
  );
}
