
import './App.css'
import { Box } from '@chakra-ui/react'
import Home from './pages/Home'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout';
import Full from './pages/FullScreen';
import { useSelector } from 'react-redux';

function App() {
  interface modeState {
    mode: string; // or whatever type `data` holds

  }

  interface RootState {
    mode: modeState;
  }
  const { mode } = useSelector(
    (state: RootState) => state.mode || { mode: "light" }
  ) as modeState;

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}></Route>
      <Route path="/chartFull" element={<Full />}></Route>

    </Route>
  ))
  return (
    <>
      <Box
        w={{ base: "99.3", lg: "99.2vw" }}
        h={{ base: "230vh", lg: "100vh" }}
        display="flex"
        flexDirection="column"
        justifyContent={{ base: "flex-start", lg: "center" }}
        alignItems="center"
        bgColor={mode == "dark" ? "rgba(12, 12, 12,0.4)" : "white"}

      >

        <RouterProvider router={router} />


      </Box>
    </>
  )
}

export default App
