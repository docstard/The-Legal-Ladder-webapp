import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function InstructionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Instructions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-1.5">
        <Label htmlFor="instructions">Instructions</Label>
        <Textarea
          id="instructions"
          rows={8}
          placeholder="Enter instructions students will see before starting the test"
          defaultValue={`1. All questions are compulsory.
2. Each question carries 1 mark.
3. Negative marking applies.`}
        />
      </CardContent>
    </Card>
  )
}
