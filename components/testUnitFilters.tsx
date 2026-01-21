import React from 'react'

const TestUnitFilters = ({ filters, selected, setSelected }: any) => {


    const toggleState = (state: any) => {
        setSelected((prev: any) =>
            prev.includes(state)
                ? prev.filter((s: any) => s.toLowerCase() !== state) // remove state
                : [...prev, state] // add state
        );
    };


    return (
        // <section>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {filters?.map((filter: any) => (
                    <button
                        key={filter}
                        onClick={() => toggleState(filter.toLowerCase())}
                        className={`group relative flex items-center justify-center rounded-lg py-3 min-h-16 px-4 transition-all text-sm text-center leading-tight
            ${selected.includes(filter.toLowerCase())
                                ? "bg-primary text-white border-2 border-primary shadow-md hover:shadow-lg"
                                : "bg-white text-gray-700 border border-gray-200 hover:border-primary/50 hover:bg-gray-50 shadow-sm hover:shadow-md"
                            }`
                        }
                    >
                        {selected.includes(filter) && (
                            <span className="absolute top-1.5 right-1.5 opacity-100">
                                <span
                                    className="material-symbols-outlined text-white"
                                    style={{ fontSize: "16px" }}
                                >
                                    check_circle
                                </span>
                            </span>
                        )}
                        <span className="text-sm font-bold text-center leading-tight">

                            {filter}
                            <br />
                            <span className="text-xs font-normal opacity-80">
                                Judicial Services
                            </span>
                        </span>
                    </button>
                ))}
            </div>
        // </section>
    )
}

export default TestUnitFilters