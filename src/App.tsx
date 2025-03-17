
import './App.css'
import { Box } from '@chakra-ui/react'
import Home from './pages/Home'
import { Provider } from "react-redux";
import store from './store/store';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout';
import Full from './pages/FullScreen';

function App() {


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

      >
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>

      </Box>
    </>
  )
}

export default App
