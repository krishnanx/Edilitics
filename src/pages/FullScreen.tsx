import { Box } from "@chakra-ui/react"
import CandlestickBarChart from "../components/CandleStick"

const FullScreen = () => {
    return (
        <Box
            w="99.5vw"
            h="100vh"
            justifyContent="center"
            alignItems="center"
        >
            <CandlestickBarChart />
        </Box>
    )
}

export default FullScreen