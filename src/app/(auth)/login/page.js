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
        debugger;
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const result = await loginUser(formData);
            if(result?.message){
                setMessage(result?.message);
            }else{
                router.push(`/app/dashboard`, "success");
            }
        } catch (error) {
            setMessage('An unexpected error occurred');
        }
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="flex max-h-screen flex-col items-center justify-between p-24">
                <form className="max-w-sm my-5 mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" autoComplete="on" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <small>{message && <div className="text-red-500 mb-4">{message}</div>}</small>
                    <div className="text-right">
                        <Link href="/register">Register?</Link>
                    </div>
                    <div className="text-center mt-3">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}
