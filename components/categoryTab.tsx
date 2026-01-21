import React from 'react'

const CategoryTab = ({ activeTab, setActiveTab, categories }: any) => {
  return (
    <div
        className="sticky top-16 z-40 bg-background-light backdrop-blur border-b border-neutral-soft mb-12 shadow-sm"
      >
        <div className="max-w-[1200px] mx-auto px-4 flex justify-center">
          <div className="flex gap-8 md:gap-16 overflow-x-auto no-scrollbar">
            {categories.map((tab : any) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`group flex flex-col items-center pt-4 pb-3 px-2 transition-all
                                        ${activeTab === tab
                    ? "border-b-[3px] border-primary"
                    : "border-b-[3px] border-transparent hover:border-neutral-300"
                  }`}
              >
                <span
                  className={`text-sm tracking-wide ${activeTab === tab
                    ? "text-primary font-bold"
                    : "text-text-muted font-medium group-hover:text-text-dark"
                    }`}
                >
                  {tab}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
  )
}

export default CategoryTab