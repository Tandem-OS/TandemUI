import Heading from "../components/demos/typography/Heading"
import SimpleHeader from "../components/Headers/SimpleHeader/SimpleHeader"

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-gray-900 flex-col">
            <div className="w-full">
                <SimpleHeader />
            </div>
            <Heading level="h1" className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white text-center mt-40">
                Dashboard
            </Heading>
        </div>
    )
}

export default Dashboard