import { useEffect, useState } from "react"
import {HabitForm} from "./components/HabitForm"
import { HabitList } from "./components/HabitList"
import { Header } from "./components/Header"
import { HabitProvider } from "./context/HabitProvider"
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns"



export default function App() {

  const [weekOffSet, setWeekOffSet] = useState(0) // Stores how many weeks forward or backward the user has navigated

  const week = addWeeks(new Date(), weekOffSet) // Calculates the selected week based on the week offset

  // Creates an array containing each day of the selected week
  const visibieDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1}), // Gets the Monday at the start of the week
    end: endOfWeek(week, { weekStartsOn: 1}), // Gets the Sunday at the end of the week
  })

  // Runs whenever the week offset changes
  useEffect(() => {

    // Handles document clicks and logs the current week offset
    function handler() {
      console.log(weekOffSet)
    }
    // Adds the click event listener
    document.addEventListener("click", handler)

    // Removes the event listener when the effect is cleaned up
    return() => {
      document.removeEventListener("click", handler)
    }
  }, [weekOffSet])

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      {/* Provides habit data to the components inside it */}
      <HabitProvider>

        {/* Displays the week and allows navigation between weeks */}
        <Header
          visibleDates={visibieDates}
          onNext={() => setWeekOffSet(o => o + 1)} // Moves forward by one week 
          onPrev={() => setWeekOffSet(o => o - 1)} // Moves backward by one week
          />

           {/* Form for creating a new habit */}
          <HabitForm />

          {/* Displays the habits for the selected week */}
          <HabitList visibleDates={visibieDates} />
      </HabitProvider>
    </div>
  )
}