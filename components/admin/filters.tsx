"use client"

import { Button } from "@/components/ui/button"

type FilterProps = {
    selected?: string
    onChange: (value: string) => void
    filtersArray: string[]
}

export function Filters({ filtersArray, onChange, selected }: FilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {filtersArray.map((filter, i) => {
                const isActive = selected === filter
                return(
                <Button
                    key={filter}
                    onClick={() => onChange(filter)}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                >
                    {filter}
                </Button>
            )})}
        </div>
    )
}