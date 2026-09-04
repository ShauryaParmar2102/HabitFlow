import { createContext, useContext } from "react"

export type Habit = { 
    id: string,     // Unique ID used to identify the habit
    name: string,  // Name of the habit, e.g. "Go to the gym"
    completions: Date[] // Stores the dates when this habit was completed
} 

// Defines what data and functions will be available through the context
type Context = {
    habits: Habit[] // Stores all of the user's habits
    addHabit: (name: string) => void // Function used to create a new habit
    deleteHabit: (id: string ) => void     // Function used to delete a habit using its ID
    toggleHabit: (id: string, date: Date) => void     // Function used to mark/unmark a habit as completed on a particular date
}

// Creates the React context
// It starts as null because the HabitProvider will provide the actual value later
export const HabitContext = createContext<null | Context>(null)

// Custom React hook used by components to access the habit context
export function useHabits() {
    const context = useContext(HabitContext) // Gets the current habit context

        // Checks that this hook is being used inside HabitProvider
    if (context === null) {
        throw new Error("useHabits must be used within a HabitProvider")
    }

    return context // Returns the habit data and functions from the context
}