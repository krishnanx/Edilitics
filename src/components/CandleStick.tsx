import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import Loader from "./Loader";


interface DataPoint {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

const CandlestickBarChart: React.FC = () => {
    const chartRef = useRef<SVGSVGElement>(null);


    interface dataState {
        data: [];
        status: string;
    }

    interface RootState {
        data: dataState;
    }

    const { data, status } = useSelector(
        (state: RootState) => state.data
    ) as dataState;



    useEffect(() => {
        const convertToDataPoints = (data: any[]): DataPoint[] => {
            return data.map((entry) => ({
                date: new Date(entry.Date),
                open: entry.Open,
                high: entry.High,
                low: entry.Low,
                close: entry.Close,
                volume: entry.Volume,
            }));
        };

        const stockData: DataPoint[] = convertToDataPoints(data);
        if (!stockData || !chartRef.current) return;
        const latest30Days = stockData.slice(-30);
        const width = 928;
        const height = 500;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const barHeight = 100;

        d3.select(chartRef.current).selectAll("*").remove();

        const svg = d3.select(chartRef.current)
            .attr("width", width)
            .attr("height", height + barHeight)
            .attr("viewBox", [0, 0, width, height + barHeight])
            .style("max-width", "100%")
            .style("height", "auto");

        const x = d3.scaleUtc(
            d3.extent(latest30Days, (d) => d.date) as [Date, Date],
            [margin.left, width - margin.right]
        );

        const y = d3.scaleLinear(
            [d3.min(latest30Days, (d) => d.low) as number, d3.max(latest30Days, (d) => d.high) as number],
            [height - margin.bottom, margin.top]
        );

        const yVolume = d3.scaleLinear(
            [0, d3.max(latest30Days, (d) => d.volume) as number],
            [height + barHeight - 20, height]
        );

        const xAxis = svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
        xAxis.selectAll("text")
            .style("fill", "black")
            .style("font-size", "12px");
        const yAxis = svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(height / 40));
        yAxis.selectAll("text")
            .style("fill", "black")
            .style("font-size", "12px");
        const candle = svg.append("g")
            .selectAll("g")
            .data(latest30Days)
            .join("g")
            .attr("transform", (d) => `translate(${x(d.date)},0)`);

        candle.append("line")
            .attr("y1", (d) => y(d.low))
            .attr("y2", (d) => y(d.high))
            .attr("stroke", "black");

        candle.append("rect")
            .attr("y", (d) => y(Math.max(d.open, d.close)))
            .attr("height", (d) => Math.abs(y(d.open) - y(d.close)))
            .attr("width", 5)
            .attr("fill", (d) => (d.open > d.close ? "#e63946" : "#2a9d8f"));

        svg.append("g")
            .selectAll("rect")
            .data(latest30Days)
            .join("rect")
            .attr("x", (d) => x(d.date) - 2.5)
            .attr("y", (d) => yVolume(d.volume))
            .attr("width", 5)
            .attr("height", (d) => height + barHeight - yVolume(d.volume) - 20)
            .attr("fill", "#a8dadc")

        svg.selectAll(".domain")
            .style("stroke", "black")
            .style("stroke-width", "1px");
    }, [data]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            {status === "loading" ? (
                <Box w="928px" display="flex" justifyContent="center" alignItems="center">
                    <Loader />
                </Box>
            ) : (
                <svg ref={chartRef}></svg>
            )}
        </Box>
    );
};

export default CandlestickBarChart;
