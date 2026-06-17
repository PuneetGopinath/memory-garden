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
    const [pwdValid, setPwdValid] = useState(false);

    const same = pwd === confirmPwd && pwd.length > 0;

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
                <label className="flex flex-col gap-1">
                    <span>New Password: <span className="text-red-500">*</span></span>
                    <input
                        type="password"
                        className={`rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none${pwdValid ? " focus:border-emerald-500/40" : " focus:border-red-500/50"}`}
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setTouched(true)}
                    />
                </label>

                <label className="flex flex-col gap-1">
                    <span>Confirm Password: <span className="text-red-500">*</span></span>
                    <input
                        type="password"
                        className={`rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none${same && touched ? " focus:border-emerald-500/40" : " focus:border-red-500/50"}`}
                        value={confirmPwd}
                        onChange={(e) => setConfirmPwd(e.target.value)}
                    />
                </label>

                {!same && confirmPwd.length > 0 && <p className="text-xs text-red-500 p-2 bg-zinc-900 font-medium rounded-lg hover:bg-zinc-700 transition-colors duration-200">Passwords do not match.</p>}
                {same && confirmPwd.length > 0 && <p className="text-xs text-emerald-500 p-2 bg-zinc-900 font-medium rounded-lg hover:bg-zinc-700 transition-colors duration-200">Passwords match.</p>}

                {touched && <PasswordValidation pwd={pwd} onValidityChange={setPwdValid} />}

                <button
                    type="submit"
                    className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-medium py-2 transition-colors duration-200 disabled:bg-emerald-500/50 disabled:hover:bg-emerald-400/50 disabled:cursor-not-allowed"
                    disabled={!same || !pwdValid}
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};