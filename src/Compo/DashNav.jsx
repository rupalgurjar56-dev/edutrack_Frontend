import { LogOut, GraduationCap, Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../Store/AuthSlice';
import { useNavigate } from 'react-router-dom';

export default function DashNav() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout() {
        await dispatch(logoutThunk());
        navigate("/login");
    }

    return (
        <nav className="glass border-b border-white/20 dark:border-slate-700/50 px-6 py-4 sticky top-0 z-50 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
            <div className="flex items-center justify-between max-w-full">
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-slate-500 hover:text-indigo-600 dark:text-slate-400 transition-colors cursor-pointer p-2 hover:bg-slate-100 rounded-lg dark:hover:bg-slate-800">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
                        <div className="p-1.5 bg-gradient-premium rounded-xl text-white shadow-lg shadow-indigo-500/20 transform hover:scale-105 transition-transform">
                            <GraduationCap className="w-8 h-8 drop-shadow-md" />
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white hidden sm:block">
                            Edu<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Manage</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-700/50"></div>

                    {user && (
                        <div className="flex items-center gap-4 group">
                            <div className="hidden sm:flex flex-col text-right">
                                <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user.name}</span>
                                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 capitalize flex items-center justify-end gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                                    {user.role}
                                </span>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30 uppercase transform group-hover:scale-[1.08] transition-all duration-300 cursor-default text-lg border border-white/20">
                                {user.name ? user.name.charAt(0) : 'U'}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2.5 text-red-500/80 hover:text-red-600 bg-red-50/50 hover:bg-red-50 dark:bg-red-500/5 dark:hover:bg-red-500/10 rounded-xl transition-all duration-300 cursor-pointer shadow-sm border border-red-100/50 dark:border-red-900/30 hover:border-red-200 dark:hover:border-red-500/30 ml-1 hover:-translate-y-0.5 hover:shadow-red-500/10"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}