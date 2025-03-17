import { Box } from "@chakra-ui/react"
import CandlestickBarChart from "../components/CandleStick"
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Tooltip from "../components/ToolTip";
// import { FullscreenExit } from "@mui/icons-material";

const Full = () => {
    const navigate = useNavigate();
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
            display="flex"
            w="100%"
            h="105vh"
            justifyContent="center"
            alignItems="center"
            bgColor={mode == "dark" ? "rgba(12, 12, 12,0.9)" : "white"}

            flexDirection="row"
            pl="50px"
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                w={{ base: "", lg: "100%" }}
                h="90vh"
            >
                <Box
                    w={{ lg: "100px" }}
                    h={{ lg: "60px" }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Tooltip />
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                    justifyContent="flex-end"

                    w={{ lg: "85vw" }}
                    h={{ lg: "70vh" }}
                >
                    <CandlestickBarChart />
                </Box>

            </Box>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                w="10%"
                h="80vh"
            >
                <Button
                    w="2vw"
                    h="5vh"
                    onClick={() => { navigate("/") }}
                    borderWidth="1px"
                    borderColor={mode !== "dark" ? "rgba(0,0,0,0.35)" : "rgba(255,255 ,255,0.35)"}
                    p="0"
                    borderRadius="5px"
                    bgColor={mode == "dark" ? "rgba(12, 12, 12,0.9)" : "white"}
                    _hover={{ bgColor: "transparent" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="24px" fill={mode === "dark" ? "white" : "black"}>
                        <path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z" />
                    </svg>
                </Button>
            </Box >
        </Box >
    )
}

export default Full