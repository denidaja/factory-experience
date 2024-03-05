import {ThemeProvider} from "@/components/theme-provider"
import {ModeToggle} from "@/components/ui/mode-toggle.tsx"
import {Toaster} from "@/components/ui/toaster"
import VolunteerSubmissionPage from "@/pages/volunteer-submission/volunteer-submission.page.tsx";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster/>
            <ModeToggle/>
            <VolunteerSubmissionPage/>
        </ThemeProvider>
    )
}

export default App
