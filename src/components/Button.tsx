"use client";

import { useTransition } from "react";

export function Button({ onClick }: any) {
    const [isPending, startTransition] = useTransition();

    const handleClick = async () => {
        startTransition(() => {});
        await onClick();
    };

    return (
        <button disabled={isPending} onClick={handleClick}>
            {isPending ? "Saving.." : "Save User"}
        </button>
    );
}
