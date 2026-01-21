"use client"
// import { MockTestsTable } from "./components/mock-tests-table"
// import { Filters } from "./components/filters"
// import { TopBar } from "./components/top-bar"
import StatCard from "@/components/admin/StatCard"
import { Filters } from "../../../components/admin/filters"
import { MockTestsTable } from "../../../components/admin/mock-tests/MockTestsTable"
import { useState } from "react"
import { MockTest } from "@/components/admin/mock-tests/types"

const stats = [
    {
        title: "Total Active Tests",
        value: "124",
        icon: "folder",
    },
    {
        title: "Active Questions",
        value: "15,400",
        icon: "database",
    },
    {
        title: "Avg Completion Time",
        value: "110 min",
        icon: "watch",
    },
]

const filters = [
  "All",
  "Judiciary",
  "UGC NET",
  "CLAT PG",
]

const MOCK_TESTS: MockTest[] = [
    {
        id: "1",
        name: "UP Judiciary Prelims Mock 1",
        category: "Judiciary",
        questions: 150,
        duration: "120 mins",
        status: "Active",
    },
    {
        id: "2",
        name: "UGC NET Constitution",
        category: "UGC NET",
        questions: 50,
        duration: "60 mins",
        status: "Draft",
    },
    {
        id: "3",
        name: "CLAT PG Strategy Mock",
        category: "CLAT PG",
        questions: 120,
        duration: "120 mins",
        status: "Active",
    },
    {
        id: "4",
        name: "UP Judiciary Prelims Mock 1",
        category: "Judiciary",
        questions: 150,
        duration: "120 mins",
        status: "Active",
    },
    {
        id: "5",
        name: "UGC NET Constitution",
        category: "UGC NET",
        questions: 50,
        duration: "60 mins",
        status: "Draft",
    },
    {
        id: "6",
        name: "CLAT PG Strategy Mock",
        category: "CLAT PG",
        questions: 120,
        duration: "120 mins",
        status: "Active",
    },
    {
        id: "7",
        name: "UP Judiciary Prelims Mock 1",
        category: "Judiciary",
        questions: 150,
        duration: "120 mins",
        status: "Active",
    },
    {
        id: "8",
        name: "UGC NET Constitution",
        category: "UGC NET",
        questions: 50,
        duration: "60 mins",
        status: "Draft",
    },
    {
        id: "9",
        name: "CLAT PG Strategy Mock",
        category: "CLAT PG",
        questions: 120,
        duration: "120 mins",
        status: "Active",
    },
    {
        id: "10",
        name: "UP Judiciary Prelims Mock 1",
        category: "Judiciary",
        questions: 150,
        duration: "120 mins",
        status: "Active",
    },
    {
        id: "11",
        name: "UGC NET Constitution",
        category: "UGC NET",
        questions: 50,
        duration: "60 mins",
        status: "Draft",
    },
    {
        id: "12",
        name: "CLAT PG Strategy Mock",
        category: "CLAT PG",
        questions: 120,
        duration: "120 mins",
        status: "Active",
    },
    {
        id: "13",
        name: "UP Judiciary Prelims Mock 1",
        category: "Judiciary",
        questions: 150,
        duration: "120 mins",
        status: "Active",
    },
    {
        id: "14",
        name: "UGC NET Constitution",
        category: "UGC NET",
        questions: 50,
        duration: "60 mins",
        status: "Draft",
    },
    {
        id: "15",
        name: "CLAT PG Strategy Mock",
        category: "CLAT PG",
        questions: 120,
        duration: "120 mins",
        status: "Active",
    },
]


export default function AdminMockTestsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All")

    const filteredTests =
        selectedCategory === "All"
            ? MOCK_TESTS
            : MOCK_TESTS.filter(
                (test) => test.category === selectedCategory
            )
    return (
        <div className="space-y-8 p-8 w-full">
            {/* Page Heading */}

            <div className="flex w-full gap-8">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>
            <Filters
                filtersArray={filters}
                selected={selectedCategory}
                onChange={setSelectedCategory}
            />
            <MockTestsTable tests={filteredTests} />
        </div>
    )
}