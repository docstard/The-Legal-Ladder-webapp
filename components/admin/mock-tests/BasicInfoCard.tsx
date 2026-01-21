import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface BasicInfoCardProps {
  form: {
    title: string;
    category: string;
    unit: string;
    isActive: boolean;
    totalQuestions?: number;
    duration?: string;
    isFree?: boolean;
  };
}

export function BasicInfoCard({form} : BasicInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Test Title */}
        <div className="space-y-1.5">
          <Label htmlFor="title">Test Title</Label>
          <Input
            id="title"
            placeholder="Enter test title"
            defaultValue={form.title}
          />
        </div>

        {/* Category + State */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="space-y-1.5 space-x-2.5 w-full">
            <Label>Category</Label>
            <Select defaultValue={form.category.toUpperCase()}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="JUDICIARY">Judiciary</SelectItem>
                <SelectItem value="CLAT_PG">CLAT PG</SelectItem>
                <SelectItem value="UGC_NET">UGC NET</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 w-full">
            <Label>State</Label>
            <Select defaultValue={form.unit.toUpperCase()}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RAJASTHAN">Rajasthan</SelectItem>
                <SelectItem value="DELHI">Delhi</SelectItem>
                <SelectItem value="MP">Madhya Pradesh</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium">Publish Test</p>
            <p className="text-xs text-muted-foreground">
              Make this test visible to students
            </p>
          </div>
          <Switch defaultChecked={form.isActive} />
        </div>
      </CardContent>
    </Card>
  )
}
