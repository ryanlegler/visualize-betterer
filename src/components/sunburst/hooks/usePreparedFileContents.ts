import { useMemo } from "react";
import { MAX_FILES, MAX_TESTS } from "../constants";
import { FileContents } from "@/components/Wrapper";

export function usePreparedFileContents(fileContents: FileContents) {
    return useMemo(() => {
        return fileContents
            ?.sort((a, b) => {
                return (
                    b.files.slice(0, MAX_FILES).reduce((acc, curr) => acc + curr.errors, 0) -
                    a.files.slice(0, MAX_FILES).reduce((acc, curr) => acc + curr.errors, 0)
                );
            })
            ?.slice(0, MAX_TESTS)
            ?.map((test) => {
                return {
                    ...test,
                    files: test.files.sort((a, b) => b.errors - a.errors).slice(0, MAX_FILES),
                };
            });
    }, [fileContents]);
}
