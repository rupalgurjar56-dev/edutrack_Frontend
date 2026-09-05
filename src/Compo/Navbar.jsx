import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
// import { TiThMenuOutline } from "react-icons/ti";
const Navbar = () => {
  return (
    <nav className="z-50 glass border-b border-white/20 px-6 py-5 sticky top-0 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-premium rounded-xl text-white shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-8 h-8" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Edu<span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-500">Track</span>
            </span>
          </div>
          </Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Sign In
          </Link>
          <Link to="/signup" className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-premium rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300">
            Teacher Portal
          </Link>
        </div>
      </div>
    </nav>
 
 
  )
 
}
 
export default Navbar