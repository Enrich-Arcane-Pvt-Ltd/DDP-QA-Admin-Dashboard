/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#e6f0f4",
                    200: "#c0dbe3",
                    300: "#99c6d3",
                    400: "#73b1c2",
                    500: "#4daeb2",
                    600: "#26899b",
                    700: "#055e70",
                    800: "#022b3a", // original primary
                    900: "#011921",
                },
                accent: {
                    100: "#d4f0f4",
                    200: "#a9e0e8",
                    300: "#7dd1dd",
                    400: "#52c1d1",
                    500: "#27b2c6",
                    600: "#1f7a8c", // original accent
                    700: "#17555f",
                    800: "#0f3032",
                    900: "#061616",
                },
                light: {
                    100: "#f0f7fd",
                    200: "#dcebf9",
                    300: "#c8dff4",
                    400: "#b4d3f0",
                    500: "#a0c7eb",
                    600: "#8cbbed",
                    700: "#bfdbf7", // original light
                    800: "#7aaed7",
                    900: "#4d82b0",
                },
                error: {
                    100: "#fce8ed",
                    200: "#f9c2d2",
                    300: "#f59bb8",
                    400: "#f0759d",
                    500: "#ed4e83",
                    600: "#e82769",
                    700: "#c01f53",
                    800: "#840032", // original error
                    900: "#5a0023",
                },
            },
        },
    },
    plugins: [],
};
