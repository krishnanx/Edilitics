import { Box, Heading } from "@chakra-ui/react"
import Switch from "./ToggleSwitch"
const Navbar = () => {
    return (
        <Box
            w="100%"
            h="70px"
            display="flex"
            alignItems="center"

            bgColor="rgba(255,255,255,0.05)"
        >
            <Box
                w="25%"
            >
                <Heading
                    color="black"
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