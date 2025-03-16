
import LineGraph from '../components/LineGraph'
"use client"
import { Box, createListCollection, Text, Button } from '@chakra-ui/react'
import Card from '../components/Card';
import { AppDispatch } from "../store/store";
import { useDispatch } from 'react-redux'
import { addCompany } from '../store/CompanySlice'
import { getData } from '../store/DataSlice'
import { useNavigate } from 'react-router-dom';

import { useRef } from 'react';
//import { addCompany } from '../store/CompanySlice'
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const scroll = (direction: "left" | "right") => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = 400;
            current.scrollBy({
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
    // interface dataState {
    //     data: []; // or whatever type `data` holds
    //     status: string
    // }

    // interface State {
    //     data: dataState;
    // }
    // const { data, status } = useSelector(
    //     (state: State) => state.data
    // ) as dataState;
    // const { data: value } = useSelector((state: RootState) => state.company);
    // type SelectChangeEvent = {
    //     value: string;
    //     label: string;
    // };
    const handlePush = async (e: any) => {
        console.log("Selected:", e.value);
        dispatch(addCompany(e.value));
        dispatch(getData({ company: e.value }));
    };
    // if (status == 'loading') {
    //     return <Loader />
    // }
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="90%"
            h="900px"
            flexDirection="column"

        >
            <Box position="relative" width="1250px" maxW="4000px" mx="auto" h="100px" justifyContent="center" alignItems="center">
                {/* Left Scroll Button */}
                <Button
                    aria-label="Scroll Left"
                    position="absolute"
                    left="-30px"
                    top="45%"
                    transform="translateY(-50%)"
                    zIndex={10}
                    onClick={() => scroll("left")}
                    bg="gray.200"
                    _hover={{ bg: "gray.300" }}
                    rounded="full"

                >

                </Button>
                {/* Scrollable Content */}
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p="0"
                    h="90px"
                    ref={scrollRef}
                    gap={7}
                    overflowX="auto"
                    scrollBehavior="smooth"
                    whiteSpace="nowrap"
                    minWidth="100%" // Ensure it stretches enough
                    css={{
                        "&::-webkit-scrollbar": { display: "none" },
                        "-ms-overflow-style": "none",
                        "scrollbar-width": "none",
                    }}
                    bgColor='white'
                >
                    {items.map((item, index) => (
                        <Button
                            key={item.value}
                            minW="150px"
                            p={4}

                            rounded="xl"
                            onClick={() => handlePush(item)}
                            textAlign="center"
                            h="80px"
                            _hover={{ bgColor: "#F2F2F2" }}
                        >
                            <Text fontSize="lg" fontWeight="bold">
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
                    right="-40px"
                    top="45%"
                    transform="translateY(-50%)"
                    zIndex={10}
                    onClick={() => scroll("right")}
                    bg="gray.200"
                    _hover={{ bg: "gray.300" }}
                    rounded="full"
                >

                </Button>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"

            >
                <Box

                >
                    <LineGraph />
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    h="500px"

                >

                    <Box
                        display="flex"
                        mt="50px"
                        mb="30px"
                    >
                        <Card />
                    </Box>
                    <Button
                        w="50px"
                        h="50px"
                        onClick={() => { navigate("/chartFull") }}
                    >
                        <span className="material-symbols-outlined" style={{
                            fontSize: "34px",
                            border: "2px solid rgba(0, 0, 0, 0.1)", // Black border with 50% opacity
                            padding: "3px",
                            borderRadius: "5px"
                        }}>
                            fullscreen
                        </span>
                    </Button>
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

    ]
