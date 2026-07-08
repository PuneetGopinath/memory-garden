import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import eslintReact from "@eslint-react/eslint-plugin";

export default defineConfig(
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "build/**",
            "supabase/functions/**/dist/**",
            "src/client-dist/**",
        ],
    },
    js.configs.recommended,
    eslintReact.configs.recommended,
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
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
            "indent": ["error", 4, { "SwitchCase": 1 }],
            "eol-last": ["warn", "always"],

            "@eslint-react/rules-of-hooks": "error",
            "@eslint-react/exhaustive-deps": "warn",
            "@eslint-react/no-nested-component-definitions": "warn",
            "@eslint-react/globals": "error",
            "@eslint-react/no-missing-key": "error",
            "@eslint-react/no-duplicate-key": "error",
            "@eslint-react/no-unused-state": "warn",
            "@eslint-react/jsx-no-children-prop": "error",
            "@eslint-react/jsx-no-children-prop-with-children": "error",
            "@eslint-react/dom-no-dangerously-set-innerhtml": "error",
            "@eslint-react/naming-convention-context-name": "warn",
        },
    },
);
