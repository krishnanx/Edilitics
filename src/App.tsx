
import './App.css'
import { Box } from '@chakra-ui/react'
import Home from './pages/Home'
import { Provider } from "react-redux";
import store from './store/store';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout';
import FullScreen from './pages/FullScreen';
function App() {


  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}></Route>
      <Route path="/chartFull" element={<FullScreen />}></Route>

    </Route>
  ))
  return (
    <>
      <Box
        w="100vw"
        h="100vh"

        display="flex"
        bgColor="white"
        flexDirection="column"
      >
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>

      </Box>
    </>
  )
}

export default App
