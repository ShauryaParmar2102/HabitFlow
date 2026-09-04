import { format, isToday } from "date-fns"
import { useHabits } from "../context/UseHabits"
import { Button } from "./Button"

// Defines the props that the Header component expects
type HeaderProps = {
    visibleDates: Date[]     // Array containing the dates currently being displayed
    onPrev: () => void // Function for going to the previous week
    onNext: () => void // Function for going to the next week
}

// Creates the Header component
export function Header({ visibleDates, onNext, onPrev}: HeaderProps) {
        const {habits} = useHabits()     // Gets all habits from the Habit context

            // Counts how many habits have been completed today
        const doneToday = habits.filter(h =>

            // Checks whether any completion date for this habit is today
        h.completions.some(c => isToday(c))
        ).length

    // Creates a readable date range for the displayed week
    // Example: "Sep 1 - Sep 7"
        const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d, yyyy")}`

        return (
            <header className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold">HabitFlow</h1>
                <span className="text-zinc-400 text-sm">
                    {doneToday} / {habits.length} done today
                </span>
            </div>

            <div className="flex flex-col gap-1 items-end">
                <span className="text-zinc-400 text-sm">{dateRange}</span>
                <div className="flex items-center gap-3">
                    <Button onClick={onPrev}>Prev</Button>
                    <Button 
                        onClick={onNext}
                        disabled={visibleDates.some(d => isToday(d))}
                        >
                            Next
                        </Button>
                </div>
            </div>
        </header>
    )
}