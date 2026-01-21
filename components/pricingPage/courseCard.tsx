import React from 'react'

interface CourseCardProps {
    course: any
}

const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <div
            className="bg-white rounded-xl p-6 border border-neutral-soft shadow-sm hover:shadow-hover transition-shadow group"
        >
            <div className="flex justify-between items-start mb-4">
                <div
                    className="size-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center"
                >
                    <span className="material-symbols-outlined">{course.icon}</span>
                </div>
                <span className="text-lg font-bold text-primary">₹{course.price}</span>
            </div>
            <h3
                className="text-lg font-bold text-text-dark font-serif mb-2 group-hover:text-primary transition-colors"
            >
                {course.title}
            </h3>
            <p className="text-text-muted text-sm mb-4 line-clamp-2">
                {course.description}
            </p>
            <div
                className="flex items-center gap-4 text-xs text-text-muted font-medium mb-5"
            >
                <span className="flex items-center gap-1"
                ><span className="material-symbols-outlined text-[14px]"
                >videocam</span
                    >
                    Live Classes</span
                >
                <span className="flex items-center gap-1"
                ><span className="material-symbols-outlined text-[14px]"
                >description</span
                    >
                    Notes</span
                >
            </div>
            <button
                className="w-full border border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold py-2 rounded-lg transition-colors"
            >
                View Module
            </button>
        </div>
    )
}

export default CourseCard