"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BasicInfoCard } from "@/components/admin/mock-tests/BasicInfoCard"
import { InstructionsCard } from "@/components/admin/mock-tests/InstructionsCard"
import { TestParametersCard } from "@/components/admin/mock-tests/TestParametersCard"
import QuestionCard from "@/components/admin/mock-tests/QuestionCard"

export default function EditMockTestPage() {
    const { testId } = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        title: "UP Judiciary Prelims Mock 1",
        category: "Judiciary",
        duration: "120",
        unit:"Rajasthan",
        totalQuestions: 20,
        isFree: true,
        isActive: false,
    })


    //   useEffect(() => {
    //     async function loadTest() {
    //       const res = await fetch(`/api/admin/mock-tests/${testId}`)
    //       const data = await res.json()
    //       setForm(data)
    //       setLoading(false)
    //     }
    //     loadTest()
    //   }, [testId])

    async function handleSave() {
        const res = await fetch(`/api/admin/mock-tests/${testId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })

        if (res.ok) {
            router.push("/admin/mock-tests")
        } else {
            alert("Failed to update test")
        }
    }


    if (loading) return <p>Loading...</p>

    return (
        <div className="flex flex-col gap-6">

            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-serif font-bold">
                    Edit Mock Test: RJS Prelims Mock 1
                </h1>

                <div className="flex gap-3">
                    <Button variant="outline">Discard</Button>
                    <Button>Save Changes</Button>
                </div>
            </div>


            <div className="grid grid-cols-12 gap-6">
        {/* Row 1 */}
        <div className="col-span-12 lg:col-span-6">
          <BasicInfoCard form={form} />
        </div>

        <div className="col-span-12 lg:col-span-6">
          <TestParametersCard />
        </div>

        {/* Row 2 */}
        <div className="col-span-12 lg:col-span-6">
          {/* <InstructionsCard /> */}
        </div>

        {/* <div className="col-span-12 lg:col-span-6">
          <VisibilityCard />
        </div> */}
      </div>
        </div>
    )
}
