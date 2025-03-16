import { Box } from "@chakra-ui/react"
import CandlestickBarChart from "../components/CandleStick"
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FullscreenExit } from "@mui/icons-material";

const FullScreen = () => {
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
            w="99.5vw"
            h="100vh"
            justifyContent="center"
            alignItems="center"
            bgColor={mode == "dark" ? "rgba(12, 12, 12,0.9)" : "white"}
            pt="50px"
            flexDirection="row"
            pl="50px"
        >
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                w="90%"
                h="80vh"
            >
                <CandlestickBarChart />
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
                    w="1vw"
                    h="5vh"
                    onClick={() => { navigate("/") }}
                    borderWidth="1px"
                    borderColor={mode !== "dark" ? "rgba(0,0,0,0.35)" : "rgba(255,255 ,255,0.35)"}
                    p="0"
                    borderRadius="5px"
                    bgColor={mode == "dark" ? "rgba(12, 12, 12,0.9)" : "white"}
                >
                    <FullscreenExit sx={{ fontSize: "40px", color: mode !== "dark" ? "rgba(12, 12, 12,0.9)" : "white" }} />
                </Button>
            </Box>
        </Box>
    )
}

export default FullScreen