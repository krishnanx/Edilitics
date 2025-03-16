
import LineGraph from '../components/LineGraph'
"use client"
import { Box, createListCollection, Text, Button, Heading } from '@chakra-ui/react'

import { Fullscreen, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from 'react-redux'
import { addCompany } from '../store/CompanySlice'
import { getData } from '../store/DataSlice'
import { useNavigate } from 'react-router-dom';

import { useRef, useState } from 'react';
//import { addCompany } from '../store/CompanySlice'
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [select, setSelect] = useState("A");
    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };


    // interface CompanyState {
    //     data: string[]; // or whatever type `data` holds
    // }

    // interface RootState {
    //     company: CompanyState;
    // }
    interface DataPoint {
        Date: string;  // match your backend data
        Open: number;
        High: number;
        Low: number;
        Close: number;
        "Adj Close": number;
        Volume: number;
        company: string;
    }
    interface dataState {
        data: DataPoint[]; // or whatever type `data` holds
        status: string
    }

    interface State {
        data: dataState;
    }
    const { data, status } = useSelector(
        (state: State) => state.data
    ) as dataState;
    interface TipData {
        open: number;
        close: number;
        high: number;
        low: number;
        volume: number;
        date: String;
    }

    interface TipState {
        tip: TipData;
    }

    // Define the whole Redux store's root state
    interface RootState {
        tip: TipState;
    }
    const { tip } = useSelector((state: RootState) => state.tip);
    interface modeState {
        mode: string; // or whatever type `data` holds

    }

    interface RootState {
        mode: modeState;
    }
    const { mode } = useSelector(
        (state: RootState) => state.mode || { mode: "light" }
    ) as modeState;
    // const { data: value } = useSelector((state: RootState) => state.company);
    // type SelectChangeEvent = {
    //     value: string;
    //     label: string;
    // };

    const handlePush = async (e: any) => {
        setSelect(e.value)
        console.log("Selected:", e.value);
        dispatch(addCompany(e.value));
        dispatch(getData({ company: e.value }));
    };
    // if (status == 'loading') {
    //     return <Loader />
    // }
    const HeadingStyle = {
        color: mode === "dark" ? "white" : "black",
        display: "flex", alignItems: "center"
    }
    const [isHovered, setIsHovered] = useState(false);
    const [Hovered, setHovered] = useState("");
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="100%"
            h="100vh"
            flexDirection="column"
            bgColor={mode == "dark" ? "rgba(12, 12, 12,0.9)" : "white"}

        >

            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
                w="100%"
                h="100%"
            >
                <Box
                    w="20%"
                    h="700px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    pl="20px"

                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        h="100px"
                    >
                        <Heading
                            style={{ ...HeadingStyle, fontSize: "2.5rem", height: "50px", justifyContent: "center" }}
                        >
                            {
                                // Ensure tip.date is a valid string and format it to show month, day, and year
                                tip.date ? `${new Date(String(tip.date)).toLocaleString('default', { month: 'short' })} ${new Date(String(tip.date)).getDate()}  ${new Date(String(tip.date)).getFullYear()}` :
                                    `${new Date(String(data[data.length - 1]?.Date)).toLocaleString('default', { month: 'short' })} ${new Date(String(data[data.length - 1]?.Date)).getDate()}  ${new Date(String(data[data.length - 1]?.Date)).getFullYear()}`
                            }
                        </Heading>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        h="100px"
                    >
                        <Heading
                            style={{ ...HeadingStyle, fontSize: "2.5rem", height: "50px", }}
                        >
                            Close:
                        </Heading>
                        <Heading
                            style={{ ...HeadingStyle, justifyContent: "flex-end", fontSize: "2.5rem", height: "50px" }}
                        >
                            $ {tip.close ? tip.close?.toFixed(2) : data[data.length - 1]?.Close?.toFixed(2)}
                        </Heading>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"

                    >
                        <Heading
                            style={{ ...HeadingStyle, fontSize: "2.5rem", height: "50px" }}
                        >
                            Open:
                        </Heading>
                        <Heading
                            style={{ ...HeadingStyle, justifyContent: "flex-end", fontSize: "2.5rem", height: "50px" }}
                        >
                            $  {tip.open ? tip.open.toFixed(2) : data[data.length - 1]?.Open.toFixed(2)}
                        </Heading>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"

                    >
                        <Heading
                            style={{ ...HeadingStyle, fontSize: "2.5rem", height: "50px", }}
                        >
                            High:
                        </Heading>
                        <Heading
                            style={{ ...HeadingStyle, justifyContent: "flex-end", fontSize: "2.5rem", height: "50px" }}
                        >
                            $  {tip.high ? tip.high.toFixed(2) : data[data.length - 1]?.High?.toFixed(2)}
                        </Heading>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"

                        h="100px"
                    >
                        <Heading
                            style={{ ...HeadingStyle, fontSize: "2.5rem", height: "50px", }}
                        >
                            Low:
                        </Heading>
                        <Heading
                            style={{ ...HeadingStyle, justifyContent: "flex-end", fontSize: "2.5rem", height: "50px" }}
                        >
                            $   {tip.low ? tip.low.toFixed(2) : data[data.length - 1]?.Low?.toFixed(2)}
                        </Heading>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"

                    >
                        <Heading
                            style={{ ...HeadingStyle, fontSize: "2.5rem", height: "50px", }}
                        >
                            Volume:
                        </Heading>
                        <Heading
                            style={{ ...HeadingStyle, justifyContent: "flex-end", fontSize: "2.5rem", height: "50px" }}
                        >
                            {tip.volume ? tip.volume.toFixed(2) : data[data.length - 1]?.Volume.toFixed(2)}
                        </Heading>
                    </Box>
                </Box>
                <Box
                    w="70%"
                    h="800px"
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-end"
                    flexDirection="column"

                >
                    <Box
                        position="relative"
                        width="65vw" maxW="2000px" h="100px"
                        display="flex"
                        justifyContent="flex-end" alignItems="flex-end" overflowX={'scroll'} overflowY='hidden'
                        css={{
                            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
                            "-ms-overflow-style": "none",
                            "scrollbar-width": "none",
                            scrollSnapType: "x mandatory", // Snap support
                        }}
                        pl="60px"
                        pr="60px"

                    >
                        {/* Left Scroll Button */}
                        <Button

                            aria-label="Scroll Left"
                            position="absolute"
                            left="15px"
                            top="45%"
                            transform="translateY(-50%)"
                            zIndex={10}
                            onClick={() => scroll("left")}
                            bg="gray.200"
                            _hover={{ bg: "gray.300" }}
                            rounded="full"

                        >
                            <ArrowBackIos />
                        </Button>
                        {/* Scrollable Content */}
                        <Box
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            // pl="160px"
                            h="100px"
                            ref={scrollRef}
                            gap={10}
                            overflowX="auto" // Ensure scroll works
                            scrollBehavior="smooth"
                            whiteSpace="nowrap"
                            width={'auto'}

                            css={{
                                "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
                                "-ms-overflow-style": "none",
                                "scrollbar-width": "none",
                                scrollSnapType: "x mandatory", // Snap support
                            }}
                        >
                            {items.map((item) => (
                                <Button
                                    key={item.value}
                                    minW="180px"
                                    p={4}
                                    bgColor={select === item.value ? "#F2F2F2" : "transparent"}
                                    rounded="xl"
                                    onClick={() => handlePush(item)}
                                    textAlign="center"
                                    h="80px"
                                    onMouseEnter={() => { setIsHovered(true), setHovered(item.value) }}
                                    onMouseLeave={() => { setIsHovered(false), setHovered("") }}
                                    _hover={{
                                        bgColor: "#F2F2F2",

                                    }}
                                    role="group"
                                    _active={{ bgColor: "#F2F2F2" }}
                                >
                                    <Text fontSize="lg" fontWeight="bold" color={select === item.value ? "black" : Hovered === item.value ? "black" : mode === "dark" ? "white" : "black"}
                                        // Change color when the parent (group) is hovered
                                        as="span"

                                    >
                                        {item.label}
                                    </Text>
                                    <Text color="green.500" fontWeight="semibold">
                                        {item.value}
                                    </Text>
                                </Button>
                            ))}
                        </Box>

                        {/* Right Scroll Button */}
                        <Button
                            aria-label="Scroll Right"
                            position="absolute"
                            right="5px"
                            top="45%"
                            transform="translateY(-50%)"
                            zIndex={10}
                            onClick={() => scroll("right")}
                            bg="gray.200"
                            _hover={{ bg: "gray.300" }}
                            rounded="full"
                        >
                            <ArrowForwardIos />
                        </Button>
                    </Box>
                    <Box
                        display="flex"
                        w="65vw"
                        h="700px"
                        mt="20px"
                    >
                        <LineGraph />
                        <Button
                            w="1vw"
                            h="5vh"
                            onClick={() => { navigate("/chartFull") }}
                            borderWidth="1px"
                            borderColor={mode !== "dark" ? "rgba(0,0,0,0.35)" : "rgba(255,255 ,255,0.35)"}
                            p="0"
                            borderRadius="5px"
                            bgColor={mode == "dark" ? "rgba(12, 12, 12,0.9)" : "white"}
                        >
                            <Fullscreen sx={{ fontSize: "40px", color: mode !== "dark" ? "rgba(12, 12, 12,0.9)" : "white" }} />
                        </Button>
                    </Box>
                </Box>

            </Box>

        </Box >
    )
}

export default Home
const frameworks = createListCollection({
    items: [
        { label: "Agilent Technologies", value: "A" },
        { label: "Apple Inc", value: "AAPL" },
        { label: "Adobe Inc", value: "ADBE" },
        { label: "JPMorgan Chase ", value: "AMJ" },
    ],
})
const items =
    [
        { label: "Agilent Technologies", value: "A" },
        { label: "Apple Inc", value: "AAPL" },
        { label: "Adobe Inc", value: "ADBE" },
        { label: "JPMorgan Chase ", value: "AMJ" },
        { label: "Microsoft  ", value: "MSFT" },
        { label: "Monster Beverage", value: "MNST" },
        { label: "Cloudflare Inc.", value: "NET" },
        { label: "Netflix Inc", value: "NFLX" },
        // { label: "JPMorgan Chase ", value: "AMJ" },
        // { label: "Microsoft  ", value: "MSFT" },


    ]
