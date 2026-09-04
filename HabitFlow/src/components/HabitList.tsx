import { type Habit, useHabits } from "../context/UseHabits"
import { Button } from "./Button"
import { format, isFuture, isSameDay, subDays } from "date-fns"

// Defines the props that HabitList expects
    type HabitListProps = {
        visibleDates: Date[] // Array containing the dates that should be displayed
    }

    // Component that displays all of the user's habits
    export function HabitList({ visibleDates }: HabitListProps) {
        const {habits} = useHabits() // Gets the habits array from the habit context

        // If there are no habits, display a message instead of the list
        if(habits.length === 0) {
            return (
                <p className="text-center text-zinc-500 py-12">
                    No habits yet. Add one to get started!
                </p>
            )
        }

        return (
            // Container holding all habit items
            <div className="flex flex-col gap-3"> 
            {/* Loops through each habit and creates a HabitItem */}
                {habits.map(habit => (
                    <HabitItem 
                    key={habit.id}  // Unique key used by React to identify this item
                    habit={habit}  // Passes the current habit to HabitItem

                    // Passes the dates that should be displayed
                    visibleDates={visibleDates} />
                ))}
            </div>
        )
    }
        // Defines the props required by an individual HabitItem
    type HabitItemProps = {
        habit: Habit // The habit that this item should display
        visibleDates: Date[] // Dates that should be displayed for the habit
    }
        // Component responsible for displaying one individual habit
    function HabitItem({ habit, visibleDates }: HabitItemProps) {
        const { deleteHabit, toggleHabit } = useHabits() // Gets the delete and toggle functions from the habit context
        const streak = getStreak(habit.completions)  // Calculates the current completion streak for this habit

        return (
            // Card containing information about one habit
            <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
                {/* Top section of the habit card */}
                <div className="flex items-center justify-between">
                    {/* Displays the habit's current streak */}
                <div className="flex gap-3 items-center">
                    <span className="font-medium">{habit.name}</span>
                    <span className="text-sm text-amber-400"> 🔥 {streak}
                </span>

            </div>
             {/* Deletes this habit when clicked */}
            <Button
                onClick={() => deleteHabit(habit.id)}
                variant="ghost-destructive"
                className="text-sm"
                >
                Delete
            </Button>
            </div>
            <div className="flex gap-1.5">
                {visibleDates.map(date => (
                    <Button
                        className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
                        key={date.toISOString()}
                        disabled={isFuture(date)}
                        onClick={() => toggleHabit(habit.id, date)}
                        variant={
                            habit.completions.some(d => isSameDay(date, d))
                            ? "primary"
                            : "secondary"
                        }
                        >
                            <span className="font-medium">{format(date, "EEE")}</span>
                            <span>{format(date, "d")}</span>
                        </Button>
                ))}
            </div>
        </div>

        )
    }
    // Calculates how many consecutive days the habit has been completed
    function getStreak(completions: Date[]) {
        let streak = 0 // Starts the streak counter at zero
        let date = new Date() // Starts checking from today's date

        // Keeps looping while the current date exists in the completion list
        while (completions.some(c => isSameDay(c, date))) {
            streak++ // Adds one to the streak
            date = subDays(date, 1) // Moves backwards by one day
        }

        return streak // Returns the final streak number
    }