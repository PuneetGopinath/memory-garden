/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState } from "react";

import PasswordValidation from "../../components/auth/PasswordValidation";

import supabase from "../../utils/supabase";

export default function NewPassword() {
    const [touched, setTouched] = useState(false);
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const setPwdValid = () => {};

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8">
            <div className="flex flex-col gap-2 mb-6 text-center">
                <h1 className="text-2xl font-bold">Create New Password</h1>
                <p className="text-sm text-zinc-400">
                    Enter your new password below. Make sure that you haven't used this password before.
                </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label>
                    <span>New Password: <span className="text-red-500">*</span></span>
                    <input
                    />
                </label>

                <label>
                    <span>Confirm Password: <span className="text-red-500">*</span></span>
                    <input
                    />
                </label>

                {touched && <PasswordValidation pwd={pwd} onValidityChange={setPwdValid} />}
            </form>
        </div>
    );
};