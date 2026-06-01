/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useEffect } from "react";

const colors = {
    right: "text-emerald-500",
    wrong: "text-red-500"
};

const right = "✓";
const wrong = "✗";

export default function PasswordValidation({ pwd, onValidityChange }) {
    const eight = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);

    const valid = eight && hasUpper && hasLower && hasNumber && hasSpecial;

    useEffect(() => {
        onValidityChange?.(valid);
    }, [valid, onValidityChange]);

    return (
        <div className="text-xs p-2 rounded bg-zinc-800/50 border border-white/10">
            <ul className="flex flex-col gap-1">
                <li className={`${eight ? colors.right : colors.wrong}`}>
                    {eight ? right : wrong} At least 8 characters
                </li>
                <li className={`${hasUpper ? colors.right : colors.wrong}`}>
                    {hasUpper ? right : wrong} Uppercase letter
                    </li>
                <li className={`${hasLower ? colors.right : colors.wrong}`}>
                    {hasLower ? right : wrong} Lowercase letter
                    </li>
                <li className={`${hasNumber ? colors.right : colors.wrong}`}>
                    {hasNumber ? right : wrong} Number
                    </li>
                <li className={`${hasSpecial ? colors.right : colors.wrong}`}>
                    {hasSpecial ? right : wrong} Special character
                    </li>
            </ul>
        </div>
    );
};