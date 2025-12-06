import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Write from "./pages/Write"
import Home from "./pages/Home"
import Library from "./pages/Library"

export default function App() {
  return (
    <Router>
      <nav className="font-serif flex justify-center gap-20 p-5 text-white fixed top-0 bg-black/40 w-full">
        <Link className="rounded-xl hover:scale-150 hover:text-[#ffaa00] hover:shadow-[0_0_10px_var(--ink)] transition duration-300 text-3xl" to="/">Home</Link>
        <Link className="rounded-xl hover:scale-150 hover:text-[#ffaa00] hover:shadow-[0_0_10px_var(--ink)] transition duration-300 text-3xl" to="/write">Write</Link>
        <Link className="rounded-xl hover:scale-150 hover:text-[#ffaa00] hover:shadow-[0_0_10px_var(--ink)] transition duration-300 text-3xl" to="/library">Library</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </Router>
  ) 
}