"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ResultPage() {
  const { testId } = useParams();
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!testId) return;

    const fetchResult = async () => {
      try {
        const data = await api.getResult(testId as string);
        setResult(data.result);
        setQuestions(data.questions);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load result");
        setLoading(false);
      }
    };

    fetchResult();
  }, [testId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading result...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || "Result not found"}</p>
          <button
            onClick={() => router.push("/tests")}
            className="px-6 py-2 bg-gray-500 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">Test Result</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded">
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-2xl font-bold text-blue-600">
              {result.marksObtained.toString()}/{result.totalMarks.toString()}
            </p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded">
            <p className="text-sm text-gray-600">Percentage</p>
            <p className="text-2xl font-bold text-green-600">
              {result.percentage.toFixed(2)}%
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded">
            <p className="text-sm text-gray-600">Correct</p>
            <p className="text-2xl font-bold text-purple-600">{result.correct}</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded">
            <p className="text-sm text-gray-600">Incorrect</p>
            <p className="text-2xl font-bold text-red-600">{result.incorrect}</p>
          </div>
        </div>

        {result.rank && (
          <div className="flex justify-center gap-6 text-center">
            <div>
              <p className="text-sm text-gray-600">Rank</p>
              <p className="text-xl font-bold">{result.rank}</p>
            </div>
            {result.percentile && (
              <div>
                <p className="text-sm text-gray-600">Percentile</p>
                <p className="text-xl font-bold">{result.percentile.toFixed(2)}%</p>
              </div>
            )}
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold">Question Review</h2>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div
            key={q.id}
            className={`border p-4 rounded ${
              q.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}
          >
            <p className="font-medium mb-2">
              Q{i + 1}. {q.text}
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Your Answer:</span>{" "}
                {q.selectedOption !== null && q.selectedOption !== undefined
                  ? q.options[q.selectedOption]
                  : "Not Attempted"}
              </p>
              <p className="text-green-600">
                <span className="font-semibold">Correct Answer:</span> {q.options[q.correctOption]}
              </p>
              {q.explanation && (
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Explanation:</span> {q.explanation}
                </p>
              )}
              <p className="text-gray-500">
                Marks: {q.isCorrect ? `+${q.marks}` : q.isAnswered ? `-${q.negativeMarks}` : "0"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 pt-6">
        <button
          onClick={() => router.push("/tests")}
          className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Back to Tests
        </button>
        {result.rank && (
          <button
            onClick={() => router.push(`/tests/${testId}/rankings`)}
            className="px-6 py-2 border border-primary text-primary rounded hover:bg-primary/10"
          >
            View Rankings
          </button>
        )}
      </div>
    </div>
  );
}
