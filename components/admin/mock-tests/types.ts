export type MockTestStatus = "Active" | "Draft"

export type MockTest = {
  id: string
  name: string
  category: string
  questions: number
  duration: string
  status: MockTestStatus
}