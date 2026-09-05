import { ArrowRight, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
const Home = () => {
    import.meta.env.VITE_MY_APP_NAME
    return (
        <div className="relative z-10 bg-black">
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
 
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-bold mb-8 shadow-sm">
                    <Rocket className="w-4 h-4" /> The Future of Education Management
                </div>
 
                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 max-w-4xl">
                    Simplify Your School <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-size-200 animate-gradient">
                        Empower Your Students
                    </span>
                </h1>
 
                <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-2xl leading-relaxed">
                    A modern, lightning-fast platform to manage student records, track attendance, and monitor academic performance with elegant simplicity.
                </p>
 
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link to="/signup" className="group px-8 py-4 text-lg font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                        Start as a Teacher <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/login" className="px-8 py-4 text-lg font-bold text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm flex items-center justify-center">
                        Student Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
 
export default Home