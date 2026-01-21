"use client"

import PricingMainCard from '@/components/pricingPage/PricingMainCard'
import React, { useEffect, useState } from 'react'
import courseData from '@/data/courseData.json'
import courseData2 from '@/data/courseData2.json'
import CourseCard from '@/components/pricingPage/courseCard';
import CategoryTab from '@/components/categoryTab'

const Page = () => {
    const [activeExam, setActiveExam] = useState<"Judiciary" | "Clat PG" | "UGC NET">("Judiciary");

    useEffect(() => {
        console.log("Active Exam changed to:", activeExam);
    }, [activeExam])


    const primaryCourses = courseData2.courses.filter(
        (c) =>
            c.exam_category === activeExam.toLowerCase() &&
            c.course_category === "primary"
    );

    console.log("primary COurses", primaryCourses)

    const secondaryCourses = courseData2.courses.filter(
        (c) =>
            c.exam_category === activeExam.toLowerCase() &&
            c.course_category === "secondary"
    )[0];
    console.log("secondaryCOurses", secondaryCourses)

    const basicCourses = courseData2.courses.filter(
        (c) =>
            c.exam_category === activeExam.toLowerCase() &&
            c.course_category === "basic"
    );
    console.log("basicCourses", basicCourses)

    const addonCourses = courseData2.courses.filter(
        (c) =>
            c.exam_category === activeExam.toLowerCase() &&
            c.course_category === "addon"
    );


    function capitalizeFirstLetter(str: string | null) {
        if (!str) return ""; // Handle empty strings
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    // added type guard variable for the secondary course
    return (
        <main className="grow py-24 bg-[#f6f6f8] -z-10">
            {/* <!-- Hero Section --> */}
            <section className="pt-16 pb-12 text-center px-4">
                <div className="max-w-3xl mx-auto space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                        Courses &amp; Pricing
                    </h1>
                    <p className="text-lg text-text-muted md:text-xl font-light">
                        Choose the plan that fits your preparation journey.
                    </p>
                    <p className="text-sm text-text-muted/80">
                        All plans are student-focused and mentor-guided
                    </p>
                </div>
            </section>
            {/* <!-- Category Tabs --> */}
            <CategoryTab activeTab={activeExam} setActiveTab={setActiveExam} categories={["Judiciary", "Clat PG", "UGC NET"]} />

            
            {/* <!-- Content Container --> */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                {/* <!-- SECTION 1: Full Comprehensive Courses (Judiciary) --> */}
                <section>
                    <div className="flex items-end justify-between mb-8 px-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary">
                            Comprehensive {activeExam} Courses
                        </h2>
                        <span
                            className="hidden md:inline-block h-px bg-neutral-soft flex-1 ml-6 relative -top-2"
                        ></span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* <!-- Featured Card --> */}
                        <div className='lg:col-span-2'>
                            <div
                                className="lg:col-span-2 bg-white rounded-2xl p-8 border border-neutral-soft shadow-soft relative overflow-hidden flex flex-col md:flex-row gap-8"
                            >
                                {/* <!-- Best Value Tag --> */}
                                <div
                                    className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider shadow-sm"
                                >
                                    Most Popular
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-primary font-serif mb-2">
                                            {primaryCourses[0]?.title}
                                        </h3>
                                        <p className="text-text-muted mb-6 text-sm leading-relaxed">
                                            {primaryCourses[0]?.description}
                                        </p>
                                        <div className="space-y-3 mb-8">
                                            {primaryCourses[0]?.features?.map((feature: string, index: number) => {
                                                return (
                                                    <div key={index} className="flex items-center gap-3">
                                                        <div
                                                            className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"
                                                        >
                                                            <span className="material-symbols-outlined text-[16px]">
                                                                check
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-medium text-text-dark">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="w-full md:w-64 bg-background-ivory rounded-xl p-6 flex flex-col justify-center items-center text-center border border-neutral-soft/50"
                                >
                                    <span className="text-text-muted text-sm font-medium mb-1"
                                    >One-time payment</span
                                    >
                                    <div className="text-4xl font-bold text-primary font-serif mb-2">
                                        ₹{primaryCourses[0]?.price}
                                    </div>
                                    <p className="text-xs text-text-muted mb-6">
                                        Inclusive of all taxes
                                    </p>
                                    <button
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
                                    >
                                        Enroll Now
                                    </button>
                                    <button
                                        className="mt-3 text-primary text-sm font-semibold hover:underline"
                                    >
                                        Download Brochure
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Secondary Card (Example of variant) --> */}

                        <div
                            className="bg-white rounded-2xl p-6 border border-neutral-soft shadow-soft flex flex-col"
                        >
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-primary font-serif mb-2">
                                    {secondaryCourses?.title}
                                </h3>
                                <p className="text-text-muted text-sm">
                                    {secondaryCourses?.description}
                                </p>
                            </div>
                            <div className="my-4 pt-4 border-t border-dashed border-neutral-soft">
                                <div className="text-3xl font-bold text-primary font-serif mb-1">
                                    ₹{secondaryCourses?.price}
                                </div>
                                <span className="text-xs text-text-muted">{secondaryCourses?.sub_description}</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                {secondaryCourses?.features?.map((feature: string, index: number) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-text-dark">
                                        <span
                                            className="material-symbols-outlined text-accent text-[18px]">
                                            verified
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="w-full bg-white border border-primary text-primary hover:bg-primary/5 font-bold py-2.5 rounded-xl transition-colors"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </section>




                {/* <!-- SECTION 2: Subject-Wise Modules --> */}
                <section>
                    <div className="flex items-end justify-between mb-6 px-2">
                        <div>
                            <h2 className="text-2xl font-bold text-primary">
                                {`
                                ${activeExam.toLowerCase() === "judiciary"
                                        ? "Subject-Wise Modules"
                                        : activeExam
                                    } `}
                            </h2>
                            <p className="text-text-muted text-sm mt-1">
                                {`
                                ${activeExam.toLowerCase() === "judiciary"
                                        ? "Focus on specific areas to strengthen your weak points."
                                        : "Focus on specific areas to strengthen your weak points."
                                    }`}
                            </p>
                        </div>
                    </div>
                    {basicCourses.length > 0 && (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {/* <!-- Subject Card 1 --> */}
                            {/* {courseData.exam_categories[0].courses.filter &&} */}

                            {basicCourses.map((course) => (
                                <CourseCard course={course} key={course.id} />
                            ))}

                        </div>
                    )}
                </section>

                {/* <!-- SECTION 3: Mock Tests & Add-ons --> */}
                {addonCourses.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-6 px-2">
                            <span className="material-symbols-outlined text-accent text-3xl">
                                quiz
                            </span>
                            <h2 className="text-2xl font-bold text-primary">
                                Mock Tests &amp; Add-Ons
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {addonCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white p-5 rounded-xl border border-neutral-soft shadow-sm flex flex-col justify-between h-full"
                                >
                                    <div>
                                        <h4 className="font-bold text-text-dark mb-1">{course.title}</h4>
                                        <p className="text-xs text-text-muted mb-3">{course.description}</p>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-xl font-bold text-primary">₹{course.price}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="w-full bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-primary/90"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </main>
    )
}

export default Page