"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");
    const [resetDone, setResetDone] = useState(false);
    const [error, setError] = useState("");

    const resetPassword = async (e: any) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) {
            setError("Password can't be empty");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords doesn't match");
            return;
        }
        try {
            await axios.post("/api/users/resetpassword", { newPassword, token });
            setResetDone(true);
        } catch (error: any) {
            console.log(error);
            setError(error.message);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [token]);

    return (
        <div className="flex flex-col bg-gray-600 items-center justify-center min-h-screen py-2">
            {error && (
                <div className="flex justify-center">
                    <h3 className="text-xl text-red m-3 p-3">{error}</h3>
                </div>
            )}
            {resetDone ? (
                <div className="flex justify-center flex-col">
                    <div className="flex flex-col justify-center border border-white rounded-lg p-2">
                        <p className=" text-2xl m-2">Hurray, password reset successfull</p>
                        <button className="w-[200px] ml-[25%] p-2 m-1 border hover:bg-white hover:text-black border-gray-300 transition-colors duration-200 ease-in-out rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                            <Link href="/login">Login Now</Link>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-evenly w-[400px] border border-white p-6 rounded-2xl">
                    <form
                        className="flex flex-col justify-evenly"
                        onSubmit={resetPassword}
                    >
                        <div className="flex flex-col justify-evenly ">
                            <label htmlFor={newPassword}>New Passord:</label>
                            <input
                                type="password"
                                placeholder="New Password"
                                className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col justify-evenly ">
                            <label htmlFor={confirmPassword}>Confirm New Password</label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="p-2 m-1 border hover:bg-white transition-colors duration-200 ease-in-out hover:text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ResetPasswordPage;