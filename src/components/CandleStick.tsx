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

    interface modeState {
        mode: string;
    }

    interface RootState {
        mode: modeState;
        data: {
            data: any[];
            status: string;
        };
    }

    const { mode } = useSelector((state: RootState) => state.mode || { mode: "light" });
    const { data, status } = useSelector((state: RootState) => state.data);

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

        let stockData: DataPoint[] = convertToDataPoints(data);
        stockData = stockData.slice(-50);
        if (!stockData || !chartRef.current) return;

        const width = 1950;
        const height = 700;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const barHeight = 100;

        d3.select(chartRef.current).selectAll("*").remove();

        const svg = d3.select(chartRef.current)
            .attr("width", width)
            .attr("height", height + barHeight)
            .attr("viewBox", [0, 0, width, height + barHeight])
            .style("max-width", "100%")
            .style("height", "auto");

        const g = svg.append("g");

        // Initial x and y scales
        const x = d3.scaleUtc()
            .domain(d3.extent(stockData, (d) => d.date) as [Date, Date])
            .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
            .domain([d3.min(stockData, (d) => d.low) as number, d3.max(stockData, (d) => d.high) as number])
            .range([height - margin.bottom, margin.top]);

        const yVolume = d3.scaleLinear()
            .domain([0, d3.max(stockData, (d) => d.volume) as number])
            .range([height - margin.bottom, height - barHeight]);

        //Create the x and y axes ONCE
        const xAxis = g.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`);

        const yAxis = g.append("g")
            .attr("transform", `translate(${margin.left},0)`);

        //Function to update the axes
        const updateAxes = () => {
            xAxis.call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
            yAxis.call(d3.axisLeft(y).ticks(height / 40));

            //Style axis lines AFTER creation
            xAxis.select(".domain").attr("stroke", mode === "dark" ? "white" : "black");
            yAxis.select(".domain").attr("stroke", mode === "dark" ? "white" : "black");

            xAxis.selectAll("text")
                .style("fill", mode === "dark" ? "white" : "black")
                .style("font-size", "12px");

            yAxis.selectAll("text")
                .style("fill", mode === "dark" ? "white" : "black")
                .style("font-size", "12px");
        };

        const drawChart = () => {
            // Clear only candles and volume bars — NOT axes
            g.selectAll(".candle").remove();
            g.selectAll(".volume").remove();
            g.selectAll(".data-label").remove();

            const visibleData = stockData.filter(d =>
                d.date >= x.domain()[0] && d.date <= x.domain()[1]
            );

            const barWidth = Math.max(5, (width - margin.left - margin.right) / visibleData.length * 0.65);

            // Draw volume bars
            g.append("g")
                .selectAll("rect")
                .data(visibleData)
                .join("rect")
                .attr("class", "volume")
                .attr("x", (d) => x(d.date) - barWidth / 2)
                .attr("y", (d) => yVolume(d.volume))
                .attr("width", barWidth)
                .attr("height", (d) => yVolume(0) - yVolume(d.volume))
                .attr("fill", (d) => (d.close >= d.open ? "#4caf50" : "#f44336"));

            // Candle group
            const candle = g.append("g")
                .selectAll("g")
                .data(visibleData)
                .join("g")
                .attr("class", "candle")
                .attr("transform", (d) => `translate(${x(d.date)},0)`);

            // Candle wicks
            candle.append("line")
                .attr("y1", (d) => y(d.low))
                .attr("y2", (d) => y(d.high))
                .attr("stroke", mode === "dark" ? "white" : "black");

            // Candle bodies
            candle.append("rect")
                .attr("y", (d) => y(Math.max(d.open, d.close)))
                .attr("height", (d) => Math.abs(y(d.open) - y(d.close)))
                .attr("width", barWidth)
                .attr("x", -barWidth / 2)
                .attr("fill", (d) => (d.open > d.close ? "#e63946" : "#2a9d8f"));

            // High/low data labels
            candle.append("text")
                .attr("x", 0)
                .attr("y", (d) => y(d.high) - 5)
                .text(d => d.high.toFixed(2))
                .attr("class", "data-label")
                .attr("fill", mode === "dark" ? "white" : "black")
                .style("font-size", "12px");

            candle.append("text")
                .attr("x", 0)
                .attr("y", (d) => y(d.low) + 15)
                .text(d => d.low.toFixed(2))
                .attr("class", "data-label")
                .attr("fill", mode === "dark" ? "white" : "black")
                .style("font-size", "12px");
        };

        //Initial draw
        updateAxes();
        drawChart();

        //On zoom, update the domain and redraw
        svg.on("wheel", (event) => {
            event.preventDefault();

            const { deltaY } = event;
            const direction = deltaY > 0 ? 1.1 : 0.9;

            const [xStart, xEnd] = x.domain();
            const newXDomain = [
                new Date(xEnd.getTime() - (xEnd.getTime() - xStart.getTime()) * direction),
                xEnd,
            ];

            if (newXDomain[0] < stockData[0].date) newXDomain[0] = stockData[0].date;

            x.domain(newXDomain);

            const visibleData = stockData.filter(
                (d) => d.date >= newXDomain[0] && d.date <= newXDomain[1]
            );

            if (visibleData.length > 0) {
                const yMin = d3.min(visibleData, (d) => d.low)!;
                const yMax = d3.max(visibleData, (d) => d.high)!;

                const padding = (yMax - yMin) * 0.2;
                y.domain([yMin - padding, yMax + padding]);
            }

            updateAxes(); //Update axes without clearing them
            drawChart();  //Redraw chart without deleting axes
        });

    }, [data, mode]);



    return (
        <Box display="flex" justifyContent="center" alignItems="center">
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
