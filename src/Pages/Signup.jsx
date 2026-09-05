import { GraduationCap } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerThunk } from '../Store/AuthSlice';

const Signup = () => {
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role] = useState('teacher');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function dataSubmit(e) {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await dispatch(registerThunk({ name, email, password, role })).unwrap();
            navigate("/teacherDash");
        } catch (err) {
            setError(err || "Registration failed.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors py-12">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-500/20 dark:bg-pink-600/10 blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-20%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 dark:bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="z-10 w-full max-w-md p-6">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-premium text-white shadow-lg shadow-pink-500/30 mb-5 transform hover:scale-110 transition-transform duration-300">
                        <GraduationCap className="w-7 h-7" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Create Account</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Join the <span className="text-pink-600 dark:text-pink-400">EduTrack</span> platform</p>
                </div>

                <form className="glass p-8 rounded-4xl" onSubmit={dataSubmit}>
                    {error && <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm font-medium rounded-r-lg">{error}</div>}

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Full Name</label>
                            <input required className="w-full px-5 py-3.5 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Email Address</label>
                            <input required type="email" className="w-full px-5 py-3.5 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="name@school.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Password</label>
                            <input required type="password" className="w-full px-5 py-3.5 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Account Role</label>
                            <div className="w-full px-5 py-3.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-xl text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-between">
                                <span>Teacher</span>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
                            </div>
                        </div>
                        <button disabled={isSubmitting} type="submit" className="w-full bg-gradient-premium shadow-xl shadow-pink-500/20 hover:shadow-pink-500/40 text-white py-3.5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 mt-6 disabled:opacity-50">
                            {isSubmitting ? "Creating..." : "Create Account"}
                        </button>
                    </div>

                    <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400 font-medium">
                        Already have an account? <Link to="/signup" className="text-pink-600 dark:text-pink-400 font-bold hover:text-pink-700 dark:hover:text-pink-300 transition-colors ml-1">Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;