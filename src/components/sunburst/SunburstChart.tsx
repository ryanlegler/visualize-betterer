"use client";
import React, { MutableRefObject, useCallback, useMemo, useState } from "react";
import { Sunburst, Hint, SunburstPoint } from "react-vis";
import { useMeasure } from "react-use";
import { FileContents } from "../Wrapper";
import { AutoStack } from "autostack-ui";
import { css } from "autostack-ui/styled-system/css";
import { FADED_ALPHA, FADED_ZEBRA_ALPHA, MAX_FILES, MAX_TESTS } from "./constants";
import { usePreparedFileContents } from "./hooks/usePreparedFileContents";
import { useResolvedData } from "./hooks/useResolvedData";
import { scaleLinear } from "d3-scale";

export function SunburstChart({ fileContents }: { fileContents: FileContents }) {
    const colorsScale: string[] = useMemo(() => {
        const maxItems = Math.min(MAX_TESTS, fileContents.length);
        const start = "#e4f700";
        const stop = "#ea3402";
        const range = new Array(maxItems).fill(0);
        const getColorValue = scaleLinear()
            .domain([0, maxItems - 1])
            .range([start, stop] as any);
        return range.map((_, index) => getColorValue(index) as unknown as string);
    }, [fileContents.length]);

    const [hoveredCell, setHoveredCell] = useState<SunburstPoint>();
    const [ref, { width, height }] = useMeasure();

    const preparedFileContents = usePreparedFileContents(fileContents);
    const resolvedData = useResolvedData(preparedFileContents);

    const handleHoveredCellOver = useCallback((cell: SunburstPoint) => {
        if (cell.x && cell.y && cell.depth > 0) {
            if (cell.depth === 1) {
                setHoveredCell({
                    ...cell,
                    bigness: cell.children?.reduce((acc, curr) => acc + curr.bigness, 0),
                });
            } else {
                setHoveredCell(cell);
            }
        }
    }, []);
    const handleHoveredCellOut = useCallback(() => {
        setHoveredCell(undefined);
    }, []);

    const getZebraColor = useCallback((index: number, current: number) => {
        return index % 2 === 0 ? current : current - FADED_ZEBRA_ALPHA;
    }, []);

    const getAlpha = useCallback(
        ({ cell, hoveredCell }: { cell: SunburstPoint; hoveredCell?: SunburstPoint }) => {
            const index = cell.root_index;
            const isHoveredRoot = hoveredCell?.root_index === index;
            const rootMatch = !hoveredCell || isHoveredRoot;
            if (cell.depth === 1) {
                return rootMatch ? 1 : FADED_ALPHA;
            } else {
                const cellMatch = hoveredCell?.cell_index === cell.cell_index;
                return !hoveredCell || (rootMatch && cellMatch)
                    ? getZebraColor(cell.cell_index, 1)
                    : getZebraColor(cell.cell_index, FADED_ALPHA);
            }
        },
        [getZebraColor]
    );

    const handleGetColor = useCallback(
        (cell: SunburstPoint) => {
            const colorRGB = colorsScale[cell.root_index];
            const resolvedAlpha = getAlpha({ cell, hoveredCell });
            return colorRGB.replace(")", `, ${resolvedAlpha})`);
        },
        [colorsScale, getAlpha, hoveredCell]
    );

    // this is a temp hack to make the chart look better when there is a lot of data
    const highDensity = useMemo(() => {
        return MAX_FILES === -1 || MAX_FILES > 20;
    }, []);

    return (
        <div
            ref={ref as unknown as MutableRefObject<HTMLDivElement>}
            className={css({
                height: "full",
                width: "full",
                "& path": {
                    cursor: "pointer",
                },
                "& path:hover": {
                    // some cool effect here?
                },
            })}
        >
            {resolvedData ? (
                <Sunburst
                    className={highDensity ? "high_density" : ""}
                    data={resolvedData as any}
                    onValueMouseOver={handleHoveredCellOver}
                    onValueMouseOut={handleHoveredCellOut}
                    height={height}
                    width={width}
                    hideRootNode
                    getSize={(d: SunburstPoint) => d.bigness}
                    getColor={handleGetColor}
                >
                    {hoveredCell ? (
                        <Hint
                            value={{ x: 0, y: 0 }}
                            className="animate__in"
                            style={{
                                width: "100%",
                                height: "100%",
                                pointerEvents: "none",
                            }}
                        >
                            <AutoStack
                                vAlign="middle"
                                hAlign="center"
                                direction="vertical"
                                gap="4"
                                className={css({
                                    position: "relative",
                                    height: "1/2",
                                    width: "1/2",
                                    left: "-25%",
                                    top: "-25%",
                                    pointerEvents: "none",
                                })}
                            >
                                <AutoStack direction="vertical" hAlign="center">
                                    <span
                                        className={css({
                                            color: "gray.400",
                                            fontFamily: "mono",
                                            textTransform: "uppercase",
                                            fontSize: "xs",
                                        })}
                                    >
                                        Error Count
                                    </span>
                                    <AutoStack vAlign="middle" hAlign="center" gap="2">
                                        <span
                                            className={css({
                                                color: "gray.400",
                                                fontFamily: "mono",
                                                textTransform: "uppercase",
                                                fontSize: "5xl",
                                            })}
                                        >
                                            ×
                                        </span>
                                        <div
                                            className={css({
                                                fontSize: "7xl",
                                                lineHeight: 0.75,
                                                fontWeight: "bold",
                                            })}
                                        >
                                            {hoveredCell.bigness?.toLocaleString()}
                                        </div>
                                    </AutoStack>
                                </AutoStack>
                                <div
                                    className={css({
                                        px: "2",
                                        py: "1",
                                        bg: "gray.700",
                                        borderRadius: "md",
                                    })}
                                >
                                    {hoveredCell.name}
                                </div>

                                {hoveredCell.rootName ? (
                                    <div
                                        className={css({
                                            px: "2",
                                            py: "1",
                                            bg: "gray.800",
                                            borderRadius: "md",
                                        })}
                                    >
                                        {hoveredCell.rootName}
                                    </div>
                                ) : null}
                            </AutoStack>
                        </Hint>
                    ) : null}
                </Sunburst>
            ) : null}
        </div>
    );
}
