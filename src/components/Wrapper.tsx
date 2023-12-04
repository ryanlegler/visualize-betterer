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
    const [localContents, setValue, onClear] = useLocalStorage("betterer", "");
    const [fileContents, setFileContents] = useState<FileContents>();

    useEffect(() => {
        setFileContents(localContents);
    }, [localContents]);

    const onSave = useCallback(() => {
        setValue(fileContents);
    }, [setValue, fileContents]);

    const handleFileContents = useCallback((contents: FileContents) => {
        setFileContents(contents);
    }, []);

    const clearFileContents = useCallback(() => {
        setFileContents(undefined);
    }, []);

    const fetchData = useCallback(async () => {
        console.log("fetchData");
        const data = await fetch(`/api/demoData`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("data", data);
        if (data.status === 200) {
            const result = await data.json();
            setFileContents(result);
        }
    }, []);

    const loadDemoContents = useCallback(() => {
        fetchData();
    }, [fetchData]);

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
                                bg: "red.900",
                                borderRadius: "md",
                                _hover: { bg: "red.700" },
                                cursor: "pointer",
                            })}
                            onClick={clearFileContents}
                        >
                            Clear
                        </button>

                        {localContents ? (
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
                        ) : null}

                        {!localContents ? (
                            <button
                                className={css({
                                    px: "2",
                                    py: "1",
                                    bg: "blue.500",
                                    borderRadius: "md",
                                    _hover: { bg: "blue.600" },
                                    cursor: "pointer",
                                })}
                                onClick={onSave}
                            >
                                Save to Local Storage
                            </button>
                        ) : null}
                    </AutoStack>
                </>
            ) : (
                <>
                    <AutoStack hAlign="right" className={css({ p: 3 })}>
                        <button
                            className={css({
                                px: "2",
                                py: "1",
                                bg: "green.500",
                                borderRadius: "md",
                                _hover: { bg: "green.600" },
                                cursor: "pointer",
                            })}
                            onClick={loadDemoContents}
                        >
                            Load Demo Data
                        </button>
                    </AutoStack>
                    <DropZone onFileContents={handleFileContents} />
                </>
            )}
        </div>
    );
}
