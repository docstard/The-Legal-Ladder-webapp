import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreVertical, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MockTest } from "@/components/admin/mock-tests/types"

const mockTests = [
  {
    name: "UP Judiciary Prelims Mock 1",
    category: "Judiciary",
    questions: 150,
    duration: "120 mins",
    status: "Active",
  },
  {
    name: "UGC NET Constitution",
    category: "UGC NET",
    questions: 50,
    duration: "60 mins",
    status: "Draft",
  },
]

type MockTestTableProps = {
  tests: MockTest[]
}

export function MockTestsTable({ tests }: MockTestTableProps) {
  if (tests.length === 0) {
    return (
      <div className="rounded-xl border p-12 text-center text-muted-foreground">
        No mock tests found for this category.
      </div>
    )
  }

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Test Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tests.map((test) => (
            <TableRow key={test.id}>
              <TableCell className="font-medium">
                {test.name}
              </TableCell>

              <TableCell>
                <Badge variant="secondary">
                  {test.category}
                </Badge>
              </TableCell>

              <TableCell>{test.questions}</TableCell>
              <TableCell>{test.duration}</TableCell>

              <TableCell>
                <Badge
                  variant={
                    test.status === "Active"
                      ? "default"
                      : "outline"
                  }
                >
                  {test.status}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}