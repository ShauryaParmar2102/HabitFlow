import type {ComponentProps} from "react"
import { twMerge } from "tailwind-merge"
 
type Variant = "primary" | "secondary" | "ghost-destructive" // Defines the three styles that our Button component is allowed to use


// Defines the props that can be passed into our Button component
type ButtonProps = {
    // Optional custom style for the button
    // If no variant is provided, "primary" will be used later
    variant?: Variant

// Also includes all normal HTML <button> props,
// such as onClick, disabled, type, className, etc.
} & ComponentProps<"button">

// Creates a reusable Button component
export function Button({
    variant = "primary", // Gets the variant prop and defaults it to "primary"
    className,  // Gets any extra Tailwind/CSS classes passed to the button
    ...props // Collects all remaining button props into the props object
}: ButtonProps) {
    return (
        <button
        {...props} // Passes remaining props such as onClick, disabled and type

         // Creates the final Tailwind class string for the button
        className={twMerge(
            // Styles that every button will have
            "transition-colors rounded px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed",
            // Adds styles depending on the selected variant
            getVariantStyles(variant),
            // Adds any extra classes passed through className
            className,
            )}
        />
    )
}
// Takes a button variant and returns the correct Tailwind classes
function getVariantStyles(variant:Variant) {
    switch (variant) {
        case "primary":
            return "bg-violet-600 hover:bg-violet-500"
        case "secondary":
            return "bg-zinc-700 hover:bg-zinc-600 text-zinc-400"
        case "ghost-destructive":
            return "hover:bg-red-800 text-red-800 hover:text-red-200"
        default:
            throw new Error(`Invalid variant: ${variant satisfies never}`)
    }
}