"use client";
import React, { useCallback, useEffect, useState } from "react";
import { DropZone } from "./DropZone";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AutoStack } from "autostack-ui";
import { css } from "autostack-ui/styled-system/css";
import { SunburstChart } from "./sunburst";

export type FileContents = {
    timestamp: number;
    testName: string;
    delta: {
        baseline: number | null;
        result: number;
        diff: number;
    };
    files: {
        name: string;
        errors: number;
    }[];
}[];

export function Wrapper() {
    const [value, setValue, onClear] = useLocalStorage("betterer", "");
    const [fileContents, setFileContents] = useState<FileContents>();

    useEffect(() => {
        setFileContents(value);
    }, [value]);

    const handleFileContents = useCallback(
        (contents: FileContents) => {
            setFileContents(contents);
            setValue(contents);
        },
        [setValue]
    );
    const clearFileContents = useCallback(() => {
        setFileContents(undefined);
    }, []);
    return (
        <div style={{ height: "100%" }}>
            {fileContents ? (
                <>
                    <SunburstChart fileContents={fileContents} />

                    <AutoStack
                        gap="3"
                        p="3"
                        className={css({ position: "absolute", top: "0", right: "0" })}
                    >
                        <button
                            className={css({
                                px: "2",
                                py: "1",
                                bg: "blue.500",
                                borderRadius: "md",
                                _hover: { bg: "blue.600" },
                                cursor: "pointer",
                            })}
                            onClick={clearFileContents}
                        >
                            Clear
                        </button>

                        <button
                            className={css({
                                px: "2",
                                py: "1",
                                bg: "red.500",
                                borderRadius: "md",
                                _hover: { bg: "red.600" },
                                cursor: "pointer",
                            })}
                            onClick={onClear}
                        >
                            Reset Local Storage
                        </button>
                    </AutoStack>
                </>
            ) : (
                <DropZone onFileContents={handleFileContents} />
            )}
        </div>
    );
}
