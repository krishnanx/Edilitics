
import LineGraph from '../components/LineGraph'
"use client"
import {
    Box, Text, Button, Heading, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import Full from './FullScreen';


import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from 'react-redux'
import { addCompany } from '../store/CompanySlice'
import { getData } from '../store/DataSlice'
import { useNavigate } from 'react-router-dom';

import { useRef, useState } from 'react';
import Loader from '../components/Loader';
//import { addCompany } from '../store/CompanySlice'
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isOpen, onOpen, onClose } = useDisclosure()

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
        fontFamily: '"Roboto", sans-serif',
        color: mode === "dark" ? "white" : "black",
        display: "flex",
        alignItems: "center",
    };

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

                justifyContent="space-around"
                alignItems="center"
                w="100%"
                h="100%"
            >
                {status !== "loading" ?
                    <Box
                        w="100%"
                        h="93vh"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-around"

                        pl="40px"

                    >
                        <Box
                            w="60%"
                            h="60vh"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"


                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                h="100px"
                            >
                                <Heading
                                    sx={{ ...HeadingStyle, fontSize: "2rem", height: "50px", justifyContent: "center" }}
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
                                    sx={{ ...HeadingStyle, fontSize: "2rem", height: "50px", }}

                                >
                                    Close:
                                </Heading>
                                <Heading
                                    sx={{ ...HeadingStyle, justifyContent: "flex-end", fontSize: "2rem", height: "50px" }}
                                >
                                    $ {tip.close ? tip.close?.toFixed(2) : data[data.length - 1]?.Close?.toFixed(2)}
                                </Heading>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="column"

                            >
                                <Heading
                                    sx={{ ...HeadingStyle, fontSize: "2rem", height: "50px" }}
                                >
                                    Open:
                                </Heading>
                                <Heading
                                    sx={{ ...HeadingStyle, justifyContent: "flex-end", fontSize: "2rem", height: "50px" }}
                                >
                                    $  {tip.open ? tip.open.toFixed(2) : data[data.length - 1]?.Open.toFixed(2)}
                                </Heading>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="column"

                            >
                                <Heading
                                    sx={{ ...HeadingStyle, fontSize: "2rem", height: "50px", }}
                                >
                                    High:
                                </Heading>
                                <Heading
                                    sx={{ ...HeadingStyle, justifyContent: "flex-end", fontSize: "2rem", height: "50px" }}
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
                                    sx={{ ...HeadingStyle, fontSize: "2rem", height: "50px", }}
                                >
                                    Low:
                                </Heading>
                                <Heading
                                    sx={{ ...HeadingStyle, justifyContent: "flex-end", fontSize: "2rem", height: "50px" }}
                                >
                                    $   {tip.low ? tip.low.toFixed(2) : data[data.length - 1]?.Low?.toFixed(2)}
                                </Heading>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="column"

                            >
                                <Heading
                                    sx={{ ...HeadingStyle, fontSize: "2rem", height: "50px", }}
                                >
                                    Volume:
                                </Heading>
                                <Heading
                                    sx={{ ...HeadingStyle, justifyContent: "flex-end", fontSize: "2rem", height: "50px" }}
                                >
                                    {tip.volume ? tip.volume.toFixed(2) : data[data.length - 1]?.Volume.toFixed(2)}
                                </Heading>
                            </Box>
                        </Box>
                        <Box
                            w="35vw"
                            h="25vh"
                            display="flex"

                        >
                            <Text
                                sx={{ ...HeadingStyle, fontSize: "1.5rem" }}
                            >
                                On  {

                                    tip.date ? `${new Date(String(tip.date)).toLocaleString('default', { month: 'short' })} ${new Date(String(tip.date)).getDate()}  ${new Date(String(tip.date)).getFullYear()}` :
                                        `${new Date(String(data[data.length - 1]?.Date)).toLocaleString('default', { month: 'short' })} ${new Date(String(data[data.length - 1]?.Date)).getDate()}  ${new Date(String(data[data.length - 1]?.Date)).getFullYear()}`
                                }, the stock opened at
                                $  {tip.open ? tip.open.toFixed(2) : data[data.length - 1]?.Open.toFixed(2)} and closed at $ {tip.close ? tip.close?.toFixed(2) : data[data.length - 1]?.Close?.toFixed(2)}.
                                During the day, it reached a high of
                                $  {tip.high ? tip.high.toFixed(2) : data[data.length - 1]?.High?.toFixed(2)} and dropped to a low of
                                $   {tip.low ? tip.low.toFixed(2) : data[data.length - 1]?.Low?.toFixed(2)}.
                                The total trading volume for the day was
                                {tip.volume ? tip.volume.toFixed(2) : data[data.length - 1]?.Volume.toFixed(2)}, showing how actively the stock was traded.
                            </Text>
                        </Box>
                    </Box>
                    : <Box
                        w="20%"
                        h="700px"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        pl="20px"
                    >
                        <Loader />
                    </Box>}
                <Box
                    w="70%"
                    h="93vh"
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    flexDirection="column"

                >
                    <Box
                        position="relative"
                        width="60vw" maxW="2000px" h="100px"
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
                            {/* <ArrowBackIos /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                            </svg>

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
                            pl="20px"
                        >
                            {items.map((item) => (
                                <Button
                                    key={item.value}
                                    minW="190px"
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
                                    <Text fontSize="16px" fontWeight="bold" color={select === item.value ? "black" : Hovered === item.value ? "black" : mode === "dark" ? "white" : "black"}
                                        // Change color when the parent (group) is hovered
                                        as="span"
                                        mr="4px"
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
                            right="30px"
                            top="45%"
                            transform="translateY(-50%)"
                            zIndex={10}
                            onClick={() => scroll("right")}
                            bg="gray.200"
                            _hover={{ bg: "gray.300" }}
                            rounded="full"
                        >
                            {/* <ArrowForwardIos /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                            </svg>
                        </Button>
                    </Box>
                    <Box
                        display="flex"
                        w="60vw"
                        h="700px"
                        mt="20px"
                        pl="15px"
                    >
                        <LineGraph />
                        <Button
                            w="2vw"
                            h="5vh"
                            onClick={() => { navigate("/chartFull") }}
                            borderWidth="1px"
                            borderColor={mode !== "dark" ? "rgba(0,0,0,0.35)" : "rgba(255,255 ,255,0.35)"}
                            p="0"
                            borderRadius="5px"
                            bgColor={mode == "dark" ? "rgba(12, 12, 12,0.9)" : "white"}
                            _hover={{ bgColor: "transparent" }}
                        >
                            {/* <Fullscreen sx={{ fontSize: "40px", color: mode !== "dark" ? "rgba(12, 12, 12,0.9)" : "white" }} /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="50px" fill={mode === "dark" ? "white" : "black"}>
                                <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
                            </svg>
                        </Button>
                    </Box>
                    <Modal onClose={onClose} size={"full"} isOpen={isOpen}>

                        <ModalContent
                            bgColor={mode == "dark" ? "rgba(12, 12, 12,0.9)" : "white"}

                        >

                            <ModalCloseButton color={mode !== "dark" ? "rgba(12, 12, 12,0.9)" : "white"} mr="20px" />
                            <ModalBody
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bgColor={mode == "dark" ? "rgba(12, 12, 12,0.5)" : "white"}
                            >
                                <Full />
                            </ModalBody>

                        </ModalContent>
                    </Modal>
                </Box>

            </Box>

        </Box >
    )
}

export default Home

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
