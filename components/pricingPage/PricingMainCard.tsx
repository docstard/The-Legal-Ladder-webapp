import React from 'react'

interface PricingMainCardProps {
  variant: "Primary" | "Secondary" | "SubjectCard" | "AddonCard";
  courseData?: any;
}

const PricingMainCard = ({ variant, courseData, }: PricingMainCardProps) => {
  // console.log(courseData[0]);
  return (
    <div
      className="bg-white rounded-2xl p-8 border border-neutral-soft shadow-soft relative overflow-hidden flex flex-col md:flex-row gap-8"
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
            {courseData?.title}
          </h3>
          <p className="text-text-muted mb-6 text-sm leading-relaxed">
            {courseData?.description}
          </p>
          <div className="space-y-3 mb-8">
            {courseData?.features?.map((feature: string, index: number) => {
              // console.log(courseData.variants[0]);
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
        className="w-full md:w-64 bg-[#f6f6f8] rounded-xl p-6 flex flex-col justify-center items-center text-center border border-neutral-soft/50"
      >
        <span className="text-text-muted text-sm font-medium mb-1">
          One-time payment
        </span>
        <div className="text-4xl font-bold text-primary font-serif mb-2">
          ₹25,000
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
  )
}

export default PricingMainCard