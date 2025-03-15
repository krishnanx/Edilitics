
import LineGraph from '../components/LineGraph'
"use client"
import { Box, Portal, Select, createListCollection } from '@chakra-ui/react'

import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from 'react-redux'
import { addCompany } from '../store/CompanySlice'
import { getData } from '../store/DataSlice'

//import { addCompany } from '../store/CompanySlice'
const Home = () => {
    const dispatch = useDispatch<AppDispatch>();


    interface CompanyState {
        data: string[]; // or whatever type `data` holds
    }

    interface RootState {
        company: CompanyState;
    }
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
    const { data: value } = useSelector((state: RootState) => state.company);
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
            h="500px"
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
                <Select.Root collection={frameworks} size="sm" width="320px"
                    value={value}
                    onValueChange={(e) => handlePush(e)}
                >
                    <Select.HiddenSelect />
                    <Select.Label color="black">Select framework</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="" color="black" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {frameworks.items.map((framework) => (
                                    <Select.Item item={framework} key={framework.value}>
                                        {framework.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            </Box>

        </Box>
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