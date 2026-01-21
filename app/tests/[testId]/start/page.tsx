"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { startMockTest } from "../../actions";

export default function StartTestPage() {
  const router = useRouter();
  const { testId } = useParams();
  const [loading, setLoading] = useState(false);
  const [testInfo, setTestInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchTestInfo = async () => {
  //     // Fetch test details
  //     if (testId) {
  //       await api.getMockTest(testId as string)
  //         .then((data) => {
  //           setTestInfo(data.mockTest);
  //         })
  //         .catch((err) => {
  //           setError(err.message || "Failed to load test");
  //         });
  //         console.log("Fetched test info:", testId);
  //     }
  //   };

  //   fetchTestInfo();
  // }, []);

  const handleStartTest = async () => {
    if (!testId) return;

    setLoading(true);
    setError(null);

    try {
      // Start the test via API
      await startMockTest(testId as string);
      // Navigate to play page
      router.push(`/tests/${testId}/play`);
    } catch (err: any) {
      setError(err.message || "Failed to start test");
      setLoading(false);
    }
  };

  if (error && !testInfo) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-md p-6 border rounded space-y-4">
          <h1 className="text-xl font-bold text-red-600">Error</h1>
          <p className="text-sm text-gray-600">{error}</p>
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

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md p-6 w-3xl items-center align-middle border rounded space-y-4">
        <h1 className="text-xl font-bold">Test Instructions</h1>
        {testInfo && (
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Test:</strong> {testInfo.title}</p>
            <p><strong>Duration:</strong> {testInfo.duration} minutes</p>
            <p><strong>Total Marks:</strong> {testInfo.totalMarks}</p>
          </div>
        )}
        <ul className="text-sm text-gray-600 list-disc pl-4">
          <li>Do not refresh during test</li>
          <li>Negative marking applies</li>
          <li>Timer will auto-submit</li>
          <li>You can only attempt this test once</li>
        </ul>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleStartTest}
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Starting..." : "Start Test"}
        </button>
      </div>
    </div>
  );
}
