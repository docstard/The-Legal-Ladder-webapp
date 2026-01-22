"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle2,
  XCircle,
  Circle,
  Award,
  TrendingUp,
  Clock,
  Target,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function ResultsPage({ params }: { params: Promise<{ testId: string }> }) {
  const router = useRouter()
  const [testId, setTestId] = useState<string>("")
  const [result, setResult] = useState<any>(null)
  const [mockTest, setMockTest] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params.then((resolvedParams) => {
      setTestId(resolvedParams.testId)
    })
  }, [params])

  useEffect(() => {
    if (!testId) return

    const loadResults = async () => {
      try {
        const data = await api.getResult(testId)
        setResult(data.result)
        setMockTest(data.attempt.mockTest)
        setQuestions(data.questions)
        setAnswers(data.attempt.answers || [])
        setLoading(false)
      } catch (error: any) {
        console.error("Failed to load results:", error)
        router.push("/tests")
      }
    }

    loadResults()
  }, [testId, router])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f9f7f2] py-24">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading results...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!result || !mockTest) {
    return (
      <main className="min-h-screen bg-[#f9f7f2] py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-[#131e40] mb-4">Results Not Found</h1>
          <Button onClick={() => router.push("/tests")}>Back to Tests</Button>
        </div>
      </main>
    )
  }

  const getAnswerForQuestion = (questionId: string) => {
    return answers.find((a) => a.questionId === questionId)
  }

  const percentageScore = ((result.marksObtained / mockTest.totalMarks) * 100).toFixed(2)
  const accuracy = result.answered > 0 
    ? ((result.correct / result.answered) * 100).toFixed(2)
    : 0

  return (
    <main className="min-h-screen bg-[#f9f7f2] py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tests">
            <Button variant="ghost" className="mb-4">
              ← Back to Tests
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-[#131e40] mb-2">Test Results</h1>
          <p className="text-gray-600">{mockTest.title}</p>
        </div>

        {/* Score Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Total Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{result.marksObtained}</div>
              <p className="text-sm opacity-90">out of {mockTest.totalMarks}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Percentage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{percentageScore}%</div>
              <p className="text-sm opacity-90">
                {parseFloat(percentageScore) >= 75 ? 'Excellent!' : 
                 parseFloat(percentageScore) >= 60 ? 'Good!' : 
                 parseFloat(percentageScore) >= 40 ? 'Average' : 'Needs Improvement'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{accuracy}%</div>
              <p className="text-sm opacity-90">{result.correct} correct answers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">#{result.rank || 'N/A'}</div>
              <p className="text-sm opacity-90">{result.percentile || 0}th percentile</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Question Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Questions</span>
                  <span className="font-bold text-xl">{result.totalQuestions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Correct
                  </span>
                  <span className="font-bold text-xl text-green-600">{result.correct}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Incorrect
                  </span>
                  <span className="font-bold text-xl text-red-600">{result.incorrect}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Circle className="w-4 h-4" />
                    Unattempted
                  </span>
                  <span className="font-bold text-xl text-gray-600">{result.unattempted}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Accuracy Rate</span>
                    <span className="text-sm font-medium">{accuracy}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${accuracy}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Attempt Rate</span>
                    <span className="text-sm font-medium">
                      {((result.answered / result.totalQuestions) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${(result.answered / result.totalQuestions) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="w-4 h-4" />
                    <span>
                      {parseFloat(percentageScore) >= 75
                        ? 'Outstanding performance! Keep it up!'
                        : parseFloat(percentageScore) >= 60
                        ? 'Good work! A bit more practice will make it excellent.'
                        : parseFloat(percentageScore) >= 40
                        ? 'Average performance. Focus on weak areas.'
                        : 'Need more practice. Review concepts thoroughly.'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question-wise Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Question-wise Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All ({questions.length})</TabsTrigger>
                <TabsTrigger value="correct">Correct ({result.correct})</TabsTrigger>
                <TabsTrigger value="incorrect">Incorrect ({result.incorrect})</TabsTrigger>
                <TabsTrigger value="unattempted">Skipped ({result.unattempted})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {questions.map((question, index) => {
                  const answer = getAnswerForQuestion(question.id)
                  const isCorrect = answer?.selectedOption === question.correctOption
                  const isAttempted = answer?.selectedOption !== null && answer?.selectedOption !== undefined

                  return (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg border-2 ${
                        !isAttempted
                          ? 'border-gray-300 bg-gray-50'
                          : isCorrect
                          ? 'border-green-300 bg-green-50'
                          : 'border-red-300 bg-red-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <Badge
                            variant={!isAttempted ? 'secondary' : isCorrect ? 'default' : 'destructive'}
                            className={`${
                              !isAttempted ? 'bg-gray-500' : isCorrect ? 'bg-green-600' : 'bg-red-600'
                            }`}
                          >
                            Q{index + 1}
                          </Badge>
                          <div className="flex-1">
                            <p className="font-medium text-[#131e40] mb-2">{question.text}</p>
                            <div className="space-y-2">
                              {question.options.map((option: string, optIndex: number) => {
                                const isUserAnswer = answer?.selectedOption === optIndex
                                const isCorrectAnswer = question.correctOption === optIndex

                                return (
                                  <div
                                    key={optIndex}
                                    className={`p-2 rounded text-sm ${
                                      isCorrectAnswer
                                        ? 'bg-green-100 border border-green-300'
                                        : isUserAnswer && !isCorrect
                                        ? 'bg-red-100 border border-red-300'
                                        : 'bg-white border border-gray-200'
                                    }`}
                                  >
                                    <span className="font-medium mr-2">
                                      {String.fromCharCode(65 + optIndex)}.
                                    </span>
                                    {option}
                                    {isCorrectAnswer && (
                                      <CheckCircle2 className="inline-block w-4 h-4 ml-2 text-green-600" />
                                    )}
                                    {isUserAnswer && !isCorrect && (
                                      <XCircle className="inline-block w-4 h-4 ml-2 text-red-600" />
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            {question.explanation && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-900">
                                  <strong>Explanation:</strong> {question.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </TabsContent>

              <TabsContent value="correct" className="space-y-4 mt-6">
                {questions.filter(q => {
                  const answer = getAnswerForQuestion(q.id)
                  return answer?.selectedOption === q.correctOption
                }).map((question, index) => {
                  const answer = getAnswerForQuestion(question.id)
                  return (
                    <div key={question.id} className="p-4 rounded-lg border-2 border-green-300 bg-green-50">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-green-600">Q{questions.indexOf(question) + 1}</Badge>
                        <div className="flex-1">
                          <p className="font-medium text-[#131e40]">{question.text}</p>
                          <p className="text-sm text-green-700 mt-2">
                            ✓ Your answer: {String.fromCharCode(65 + answer.selectedOption)} - Correct!
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </TabsContent>

              <TabsContent value="incorrect" className="space-y-4 mt-6">
                {questions.filter(q => {
                  const answer = getAnswerForQuestion(q.id)
                  return answer?.selectedOption !== null && answer?.selectedOption !== q.correctOption
                }).map((question, index) => {
                  const answer = getAnswerForQuestion(question.id)
                  return (
                    <div key={question.id} className="p-4 rounded-lg border-2 border-red-300 bg-red-50">
                      <div className="flex items-start gap-3">
                        <Badge variant="destructive">Q{questions.indexOf(question) + 1}</Badge>
                        <div className="flex-1">
                          <p className="font-medium text-[#131e40] mb-2">{question.text}</p>
                          <p className="text-sm text-red-700">
                            ✗ Your answer: {String.fromCharCode(65 + answer.selectedOption)}
                          </p>
                          <p className="text-sm text-green-700">
                            ✓ Correct answer: {String.fromCharCode(65 + question.correctOption)}
                          </p>
                          {question.explanation && (
                            <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                              <strong>Explanation:</strong> {question.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </TabsContent>

              <TabsContent value="unattempted" className="space-y-4 mt-6">
                {questions.filter(q => {
                  const answer = getAnswerForQuestion(q.id)
                  return answer?.selectedOption === null || answer?.selectedOption === undefined
                }).map((question, index) => (
                  <div key={question.id} className="p-4 rounded-lg border-2 border-gray-300 bg-gray-50">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="bg-gray-500">Q{questions.indexOf(question) + 1}</Badge>
                      <div className="flex-1">
                        <p className="font-medium text-[#131e40] mb-2">{question.text}</p>
                        <p className="text-sm text-gray-600">Not attempted</p>
                        <p className="text-sm text-green-700 mt-1">
                          Correct answer: {String.fromCharCode(65 + question.correctOption)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/tests">
            <Button variant="outline" size="lg">
              Back to Tests
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" className="bg-[#1754cf] hover:bg-[#1754cf]/90">
              Upgrade to Premium
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
