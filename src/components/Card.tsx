import { Box, Text } from '@chakra-ui/react';

import styled from 'styled-components';
import { useSelector } from 'react-redux';
const Card = () => {
    interface dataState {
        data: Array<any>; // or whatever type `data` holds
        status: string
    }

    interface RootState {
        data: dataState;
    }
    const { data } = useSelector(
        (state: RootState) => state.data
    ) as dataState;


    return (
        <StyledWrapper>
            <Box className="card shadow"
                display="flex"
                flexDirection="column"
                alignItems="center"
                pt="20px"
            >
                <Text
                    color='black'
                    mb="20px"
                    textAlign="center"
                    w="200px"
                    fontSize="1.3rem"

                >
                    Open:{(data[data.length - 1]?.Open)?.toFixed(2) || ""}
                </Text>
                <Text
                    color='black'
                    mb="20px"
                    textAlign="center"
                    w="200px"
                    fontSize="1.3rem"
                >
                    Close:{(data[data.length - 1]?.Close)?.toFixed(2) || ""}
                </Text>
                <Text
                    color='black'
                    mb="20px"
                    textAlign="center"
                    w="200px"
                    fontSize="1.3rem"
                >
                    High:{(data[data.length - 1]?.High)?.toFixed(2) || ""}
                </Text>
                <Text
                    color='black'
                    textAlign="center"
                    w="200px"
                    fontSize="1.3rem"
                >
                    Low:{(data[data.length - 1]?.Low)?.toFixed(2) || ""}
                </Text>
            </Box>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card {
   width: 320px;
   height: 360px;
   background: white;
   border-radius: 10px;
   transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .shadow {
   box-shadow: inset 0 -3em 3em rgba(0,0,0,0.1),
               0 0  0 2px rgb(190, 190, 190),
               0.3em 0.3em 1em rgba(0,0,0,0.3);
  }`;

export default Card;
