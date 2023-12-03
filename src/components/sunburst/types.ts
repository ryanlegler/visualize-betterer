export type SunburstData = { children: Data } | undefined;
export type Datum = {
    name: string;
    sortSize: number;
    root_index: number;
    bigness?: number;
    children: {
        name: string;
        rootName: string;
        bigness: number;
        root_index: number;
        cell_index: number;
    }[];
};

export type Data = Datum[];
