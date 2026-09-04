import { isSameDay } from "date-fns"
import { type ReactNode } from "react"
import { HabitContext, type Habit } from "./UseHabits"
import { useLocalStorage } from "../hooks/useLocalStorage"

// Defines the props that HabitProvider accepts
type HabitProviderProps = {
    children: ReactNode
}

export function HabitProvider({children}: HabitProviderProps) {
    const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", []) // Stores the habits in localStorage so they remain after refreshing the page

        // Adds a new habit with a unique ID and an empty completions array
    function addHabit(name: string) {
        setHabits(curr => [
            ...curr,
            { id: crypto.randomUUID(), name, completions: []},
        ])
    }

        // Deletes a habit by removing the habit with the matching ID
    function deleteHabit(id: string) {
    setHabits(curr => curr.filter(h => h.id !== id))
    }

    // Marks or unmarks a habit as completed for a specific date
    function toggleHabit(id: string, date: Date) {
        setHabits(curr => 
            curr.map(h => {
                // Leave other habits unchanged
                if (h.id !== id) return h

                // Check if the habit is already completed on this date
                const alreadyDone = h.completions.some(c => isSameDay(c, date))
                // Remove the date if completed, otherwise add the date
                const completions = alreadyDone
                ? h.completions.filter(c => !isSameDay(c, date))
                : [...h.completions, date]

            return {...h, completions } // Return the updated habit
            })
        )
    }

    // Makes the habit data and functions available to child components
    return (
    <HabitContext value={{ habits, addHabit, toggleHabit, deleteHabit }}>
      {children}
    </HabitContext>
    )
}