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
        extend: {},
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
