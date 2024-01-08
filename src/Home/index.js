import { flexbox, styled } from "@mui/system";
import styles from './components/home.module.css'
import Header from "./components/Header";
import BakeCard from "./components/BakeCard";
import { RiMenu4Fill } from "react-icons/ri"
import NutritionFacts from "./components/NutritionFacts";
import ReferralLink from "./components/ReferralLink";
import { useWallet } from "@solana/wallet-adapter-react";
import Footer from "./components/Footer";
import bckimg from "../assets/background.webp"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import {
  WalletDialogProvider as MaterialUIWalletDialogProvider,
  WalletMultiButton as MaterialUIWalletMultiButton,
  WalletConnectButton
} from '@solana/wallet-adapter-material-ui';
import { ToastContainer } from 'react-toastify';

import backgroundImg from '../assets/background.webp';
import 'react-toastify/dist/ReactToastify.css';


// import backgroundImg from '../assets/background.png';

const Wrapper = styled("div")(({ theme }) => ({
  
  position: 'relative',
  margin: "0",
  width: "75%", // Default width

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },

  // [theme.breakpoints.between("715px", "1920px")]: {
  //   width: "75% !important",
  // },
}));

const WalletButton = styled("div")(() => ({
  display: 'flex',
  flexDirection: 'row-reverse'
}))

export default function Home() {
  //const { address } = useAuthContext();
  const wallet = useWallet();
  const NavOpenClosefn = () => {

    const element = document.getElementById("nav")
    const width = "80%";
    if (element.style.width === width) {
        element.style.width = "0%"

    } else {
        element.style.width = width;
    }
}
  return (
    <div style={{display:"flex" , justifyContent:"end" ,backgroundImage:`url(${backgroundImg})`,
    backgroundPosition:"center",
    backgroundSize:"cover",}}>
      <Wrapper>
      <RiMenu4Fill className={styles.burger} onClick={NavOpenClosefn} />
          <WalletButton>
            <MaterialUIWalletMultiButton variant="text" style={{
              border: "5px solid black",
              fontWeight: 900,
              background: "transparent",
              borderRadius: '10px',
              color: 'black'
            }}/>
          </WalletButton>
         
          <Header />
          <BakeCard />
          {/* <NutritionFacts /> */}
          <ReferralLink address={wallet.publicKey && wallet.publicKey.toBase58()} />
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      </Wrapper>
    </div>
  );
}
