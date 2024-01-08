import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import styles from "./home.module.css"
import { styled } from "@mui/system";
import React, { useState } from 'react';
const CardWrapper = styled(Card)({
  background: "transparent",
  border: "5px solid #555",
});

const Input = styled("input")(({ theme }) => ({
  fontSize: 10,
  fontWeight: 300,
  padding: "10px 12px",
  borderRadius: 0,
  border: "1px solid #555",
  background: "white",
  width: "100%",
  outline: "none",
  color: theme.palette.primary.main,
}));

export default function ReferralLink({ address }) {
  const link = `${window.origin}?ref=${address}`;

  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);

    // Reset the "Copied" state after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <CardWrapper>
      {/* <CardContent style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Typography gutterBottom variant="h5" textAlign="center">
          Referral Link
        </Typography>
        <Input value={address ? link : ""} readOnly />
        <Typography
          textAlign="center"
          variant="body2"
          marginTop={2}
          paddingX={3}
        >
          Earn 12% of the SOL used to roast beans from anyone who uses your
          referral link
        </Typography>
      </CardContent> */}
      <div className={styles.head3}>
                        <h1>Pharaoh's Treasure</h1>
                    </div>
                    <div className={styles.referal}>
                        <h1>Reference</h1>
                        <input className={styles.referalin} value={address ? link : ""} readOnly />
                        <button className={styles.buy_btn}
                            style={{
                                "border": "3px solid #000",
                            }}
                            onClick={copyToClipboard}>
                            {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                            </button>
                        <p className={styles.para}>Earn 15% of the SOL used to compound from anyone who uses your referral link</p>
                    </div>
    </CardWrapper>
  );
}
