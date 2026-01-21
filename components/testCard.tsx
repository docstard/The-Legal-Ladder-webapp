import { useRouter } from 'next/navigation'
import React from 'react'

const TestCard = ({ test }: any) => {
  const router = useRouter();

  const handleStartTest = () => {
    if (!test.isUnlocked) {
      alert("You need to enroll in a course to access this test");
      return;
    }

    if (test.attemptStatus === "SUBMITTED" || test.attemptStatus === "AUTO_SUBMITTED") {
      router.push(`/tests/${test.id}/result`);
    } else if (test.attemptStatus === "IN_PROGRESS") {
      router.push(`/tests/${test.id}/play`);
    } else {
      router.push(`/tests/${test.id}/start`);
    }
  }

  const getButtonText = () => {
    if (!test.isUnlocked) return "Locked";
    if (test.attemptStatus === "SUBMITTED" || test.attemptStatus === "AUTO_SUBMITTED") return "View Result";
    if (test.attemptStatus === "IN_PROGRESS") return "Continue Test";
    return "Start Test";
  }

  return (
    <div
      className="group relative min-h-64 flex flex-col justify-between overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3
            className="text-lg font-bold text-[#131217] group-hover:text-primary transition-colors"
          >
            {test?.title || "Sample Test Title"}
          </h3>
          <div
            className={`p-2 rounded-lg ${
              test.isUnlocked
                ? "bg-green-50 text-green-600"
                : "bg-background-light text-gray-400"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {test.isUnlocked ? "lock_open" : "lock"}
            </span>
          </div>
        </div>
        {test.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{test.description}</p>
        )}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-1.5 text-sm text-[#6e6586]">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            <span>{test?.duration || 0} mins</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#6e6586]">
            <span className="material-symbols-outlined text-[18px]">assignment</span>
            <span>{test?.totalMarks?.toString() || "0"} marks</span>
          </div>
        </div>
        {test.attemptStatus && test.attemptStatus !== "NOT_STARTED" && (
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
              {test.attemptStatus === "IN_PROGRESS" && "In Progress"}
              {test.attemptStatus === "SUBMITTED" && "Completed"}
              {test.attemptStatus === "AUTO_SUBMITTED" && "Auto-Submitted"}
            </span>
          </div>
        )}
      </div>
      <div className="mt-auto">
        <button
          onClick={handleStartTest}
          disabled={!test.isUnlocked}
          className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold shadow-sm transition-colors ${
            test.isUnlocked
              ? "bg-action-teal text-white hover:bg-teal-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <span>{getButtonText()}</span>
          {test.isUnlocked && (
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default TestCard;
