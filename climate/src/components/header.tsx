
 


import { useTheme } from "@/components/context/theme-provide"
import { Moon, Sun } from "lucide-react"
import { Link } from "react-router-dom"
import CitySearch from "./city-search"
// import CitySearch from "./CitySearch" // ✅ Import CitySearch (relative path)

const Header = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/">
          <img
            src={isDark ? "/logo1.png" : "/logo2.png"} // from /public folder
            alt={`Climate Logo (${isDark ? "Dark" : "Light"} mode)`}
            className="h-14"
          />
        </Link>

        {/* Right Side Controls */}
        <div className="flex gap-4 items-center">
          {/* City Search */}
          <CitySearch />

          {/* Theme Toggle */}
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Moon className="h-6 w-6 text-blue-500 transition-all" />
            ) : (
              <Sun className="h-6 w-6 text-yellow-500 rotate-180 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
