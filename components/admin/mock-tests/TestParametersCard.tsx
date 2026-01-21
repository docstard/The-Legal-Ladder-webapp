import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function TestParametersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Parameters</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="totalMarks">Total Marks</Label>
            <Input id="totalMarks" type="number" defaultValue={100} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="duration">Duration (Minutes)</Label>
            <Input id="duration" type="number" defaultValue={120} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="negativeMarking">Negative Marking (per wrong answer)</Label>
          <Input id="negativeMarking" defaultValue="0.25" />
        </div>

        <div className="flex items-center justify-between">
          <Label>Instant Logic Explanations</Label>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label>Shuffle Question Order</Label>
          <Switch />
        </div>
      </CardContent>
    </Card>
  )
}
