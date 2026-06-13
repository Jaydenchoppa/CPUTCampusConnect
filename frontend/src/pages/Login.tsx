import React, { useState } from 'react';
import {
    Landmark,
    Mail,
    Lock,
    ArrowRight,
    Megaphone
} from 'lucide-react';
import axiosClient from '../services/axiosClient.ts';
import cputIcon from '../assets/cput-icon.jpg';
import type {BackendErrorResponse} from '../types/apiResponses.ts';
import {isAxiosError} from "axios";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        try {
            const response = await axiosClient.post('/api/auth/login', { email, password });
            const { token } = response.data;
            if (rememberMe) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }
            alert('Login successful!');
            // TODO: navigate to dashboard
        } catch (err: unknown) {
            setLoading(false);
            if (isAxiosError<BackendErrorResponse>(err)) {
                const backendMessage = err.response?.data?.message || 'Invalid email or password.';
                setErrorMessage(backendMessage);
            }

            else if (err instanceof Error) {
                setErrorMessage(err.message);
            }

            else {
                setErrorMessage('An unexpected network error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-app px-4 sm:px-6 lg:px-8 font-brand">

            {/* Top Header Section */}
            <div className="mb-8 flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary shadow-sm">
                    <Landmark className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-brand-primary">
                    Campus Connect
                </h1>
                <p className="mt-1 text-sm text-muted">
                    Cape Peninsula University of Technology
                </p>
            </div>

            {/* Main Login Card */}
            <div className="w-full max-w-md bg-card px-8 py-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Error Message Alert */}
                    {errorMessage && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 border border-red-200 text-center">
                            {errorMessage}
                        </div>
                    )}

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-xs font-bold uppercase tracking-wider text-muted"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                required
                                className="block w-full rounded-lg border-0 bg-[#F4F5F7] py-3 pl-10 pr-3 text-brand-primary placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-brand-primary transition-colors sm:text-sm"
                                placeholder="email@mycput.ac.za"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-xs font-bold uppercase tracking-wider text-muted"
                            >
                                Password
                            </label>
                            <a
                                href="#"
                                className="text-xs font-semibold text-brand-accent hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                required
                                className="block w-full rounded-lg border-0 bg-[#F4F5F7] py-3 pl-10 pr-3 text-brand-primary placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-brand-primary transition-colors sm:text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-brand-primary cursor-pointer">
                            Remember Me
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary py-3.5 text-sm font-semibold text-white shadow-md hover:opacity-90 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                        {!loading && <ArrowRight className="h-4 w-4" />}
                    </button>
                </form>

                {/* Create Account Link */}
                <p className="mt-8 text-center text-sm text-muted">
                    New here?{' '}
                    <a href="/register" className="font-bold text-brand-primary hover:underline">
                        Create an account
                    </a>
                </p>
            </div>

            {/* Footer Branding */}
            <div className="absolute bottom-8 flex flex-col items-center">
                <div className="mb-5 flex h-8 w-auto items-center justify-center opacity-60">
                    <img
                        src={cputIcon}
                        alt="CPUT Logo"
                        className="h-full w-auto object-contain"
                    />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    © 2026 Campus Connect. All rights reserved.
                </p>
            </div>

            {/* Floating Notification Toast */}
            <div className="fixed bottom-6 right-6 hidden md:flex items-center gap-4 rounded-xl bg-card p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-l-4 border-brand-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF2E8]">
                    <Megaphone className="h-5 w-5 text-brand-accent" />
                </div>
                <div>
                    <p className="text-sm font-bold text-brand-primary">Career Fair 2026</p>
                    <p className="text-xs text-muted">Registration closes in 2 days</p>
                </div>
            </div>

        </div>
    );
}