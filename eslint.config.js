import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig(
    js.configs.recommended,
    eslintReact.configs.recommended,
    {
        files: ["**/*.{js,jsx}"],
        ignores: [
            "node_modules/**",
            "dist/**",
            "build/**",
            "supabase/functions/**/dist/**"
        ],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            "react-hooks": reactHooks
        },
        rules: {
            "semi": ["error", "always"],
            "quotes": ["error", "double"],
            "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
            "no-console": ["warn", { "allow": ["warn", "error", "info"] }],
            "no-debugger": "error",
            "eqeqeq": ["error", "always"],
            "no-var": "error",
            "prefer-const": "error",
            "no-duplicate-imports": "error",
            "object-shorthand": ["error", "always"],
            "comma-dangle": ["error", "always-multiline"], // Without this, git sees two lines changed when adding a new property
            "no-unreachable": "error",
            "default-case": "warn",

            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            "@eslint-react/no-nested-component-definitions": "warn",
        }
    }
);