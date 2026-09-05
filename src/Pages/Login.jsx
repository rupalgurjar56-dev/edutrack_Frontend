import { GraduationCap } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginThunk } from '../Store/AuthSlice';

const Login = () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function submitLogin(e) {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const user = await dispatch(loginThunk({ email, password })).unwrap();
            if (user.role === 'teacher') {
                navigate("/teacherDash");
            } else {
                navigate("/studentDash");
            }
        } catch (err) {
            setError(err || "Login failed. Invalid credentials or blocked account.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 dark:bg-indigo-600/10 blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 dark:bg-purple-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="z-10 w-full max-w-md p-6">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-premium text-white shadow-lg shadow-indigo-500/30 mb-5 transform hover:scale-110 transition-transform duration-300">
                        <GraduationCap className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Welcome Back</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Sign in to your <span className="text-indigo-600 dark:text-indigo-400">EduTrack</span> account</p>
                </div>

                <form className="glass p-8 rounded-4xl" onSubmit={submitLogin}>
                    {error && <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm font-medium rounded-r-lg">{error}</div>}

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Email Address</label>
                            <input
                                required type="email"
                                className="w-full px-5 py-3.5 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 font-medium"
                                placeholder="teacher@demo.com" value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Password</label>
                            <input
                                required type="password"
                                className="w-full px-5 py-3.5 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 font-medium"
                                placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button disabled={isSubmitting} type="submit" className="w-full bg-gradient-premium shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 text-white py-3.5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 mt-4 disabled:opacity-50">
                            {isSubmitting ? "Signing in..." : "Access Dashboard"}
                        </button>
                    </div>

                    <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400 font-medium">
                        Don't have an account? <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors ml-1">Create one</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;