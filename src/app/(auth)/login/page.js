"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar";

async function loginUser(formData) {
    const response = await fetch('/api/login', {
        method: 'POST',
        body: formData,
    });
    
    // Ensure the response is valid and parse JSON
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return response.json();
}

export default function LoginForm() {
    const router = useRouter();
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const result = await loginUser(formData);
            if(result?.message){
                setMessage(result?.message);
            } else {
                router.push(`/app/dashboard`, "success");
            }
        } catch (error) {
            setMessage('An unexpected error occurred');
        }
    };

    return (
        <div className="bg-cyan-400 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 lg:p-12">
                <form className="w-full max-w-md bg-white p-8 rounded-xl shadow-md mx-auto" onSubmit={handleSubmit}>
                    <div className="text-3xl md:text-4xl lg:text-5xl text-center mb-8 font-semibold">
                        Login
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" autoComplete="on" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    {message && <div className="text-red-500 mb-4">{message}</div>}
                    <div className="text-right mb-4">
                        <Link href="/register" className="text-blue-600 hover:underline">Register?</Link>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
