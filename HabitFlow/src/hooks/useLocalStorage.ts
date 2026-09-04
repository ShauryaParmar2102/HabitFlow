import { parseISO } from "date-fns"
import { useEffect, useState } from "react"

// Custom hook for saving state to LocalStorage
export function useLocalStorage<T>(Key: string, initialValue: T) {

        // Loads saved value or uses the default value
    const [storedValue, setStoredValue] = useState<T>(() => {
        try{
            const item = localStorage.getItem(Key)
                if (item == null) return initialValue

            return JSON.parse(item, dateReviver)
            }catch {
            return initialValue
            }
        })
            // Saves the value whenever it changes
        useEffect(() => { // Runs whenever the saved value changes
            localStorage.setItem(Key, JSON.stringify(storedValue)) // Saves the habits to LocalStorage
        }, [storedValue, Key]) // Runs again when storedValue or Key changes

        return [storedValue, setStoredValue] as const
    }
    // Converts saved date strings back into Date objects
    function dateReviver(_key: string, value: unknown) { 
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) { // Checks if the value is a saved date string
    return parseISO(value) // Converts the string back into a Date object
  }

  return value // Returns the value unchanged if it is not a date
}