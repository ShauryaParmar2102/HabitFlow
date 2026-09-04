import { useState, type SubmitEvent } from "react"
import { Button } from "./Button"
import {useHabits} from "../context/UseHabits"

// Creates the form component for adding new habits
export function HabitForm() {

    // Stores whatever the user has typed into the input
    // name = current input value
    // setName = function used to change the input value
    const [name, setName] = useState("")

    // Gets the AddHabit function from the habit context
    const { addHabit } = useHabits()

     // Runs when the form is submitted
    function handleSubmit(e: SubmitEvent) {
        e.preventDefault() // Prevents the browser from refreshing when the form is submitted

         // Stops the function if the input is empty or only contains spaces
        if(name.trim() === "") return
        // Clears the input field after submitting
        setName("") 
        // Adds the new habit using the name entered by the user
        addHabit(name)
    }

    return (
        // Form that calls handleSubmit when submitted
        <form className="flex gap-2" onSubmit={handleSubmit}>

            {/* Input where the user types the habit name */}
            <input
                value={name}     // Makes the input display the value stored in name
                onChange={e => setName(e.target.value)}     // Updates name whenever the user types
                className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                placeholder="New habit..."
                />

                 {/* Button used to submit and add the habit */}

                <Button
                    disabled={name.trim() === ""} // Disables the button when the input is empty
                    className="rounded-lg px-4 py-2 font-medium"
                >
                Add Habit  
                </Button>
        </form>
    )
}