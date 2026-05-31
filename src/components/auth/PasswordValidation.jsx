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
    const chars = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/.test(pwd);

    return (
        <div className="text-xs p-2">
            <ul className="list-disc list-inside">
                <li className={`${eight ? colors.right : colors.wrong}`}>Must contain at least 8 characters</li>
                <li className={`${chars ? colors.right : colors.wrong}`}>Must contain at least one uppercase and one lowercase character, one digit and one special character</li>
            </ul>
        </div>
    );
};