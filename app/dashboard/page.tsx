import { Users, CheckCircle, ShoppingCart, Shirt } from "lucide-react"
import Card from "../components/Card"
import Table from "../components/Table"
import BarChartComponent from "../components/BarChart"
import PieChartComponent from "../components/PieChart"

export default function DashboardPage() {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 py-1 md:grid-cols-2 xl:grid-cols-4">
        <Card 
          title="Total Users"
          subTitle="200"
          icon={<Users />}
        />
        <Card 
          title="Total Orders"
          subTitle="20000"
          icon={<ShoppingCart />}
        />
        <Card 
          title="Total Designs"
          subTitle="10000"
          icon={<Shirt />}
        />
        <Card 
          title="QA Products"
          subTitle="5000"
          icon={<CheckCircle />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 py-4">
        <div className="px-4">
          <h1 className="py-2 text-primary-700 font-bold">Pending Orders</h1>
          <Table
            columns={["Name", "Email", "Role", "Contact", "Status"]}
            data={[
              { Name: "John Doe", Email: "john@example.com", Role: "Admin", Contact: "+94 1234567", Status: "Active" },
              { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
            ]}
          />
        </div>
        <div className="px-4">
          <h1 className="py-2 text-primary-700 font-bold">QA Orders</h1>
          <Table
            columns={["Name", "Email", "Role", "Contact", "Status"]}
            data={[
              { Name: "John Doe", Email: "john@example.com", Role: "Admin", Contact: "+94 1234567", Status: "Active" },
              { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
              { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
              { Name: "Jane Smith", Email: "jane@example.com", Role: "User", Contact: "+94 1234567", Status: "Inactive" },
            ]}
            rowsPerPage={2}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 py-4">
        <div className="px-4">
          <PieChartComponent />
        </div>
        <div className="px-4 pt-6 xl:pt-0">
          <BarChartComponent />
        </div>
      </div>
    </div>
  )
}
