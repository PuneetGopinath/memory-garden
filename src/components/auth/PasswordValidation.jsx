/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

const colors = {
    right: "text-emerald-500",
    wrong: "text-red-500"
};

export default function PasswordValidation({ pwd }) {
    const eight = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);

    return (
        <div className="text-xs p-2">
            <ul className="list-disc list-inside">
                <li className={`${eight ? colors.right : colors.wrong}`}>At least 8 characters</li>
                <li className={`${hasUpper ? colors.right : colors.wrong}`}>Uppercase letter</li>
                <li className={`${hasLower ? colors.right : colors.wrong}`}>Lowercase letter</li>
                <li className={`${hasNumber ? colors.right : colors.wrong}`}>Number</li>
                <li className={`${hasSpecial ? colors.right : colors.wrong}`}>Special character</li>
            </ul>
        </div>
    );
};