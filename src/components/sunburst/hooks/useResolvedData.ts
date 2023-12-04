import { FileContents } from "@/components/Wrapper";
import { useMemo } from "react";
import { Datum } from "../types";

export function useResolvedData(preparedFileContents: FileContents) {
    return useMemo(() => {
        return (
            preparedFileContents && {
                title: "root",
                children: preparedFileContents.map((test, index) => {
                    return {
                        name: test.testName,
                        title: test.testName,
                        root_index: index,
                        delta: test.delta,
                        // bigness: test.files.length,
                        // bigness: test.files.reduce((acc, curr) => acc + curr.errors, 0) * 0.01,
                        sortSize: test.files.reduce((acc, curr) => acc + curr.errors, 0),

                        className: "root",
                        children: test.files.map((file, fileIndex) => {
                            return {
                                name: file.name,
                                bigness: file.errors,
                                root_index: index,
                                rootName: test.testName,
                                cell_index: fileIndex,
                                className: `segment root_${index} segment_${fileIndex}`,
                            };
                        }),
                    } as Datum;
                }),
            }
        );
    }, [preparedFileContents]);
}
