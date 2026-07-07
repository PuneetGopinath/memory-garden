/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useEffect } from "react";

const colors = {
    right: "text-emerald-500",
    wrong: "text-red-500",
};

const right = "✓";
const wrong = "✗";

function Rule({ valid, children }) {
    return (
        <li className={`${valid ? colors.right : colors.wrong}`}>
            {valid ? right : wrong} {children}
        </li>
    );
}

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
        <div className="text-xs p-2 rounded bg-zinc-800/50 border border-white/10 hover:border-purple-500/50" aria-live="polite" role="status">
            <ul className="flex flex-col gap-1">
                <span className="text-sm font-semibold mb-1">Password must contain:</span>
                <Rule valid={eight}>At least 8 characters</Rule>
                <Rule valid={hasUpper}>Uppercase letter</Rule>
                <Rule valid={hasLower}>Lowercase letter</Rule>
                <Rule valid={hasNumber}>Number</Rule>
                <Rule valid={hasSpecial}>Special character</Rule>
            </ul>
        </div>
    );
};
