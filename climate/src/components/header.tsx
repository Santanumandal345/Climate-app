// import { useTheme } from "@/context/theme-provide";/
// import { useTheme } from "./context/theme-provide";
// import { Moon, Sun } from "lucide-react";
// import { Link } from "react-router-dom";



// const Header = () => {
//     const { theme, setTheme } = useTheme();
//     const isDark = theme === "dark";

  

//     return (
//         <header className="sticky top-0 z-50 w-full border-b  bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]: bg-background/60">
//             <div className="container mx-auto flex h-16 items-center justify-between px-4">
//                 <Link to={"/"}>
//                     <img src={isDark ? "/logo1.jpeg" : "/logo2.jpeg"} alt="Climate App Logo" className="h-14" />

//                 </Link>
//             </div>
//             <div onClick={() => setTheme(isDark ? "light" : "dark")} className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : ""}`}>

//                 {isDark ? (
//                     <Sun className="h-6 w-6  text-blue-500 rotate-0">
//                 ) : (
//                         <Moon className="h-6 w-6 text-yellow-500 rotate-180">
//                 )}       
            
//             </div>
//         </header>
//     )
// }

// export default Header
import { useTheme } from "./context/theme-provide";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import logoDark from "../assets/logo1.png";
import logoLight from "../assets/logo2.png";


const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <img
            src={isDark ? logoDark : logoLight}
            alt="Climate App Logo"
            className="h-14"
          />
        </Link>

        {/* Theme Toggle */}
        <div
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`flex items-center cursor-pointer transition-transform duration-500 ${
            isDark ? "rotate-180" : ""
          }`}
        >
          {isDark ? (
            <Sun className="h-6 w-6 text-yellow-500" />
          ) : (
            <Moon className="h-6 w-6 text-blue-500" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


