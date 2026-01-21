"use client"
import { api } from "@/lib/api";
import TestCard from "@/components/testCard";
import { useEffect, useState } from "react";
import CategoryTab from "@/components/categoryTab";
import TestUnitFilters from "@/components/testUnitFilters";

interface Props {
  params: { id: string };
}

const Page = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [activeTest, setActiveTests] = useState<"Judiciary" | "CLAT PG" | "UGC NET">("Judiciary");
  const [selected, setSelected] = useState<string[]>([]);
  const [mockTests, setMockTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [examCategories, setExamCategories] = useState<any[]>([]);

  // Fetch exam categories on mount
  useEffect(() => {
    api.getExamCategories()
      .then((data) => {
        setExamCategories(data.categories);
      })
      .catch((err) => {
        console.error("Failed to fetch exam categories:", err);
      });
  }, []);

  // Fetch mock tests when active test changes
  useEffect(() => {
    setLoading(true);
    const examCategory = examCategories.find(
      (cat) => cat.name.toLowerCase().includes(activeTest.toLowerCase())
    );

    if (examCategory) {
      api.getMockTests({ examCategoryId: examCategory.id })
        .then((data) => {
          setMockTests(data.mockTests || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch mock tests:", err);
          setLoading(false);
        });
    } else {
      // Fallback: fetch all tests
      api.getMockTests()
        .then((data) => {
          setMockTests(data.mockTests || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch mock tests:", err);
          setLoading(false);
        });
    }
  }, [activeTest, examCategories]);

  const judiciaryUnits = [
    ...new Set(
      mockTests
        .filter(
          (test) =>
            test.examCategory?.type === "JUDICIARY" &&
            test.type === "SECTIONAL"
        )
        .map((test) => test.unit)
        .filter((unit): unit is string => unit !== undefined)
    ),
  ];

  const ugcNetUnits = [
    ...new Set(
      mockTests
        .filter(
          (test) =>
            test.examCategory?.type === "UGC_NET_LAW" &&
            test.type === "SECTIONAL"
        )
        .map((test) => test.unit)
        .filter((unit): unit is string => unit !== undefined)
    ),
  ];

  useEffect(() => {
    if (activeTest == "Judiciary") {
      setFilters(judiciaryUnits);
    } else if (activeTest == "UGC NET") {
      setFilters(ugcNetUnits);
    } else {
      setFilters([]);
    }
  }, [activeTest, mockTests]);

  const fullLengthTests = mockTests.filter(
    (test) =>
      (test.examCategory?.type === "JUDICIARY" && activeTest === "Judiciary") ||
      (test.examCategory?.type === "CLAT_PG" && activeTest === "CLAT PG") ||
      (test.examCategory?.type === "UGC_NET_LAW" && activeTest === "UGC NET") &&
      test.type === "FULL_LENGTH"
  );

  const sectionalTests = mockTests.filter(
    (test) =>
      ((test.examCategory?.type === "JUDICIARY" && activeTest === "Judiciary") ||
        (test.examCategory?.type === "CLAT_PG" && activeTest === "CLAT PG") ||
        (test.examCategory?.type === "UGC_NET_LAW" && activeTest === "UGC NET")) &&
      test.type === "SECTIONAL" &&
      (selected.length === 0 || (test.unit && selected.includes(test.unit.toLowerCase())))
  );


  if (loading) {
    return (
      <main className="text-black grow py-24 bg-background-light -z-10">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading mock tests...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="text-black grow py-24 bg-background-light -z-10  ">
      {/* Hero section */}
      <section className="pt-16 pb-12 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl text-primary leading-tight font-bold mb-4">Mock Tests</h1>
          <p className="text-lg text-text-muted md:text-xl font-light">
            Practice with our comprehensive mock tests designed for various law exams.
          </p>
        </div>
      </section>
      {/* <!-- Category Tabs --> */}
      <CategoryTab activeTab={activeTest} setActiveTab={setActiveTests} categories={["Judiciary", "CLAT PG", "UGC NET"]} />

      {/* Filters */}
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Full Length Mock Tests */}
        <section aria-labelledby="full-length-title">
          <div className="flex items-center gap-3 mb-6">
            <h2
              className="text-2xl font-bold text-primary"
              id="full-length-title"
            >
              Full Length Mock Tests
            </h2>
            <span
              className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 "
            >
              Recommended
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {fullLengthTests.length > 0 ? (
              fullLengthTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))
            ) : (
              <p className="text-gray-500 col-span-3 text-center py-8">No full length tests available</p>
            )}
          </div>
        </section>

        {/* Sectional Mock Tests */}
        <div aria-labelledby="sectional-title" className="flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-6">
            <h2
              className="text-2xl font-bold text-primary"
              id="sectional-title"
            >
              Sectional Mock Tests
            </h2>
            <span
              className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 "
            >
              Practice by Subject
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {sectionalTests.length > 0 ? (
              sectionalTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))
            ) : (
              <p className="text-gray-500 col-span-3 text-center py-8">No sectional tests available</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page