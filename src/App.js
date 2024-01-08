import { useMemo } from "react";
import Box from "@mui/material/Box";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import SideNav from "./Home/components/SideNav";
import { Wallets } from './components/wallet'
import { SnackbarProvider } from 'notistack';
import CardMedia from '@mui/material/CardMedia';
import backgroundImg from '../src/assets/background.webp'

function App() {

// I will try to start with new project
// this project is so stressful
  return (
    <BrowserRouter>
    
      <Box paddingY={6} paddingX={2} >
      {/* <CardMedia
          component="img"
          alt="Sample Image"
          height="140"
          src={backgroundImg}
          style={{backgroundSize:"cover" , backgroundPosition:"center" }}
        > */}
        <SnackbarProvider>
          <Wallets>
          <SideNav/>
            <Home />
          </Wallets>
        </SnackbarProvider>
        {/* </CardMedia> */}
      </Box>
    </BrowserRouter>
  );
}

export default App;
