import ThemeToggle from "../../theme-toggle/ThemeToggle"

const SimpleHeader = () => {
    return (
        <div className="flex justify-between items-center px-lg py-md">
            <img src="/images/logo.png" alt="Logo" className="w-[150px]" />
            <ThemeToggle />
        </div>
    )
}

export default SimpleHeader