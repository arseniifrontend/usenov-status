import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        react(),
        dts({
        insertTypesEntry: true,
        }),
    ],

    build: {
        lib: {
            entry: "src/index.ts",
            name: "UsenovStatusWidget",
            fileName: "status-widget",
            formats: ["es", "umd"],
        },

        rollupOptions: {
        external: [
            "react",
            "react-dom",
            "react-dom/client",
            "react/jsx-runtime",
        ],

        output: {
            globals: {
                react: "React",
                "react-dom": "ReactDOM",
                "react-dom/client": "ReactDOM",
                "react/jsx-runtime": "jsxRuntime",
            },
        },
        },
    },
});