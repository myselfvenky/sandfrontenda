/* eslint-disable react-hooks/exhaustive-deps */
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import styles from "./home.module.css"
import { useLocation } from "react-router-dom";
import { useContractContext } from "../../providers/ContractProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import PriceInput from "../../components/PriceInput";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { buyEggs, sellEggs, hatchEggs, initialize } from "../../contracts/bean";
import { PublicKey } from "@solana/web3.js";

import {
  getWalletSolBalance,
  getVaultSolBalance,
  getUserData,
  getGlobalStateData
} from "../../contracts/bean"
import { toast } from 'react-toastify';

const CardWrapper = styled(Card)({
  background: "transparent",
  marginBottom: 24,
  border: "5px solid #555",
});

const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    "> div": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

const UnderlinedGrid = styled(Grid)(() => ({
  borderBottom: '1px solid black'
}))

export default function BakeCard() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  /*const { address, chainId } = useAuthContext();*/
  const { publicKey: address } = useWallet();
  const [bakeSOL, setBakeSOL] = useState(0);
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const wallet = useWallet();
  const [sand, setSand] = useState(0)
  const [mysol, setMysol] = useState(0)
  const [minersCount, setMinersCount] = useState("0");
  const [beanRewards, setBeanRewards] = useState("0");
  const [walletSolBalance, setWalletSolBalance] = useState("0");
  const [contractSolBalance, setContractSolBalance] = useState("0");
  const [dataUpdate, setDataUpdate] = useState(false);
  const [adminKey, setAdminKey] = useState(null);

  useEffect(() => {
    getWalletSolBalance(wallet).then(bal => {
      console.log("getWalletSolBalance bal=", bal);
      setWalletSolBalance(bal);
    });
    getUserData(wallet).then(data => {
      if (data !== null) {
        console.log('userData =', data);
        setBeanRewards(data.beanRewards);
        setMinersCount(data.miners);
      } else {
        setBeanRewards("0");
        setMinersCount("0");
      }
    });
    getGlobalStateData(wallet).then(data => {
      if (data != null) {
        setAdminKey(data.authority);
      }
    })
  }, [wallet, dataUpdate]);

  useEffect(() => {
    getVaultSolBalance(wallet).then(bal => {
      setContractSolBalance(bal);
    });
  }, [wallet, dataUpdate]);

  useEffect(() => {
    setTimeout(() => {
      if (wallet.publicKey) toggleDataUpdate();
    }, 5000);
  });

  const toggleDataUpdate = () => {
    setDataUpdate(!dataUpdate);
  }

  const onUpdateBakeSOL = (value) => {
    setBakeSOL(value);
  };
  const getRef = () => {
    const ref = query.get("ref");
    if (ref === null) return null;
    return new PublicKey(ref);
  };

  const initializeProgram = async () => {

    setLoading(true);
    try {
      await initialize(wallet);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    toggleDataUpdate();
  };

  const bake = async () => {
    if (!address) {
      toast.error("Please connect wallet");
      return;
    }
    // if (walletSolBalance < sand) {
    //   toast.error("Insufficient Balance");
    //   return;
    // }
    if (sand <= 0) {
      toast.error("Please enter valid amount");
      return;
    }
    if (loading) {
      toast.error("Please wait");
      return;
    }
    setLoading(true);

    let ref = getRef();
    console.log("bake: ref=", ref);
    if (ref === null) ref = wallet.publicKey;
    try {
      await buyEggs(wallet, ref, bakeSOL);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    toggleDataUpdate();
  };

  const reBake = async () => {
    setLoading(true);

    let ref = getRef();

    if (ref === null) ref = wallet.publicKey;
    try {
      await hatchEggs(wallet, ref);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    toggleDataUpdate();

  };

  const eatBeans = async () => {
    setLoading(true);

    try {
      await sellEggs(wallet);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    toggleDataUpdate();
  };

  return (
    <div>
      <div className={styles.head} style={{ fontWeight: "2px" }}>
        <h1>SAND STAKING</h1>
      </div>
      <div className={styles.card_cont}>
        <div className={styles.card} style={{ width: "100%" }}>
          <h2>Contract</h2>
          <h3>{contractSolBalance} SOL</h3>
        </div>
        <div className={styles.card} style={{ width: "100%" }}>
          <h2>Wallet</h2>
          <h3>{walletSolBalance} SOL</h3>
        </div>
        <div className={styles.card} style={{ width: "100%" }}>
          <h2>Your SAND</h2>
          <h3>{minersCount} SAND</h3>
        </div>
      </div>
      <CardWrapper>
        {loading && <LinearProgress color="secondary" />}
        <CardContent>
          {/* <UnderlinedGrid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1">Contract</Typography>
          <Typography variant="h5"></Typography>
        </UnderlinedGrid> */}
          {/* <UnderlinedGrid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1">Wallet</Typography>
          <Typography variant="h5">{walletSolBalance} SOL</Typography>
        </UnderlinedGrid> */}
          {/* <UnderlinedGrid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1">Your SAND</Typography>
          <Typography variant="h5">{minersCount} SAND</Typography>
        </UnderlinedGrid> */}

          <div className={styles.section} style={{ display: "flex", contain: "" }}>
            <div className={styles.section_head}>Stake</div>
            <div className={styles.bal_card}> Balance:{walletSolBalance} SOL </div>
            <input type="number" placeholder="Enter Amount"
              onChange={(e) => setSand(e.target.value)}
              className={styles.in}

            />
            <button className={styles.buy_btn}

              onClick={bake}
            >Buy {sand} SAND</button>

          </div>

          <Box paddingTop={4} paddingBottom={3}>
            {/* <Box>
            <PriceInput
              max={+walletSolBalance}
              value={bakeSOL}
              onChange={(value) => onUpdateBakeSOL(value)}
            />
          </Box> */}

            <Box marginTop={3} marginBottom={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={initializeProgram}

                className="custom-button"
              >
                Init
              </Button>
            </Box>

            {/* <Box marginTop={3} marginBottom={3}>
              <Button
                variant="contained"
                fullWidth
                // disabled={!address || +bakeSOL === 0 || loading}
                onClick={bake}
                className="custom-button"
              >
                ROAST BEANS
              </Button>
            </Box> */}
            <Divider />

            <div className={styles.section}>
              <div className={styles.section_head}>Claim</div>
              <div className={styles.data}>{beanRewards} SOL</div>
              <div>
                <button className={styles.buy_btn} disabled={!address || loading}
                  onClick={reBake}>Compound</button>
                <button className={styles.buy_btn} disabled={!address || loading}
                  onClick={eatBeans}>Claim Rewards</button>
              </div>

            </div>

            {/* <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography variant="body1" fontWeight="bolder">
              Claim
            </Typography>
            <Typography variant="h5" fontWeight="bolder">
              {beanRewards} SOL
            </Typography>
          </Grid> */}

          </Box>
        </CardContent>
      </CardWrapper>
    </div>
  );
}
