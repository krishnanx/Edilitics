
import './App.css'
import { Box } from '@chakra-ui/react'
import Home from './pages/Home'
import { Provider } from "react-redux";
import store from './store/store';
function App() {

  return (
    <>
      <Box
        w="100vw"
        h="100vh"
        bgColor="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Provider store={store}>
          <Home />
        </Provider>

      </Box>
    </>
  )
}

export default App
