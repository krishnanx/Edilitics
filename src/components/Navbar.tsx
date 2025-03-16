import { Box, Heading } from "@chakra-ui/react"
import Switch from "./ToggleSwitch"
import { useSelector } from "react-redux";
const Navbar = () => {
    interface modeState {
        mode: string; // or whatever type `data` holds

    }

    interface RootState {
        mode: modeState;
    }
    const { mode } = useSelector(
        (state: RootState) => state.mode || { mode: "light" }
    ) as modeState;
    return (
        <Box
            w="100%"
            h="80px"
            display="flex"
            alignItems="center"
            bgColor={mode == "dark" ? "rgba(12, 12, 12,0.9)" : "white"}

        >
            <Box
                w="25%"
            >
                <Heading
                    color={mode !== "dark" ? "black" : "white"}
                    fontFamily="fantasy"
                    w="300px"
                    fontSize="2rem"
                    pl="30px"
                >
                    StockWave
                </Heading>
            </Box>
            <Box
                w="50%"
            >

            </Box>
            <Box
                w="25%"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Switch />
            </Box>
        </Box>
    )
}

export default Navbar