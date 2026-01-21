"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Question = {
  id: string;
  text: string;
  options: string[];
  marks: number;
  negativeMarks: number;
  order: number;
  selectedOption: number | null;
};

export default function ExamEnginePage() {
  const [current, setCurrent] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testInfo, setTestInfo] = useState<any>(null);
  const router = useRouter();
  const { testId } = useParams();

  // Fetch test state on mount
  useEffect(() => {
    if (!testId) return;

    const fetchTestState = async () => {
      try {
        const data = await api.getTestState(testId as string);
        setTestInfo(data.mockTest);
        setQuestions(data.questions);
        setTimeLeft(data.attempt.remainingSeconds);

        // Initialize answers from saved state
        const savedAnswers: Record<string, number | null> = {};
        data.questions.forEach((q: Question) => {
          savedAnswers[q.id] = q.selectedOption;
        });
        setAnswers(savedAnswers);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load test");
        setLoading(false);
      }
    };

    fetchTestState();
  }, [testId]);

  /* ⏱ TIMER - Sync with server */
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(async () => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return t - 1;
      });

      // Sync with server every 30 seconds
      if (timeLeft % 30 === 0 && testId) {
        api.getTestState(testId as string)
          .then((data) => {
            setTimeLeft(data.attempt.remainingSeconds);
          })
          .catch(console.error);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, testId]);

  const handleAutoSubmit = async () => {
    if (!testId) return;
    try {
      await api.submitTest(testId as string);
      router.push(`/tests/${testId}/result`);
    } catch (err) {
      console.error("Auto-submit failed:", err);
    }
  };

  const handleSaveAnswer = async (questionId: string, selectedOption: number | null) => {
    if (!testId) return;

    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));

    // Save to backend
    try {
      await api.saveAnswer(testId as string, questionId, selectedOption);
    } catch (err) {
      console.error("Failed to save answer:", err);
    }
  };

  const handleSubmit = async () => {
    if (!testId) return;

    try {
      await api.submitTest(testId as string);
      router.push(`/tests/${testId}/result`);
    } catch (err: any) {
      setError(err.message || "Failed to submit test");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-md p-6 border rounded space-y-4">
          <h1 className="text-xl font-bold text-red-600">Error</h1>
          <p className="text-sm text-gray-600">{error || "No questions found"}</p>
          <button
            onClick={() => router.push("/tests")}
            className="w-full bg-gray-500 text-white py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];

  const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const setAnswer = (optionIndex: number) => {
    handleSaveAnswer(q.id, optionIndex);
  };

  const answeredCount = Object.values(answers).filter((a) => a !== null && a !== undefined).length;

  return (
    <div className="h-screen flex bg-[#F6F6F8]">
      {/* LEFT – QUESTION PALETTE */}
      <aside className="w-64 pt-36 bg-[#071840] text-white p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Questions</h2>
        <div className="grid grid-cols-4 gap-2">
          {questions.map((question, i: number) => {
            const answered = answers[question.id] !== null && answers[question.id] !== undefined;
            const isFlagged = flagged[question.id];
            const isCurrent = i === current;

            return (
              <button
                key={question.id}
                onClick={() => setCurrent(i)}
                className={`
                  relative rounded-md py-2 text-sm font-bold
                  ${isCurrent ? "bg-[#C5A46D] text-black" : ""}
                  ${answered && !isCurrent ? "bg-green-600" : ""}
                  ${!answered && !isCurrent ? "bg-gray-600" : ""}
                `}
              >
                {i + 1}
                {isFlagged && (
                  <span className="absolute top-0 right-0 text-xs">🚩</span>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col pt-16">
        {/* TOP BAR */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
          <h1 className="font-bold text-primary">{testInfo?.title || "Mock Test"}</h1>
          <div className="font-bold text-[#C5A46D]">
            ⏱ {formatTime(timeLeft)}
          </div>
        </header>

        {/* QUESTION */}
        <section className="flex-1 p-8 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">
            Q{current + 1}. {q.text}
          </h2>

          <div className="space-y-3">
            {q.options.map((opt: string, index: number) => (
              <label
                key={index}
                className={`block p-3 border rounded cursor-pointer ${
                  answers[q.id] === index
                    ? "border-[#071840] bg-blue-50"
                    : "bg-white"
                }`}
              >
                <input
                  type="radio"
                  name={q.id}
                  className="mr-2"
                  checked={answers[q.id] === index}
                  onChange={() => setAnswer(index)}
                />
                {opt}
              </label>
            ))}
          </div>
        </section>

        {/* FOOTER CONTROLS */}
        <footer className="border-t bg-white p-4 flex justify-between">
          <div className="flex gap-3">
            <button
              onClick={() =>
                setFlagged((f) => ({ ...f, [q.id]: !f[q.id] }))
              }
              className="px-4 py-2 border rounded"
            >
              🚩 Flag
            </button>
          </div>

          <div className="flex gap-3">
            <button
              disabled={current === 0}
              onClick={() => setCurrent((c) => c - 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Previous
            </button>
            <button
              disabled={current === questions.length - 1}
              onClick={() => setCurrent((c) => c + 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Next
            </button>
            <button
              onClick={() => setShowSubmit(true)}
              className="px-6 py-2 bg-[#071840] text-white rounded"
            >
              Submit Test
            </button>
          </div>
        </footer>
      </main>

      {/* SUBMIT MODAL */}
      {showSubmit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">
              Submit Test?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              You have answered{" "}
              <b>{answeredCount}</b> out of{" "}
              <b>{questions.length}</b> questions.
            </p>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSubmit(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#071840] text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
