/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

export default function i18n(code) {
    switch (code) {
        case "anonymous_provider_disabled":
            return "Please enter your email and password to sign in.";
        case "email_address_invalid":
            return "The email address you entered is invalid. Please check and try again.";
        case "email_exists":
        case "identity_already_exists":
            return "This email is already in use. Please sign in or use a different email address.";
        case "email_not_confirmed":
            return "Your email address has not been confirmed. Please check your inbox for a confirmation email and follow the instructions to verify your account.";
        case "flow_state_expired":
            return "Your sign-in session has expired. Please try signing in again.";
        case "flow_state_not_found":
            return "We couldn't find your sign-in session. Please try signing in again.";
        case "invalid_credentials":
            return "The email or password you entered is incorrect. Please check and try again.";
        default:
            return code;
    }
};