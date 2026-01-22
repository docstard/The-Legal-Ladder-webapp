"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2,
  Circle,
  AlertCircle
} from "lucide-react"
import { toast } from "@/lib/use-toast"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Question {
  id: string
  text: string
  options: string[]
  order: number
}

export default function TakeTestPage({ params }: { params: Promise<{ testId: string }> }) {
  const router = useRouter()
  const [testId, setTestId] = useState<string>("")
  const [mockTest, setMockTest] = useState<any>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number | null>>({})
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    params.then((resolvedParams) => {
      setTestId(resolvedParams.testId)
    })
  }, [params])

  // Load test data
  useEffect(() => {
    if (!testId) return

    const loadTest = async () => {
      try {
        const data = await api.getTestState(testId)
        setMockTest(data.mockTest)
        setQuestions(data.questions)
        
        // Initialize answers from existing attempt
        const existingAnswers: Record<string, number | null> = {}
        if (data.attempt?.answers) {
          data.attempt.answers.forEach((ans: any) => {
            existingAnswers[ans.questionId] = ans.selectedOption
          })
        }
        setAnswers(existingAnswers)
        
        // Calculate time remaining
        const duration = data.mockTest.duration * 60 // Convert minutes to seconds
        const elapsed = data.attempt?.startedAt 
          ? Math.floor((Date.now() - new Date(data.attempt.startedAt).getTime()) / 1000)
          : 0
        setTimeRemaining(Math.max(0, duration - elapsed))
        
        setLoading(false)
      } catch (error: any) {
        console.error("Failed to load test:", error)
        toast({
          title: "Error",
          description: error.message || "Failed to load test",
          variant: "destructive",
        })
        router.push("/tests")
      }
    }

    loadTest()
  }, [testId, router])

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0 || loading) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining, loading])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = async (selectedOption: number) => {
    const currentQuestion = questions[currentQuestionIndex]
    
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedOption,
    }))

    // Save answer to backend
    setSaving(true)
    try {
      await api.saveAnswer(testId, currentQuestion.id, selectedOption)
    } catch (error) {
      console.error("Failed to save answer:", error)
      toast({
        title: "Warning",
        description: "Failed to save answer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      await api.submitTest(testId)
      toast({
        title: "Test Submitted!",
        description: "Redirecting to results...",
      })
      router.push(`/tests/${testId}/results`)
    } catch (error: any) {
      console.error("Failed to submit test:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit test",
        variant: "destructive",
      })
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f9f7f2] py-24">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading test...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!mockTest || questions.length === 0) {
    return (
      <main className="min-h-screen bg-[#f9f7f2] py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#131e40] mb-4">No Questions Available</h1>
          <p className="text-gray-600 mb-8">This test doesn't have any questions yet.</p>
          <Button onClick={() => router.push("/tests")}>Back to Tests</Button>
        </div>
      </main>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const answeredCount = Object.values(answers).filter(a => a !== null && a !== undefined).length
  const unansweredCount = questions.length - answeredCount

  return (
    <main className="min-h-screen bg-[#f9f7f2] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Timer */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#131e40]">{mockTest.title}</h1>
            <p className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-600">Answered</div>
              <div className="text-2xl font-bold text-green-600">{answeredCount}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600">Unanswered</div>
              <div className="text-2xl font-bold text-orange-600">{unansweredCount}</div>
            </div>
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              timeRemaining < 300 ? 'bg-red-100' : 'bg-blue-100'
            }`}>
              <Clock className={`w-5 h-5 ${timeRemaining < 300 ? 'text-red-600' : 'text-blue-600'}`} />
              <span className={`text-xl font-mono font-bold ${
                timeRemaining < 300 ? 'text-red-600' : 'text-blue-600'
              }`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span className="text-lg">Question {currentQuestion.order}</span>
                  {answers[currentQuestion.id] !== null && answers[currentQuestion.id] !== undefined && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Answered
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-lg text-[#131e40] leading-relaxed">
                  {currentQuestion.text}
                </div>

                <RadioGroup
                  value={answers[currentQuestion.id]?.toString()}
                  onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                >
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-[#1754cf] ${
                          answers[currentQuestion.id] === index
                            ? 'border-[#1754cf] bg-blue-50'
                            : 'border-gray-200'
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer text-base"
                        >
                          <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {saving && (
                    <span className="text-sm text-gray-500">Saving...</span>
                  )}

                  {currentQuestionIndex === questions.length - 1 ? (
                    <Button
                      onClick={() => setShowSubmitDialog(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Submit Test
                    </Button>
                  ) : (
                    <Button onClick={handleNext}>
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-base">Question Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, index) => {
                    const isAnswered = answers[q.id] !== null && answers[q.id] !== undefined
                    const isCurrent = index === currentQuestionIndex
                    
                    return (
                      <button
                        key={q.id}
                        onClick={() => handleJumpToQuestion(index)}
                        className={`aspect-square flex items-center justify-center rounded text-sm font-medium transition-all ${
                          isCurrent
                            ? 'bg-[#1754cf] text-white ring-2 ring-[#1754cf] ring-offset-2'
                            : isAnswered
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-green-500"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gray-200"></div>
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#1754cf] ring-2 ring-[#1754cf] ring-offset-2"></div>
                    <span>Current</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Test?</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit the test? You have:
              <ul className="mt-2 space-y-1">
                <li className="text-green-600">✓ {answeredCount} questions answered</li>
                <li className="text-orange-600">• {unansweredCount} questions unanswered</li>
              </ul>
              <p className="mt-2 font-medium">You cannot change your answers after submission.</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {submitting ? "Submitting..." : "Yes, Submit Test"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
