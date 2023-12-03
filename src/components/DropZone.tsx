"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { css } from "autostack-ui/styled-system/css";
import { AutoStack } from "autostack-ui";

export function DropZone({ onFileContents }: { onFileContents: (contents: any) => void }) {
    const onDrop = useCallback(
        (acceptedFiles: any) => {
            const reader = new FileReader();
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                const arrayBuffer = reader.result;
                const decoder = new TextDecoder("utf-8");
                const text = decoder.decode(new Uint8Array(arrayBuffer as ArrayBuffer));
                try {
                    const parsedData = JSON.parse(text);
                    onFileContents(parsedData);
                } catch (e) {
                    console.log("ERROR", e);
                }
            };
            reader.readAsArrayBuffer(acceptedFiles?.[0]);
        },
        [onFileContents]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className={css({ height: "full", p: 10 })}>
            <AutoStack
                direction="vertical"
                hAlign="center"
                vAlign="middle"
                className={css({
                    h: "full",
                    border: "10px dashed",
                    borderColor: "yellow.400",
                    fontSize: "2xl",
                    color: "gray.500",
                    pointerEvents: "none",
                })}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p
                        className={css({
                            color: "white",
                            fontWeight: "bold",
                        })}
                    >
                        ✅ Drop Away!
                    </p>
                ) : (
                    <p>
                        Drag your{" "}
                        <span
                            className={css({
                                px: "2",
                                py: "1",
                                bg: "yellow.400",
                                borderRadius: "md",
                                color: "black",
                                fontWeight: "bold",
                            })}
                        >
                            betterer.report.json
                        </span>{" "}
                        file here
                    </p>
                )}
            </AutoStack>
        </div>
    );
}
