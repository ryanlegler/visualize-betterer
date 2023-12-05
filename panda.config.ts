import { defineConfig } from "@pandacss/dev";

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./node_modules/autostack-ui/src/components/**/*.tsx", // this ensures that the extraction will work correctly.
    ],
    jsxFramework: "react", // allows for jsx style props -  https://panda-css.com/docs/guides/dynamic-styling#jsx-style-props

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
        extend: {
            tokens: {
                colors: {
                    ["betterer.red"]: { value: "#EA3402" },
                    ["betterer.yellow"]: { value: "#CCC403" },
                    ["betterer.bright.yellow"]: { value: "#E4F700" },
                    // {"Scarlet":"EA3402","Lemon Lime":"E4F700","Citrine":"CCC403","Black":"020000","Lemon Lime 2":"E9FE00"}
                },
            },
        },
    },
    // this ensures that all the properties are extracted for all breakpoints
    staticCss: {
        css: [
            {
                properties: {
                    justifyContent: [
                        "flex-start",
                        "flex-end",
                        "center",
                        "space-between",
                        "space-around",
                        "stretch",
                    ],
                    alignItems: [
                        "flex-start",
                        "flex-end",
                        "center",
                        "space-between",
                        "space-around",
                        "stretch",
                    ],
                    flexDirection: ["row", "column"],
                },
                responsive: true,
            },
        ],
    },

    emitPackage: true, // this puts the styled-system in the node_modules
    outdir: "autostack-ui/styled-system", // this makes sure we use the same styled-system that autostack uses - this prevents multiple instances of the base utilities
});
