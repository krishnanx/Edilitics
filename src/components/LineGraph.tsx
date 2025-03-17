import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import Loader from "./Loader";
import { getData } from "../store/DataSlice";
import { AppDispatch } from "../store/store";
import { addTip } from "../store/TooltipSlice";
interface DataPoint {
    date: Date;
    close: number;
    open: number;
    high: number;
    low: number;
    volume: number;
}


const LineChart: React.FC = () => {
    const chartRef = useRef<SVGSVGElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    interface modeState {
        mode: string;

    }

    interface RootState {
        mode: modeState;
    }
    const { mode } = useSelector(
        (state: RootState) => state.mode || { mode: "dark" }
    ) as modeState;
    interface dataState {
        data: [];
        status: string
    }

    interface RootState {
        data: dataState;
    }
    const { data, status } = useSelector(
        (state: RootState) => state.data
    ) as dataState;

    useEffect(() => { dispatch(getData({ company: "A" })); }, [])
    useEffect(() => {

        const convertToDataPoints = (data: any[]): DataPoint[] => {
            return data.map(entry => ({
                date: new Date(entry.Date),
                close: entry.Close,
                open: entry.Open,
                low: entry.Low,
                high: entry.High,
                volume: entry.Volume
            }));
        };

        // Convert the data
        const aapl: DataPoint[] = convertToDataPoints(data);


        if (!aapl || !chartRef.current) return;
        console.log("aapl:", aapl)
        const width = 1200;
        const height = 600;
        const marginTop = 20;
        const marginRight = 30;
        const marginBottom = 30;
        const marginLeft = 40;

        //Remove old svg
        d3.select(chartRef.current).selectAll("*").remove();

        const svg = d3.select(chartRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .style("max-width", "100%")
            .style("height", "auto")
            .style("height", "intrinsic");

        const x = d3.scaleUtc(
            d3.extent(aapl, (d) => d.date) as [Date, Date],
            [marginLeft, width - marginRight]
        );

        const y = d3.scaleLinear(
            [0, d3.max(aapl, (d) => d.close) as number],
            [height - marginBottom, marginTop]
        );

        const line = d3.line<DataPoint>()
            .x((d) => {
                const xVal = x(new Date(d.date));
                return isNaN(xVal!) ? 0 : xVal!;
            })
            .y((d) => {
                const yVal = y(d.close);
                return isNaN(yVal!) ? height - marginBottom : yVal!;
            });

        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x).ticks(width / 100).tickSizeOuter(0))
            .selectAll("text")
            .style("fill", mode === "dark" ? "white" : "black")
            .style("font-size", "20px");

        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).ticks(height / 40))

            .call((g) => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1))
            .call((g) => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 10 + 5)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .text("↑ Daily close ($)"))
            .selectAll("text")
            .style("fill", mode === "dark" ? "white" : "black")
            .style("font-size", "20px");
        svg.selectAll(".domain")
            .style("stroke", mode === "dark" ? "white" : "black")
            .style("stroke-width", "1px");
        const path = svg.append("path")
            .datum(aapl)
            .attr("fill", "none")
            .attr("stroke", mode === "dark" ? "#6A9BC3" : "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);

        // Get total length for stroke animation
        const totalLength = path.node()?.getTotalLength() ?? 0;

        // Initial stroke animation from start to end
        path
            .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background", "white")
            .style("border", "1px solid #ddd")
            .style("padding", "5px")
            .style("border-radius", "5px")
            .style("box-shadow", "0 0 5px rgba(0,0,0,0.3)")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("color", "black")
            .style("font-size", "12px")
            .style("z-index", "10");



        svg.selectAll("circle")
            .data(aapl)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.date))
            .attr("cy", d => y(d.close))
            .attr("r", 5)
            .attr("fill", "transparent")
            .on("mouseover", (event, d) => {
                tooltip
                    .html(`Date: ${d.date.toLocaleDateString()}<br>Close: $${d.close.toFixed(2)}`)
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`)
                    .transition()
                    .duration(200)
                    .style("opacity", 1);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`);
            })
            .on("mouseout", () => {
                tooltip.transition().duration(200).style("opacity", 0);
            })
            .on("click", (_, d) => {

                const dateString = d.date.toLocaleDateString('en-US');
                console.log(dateString)
                const object = {
                    open: d.open,
                    close: d.close,
                    high: d.high,
                    low: d.low,
                    volume: d.volume,
                    date: dateString
                }
                dispatch(addTip(
                    object
                ))
            })

    }, [data, mode]);

    return (
        <Box>
            {status == 'loading' ? (<Box
                w="1200px"
                h="600px"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Loader />
            </Box>
            ) : (<svg ref={chartRef}></svg>)}
        </Box>

    );

};

export default LineChart;
