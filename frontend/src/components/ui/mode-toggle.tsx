import {Moon, Sun} from "lucide-react"

import {Button} from "@/components/ui/button.tsx"
import {useTheme} from "@/components/theme-provider.tsx"

export function ModeToggle() {
    const {theme, setTheme} = useTheme()

    function toggleTheme() {
        if (theme === 'light') setTheme('dark');
        else setTheme('light');
    }

    return (
        <div className="absolute top-2 right-2 z-10">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                <Moon
                    className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
            </Button>
        </div>
    )
}
