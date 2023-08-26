import { Box, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const PaymentMidtrans = () => {
  const [idTransaksi, setIdTransaksi] = useState("");
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState(0);
  const [token, setToken] = useState("");

  const handleId = (e) => {
    setIdTransaksi(e.target.value);
  };
  const handleNama = (e) => {
    setNama(e.target.value);
  };
  const handleHarga = (e) => {
    setHarga(e.target.value);
  };

  const handleBayar = async () => {
    const data = {
      idTransaksi: idTransaksi,
      nama: nama,
      harga: harga,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const resp = await axios.post("http://localhost:4000/api/v1/payment", data, config);
      console.log(resp.datadataPayment);

      setToken(resp.data.token);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem("result", JSON.stringify(result));
          setToken("");
        },
        onPending: (result) => {
          localStorage.setItem("result", JSON.stringify(result));
          setToken("");
        },
        onError: (error) => {
          console.log(error);
          setToken("");
        },
        onClose: () => {
          console.log("customer closed the popup without finishing the payment");
          setToken("");
        },
      });
    }
    setIdTransaksi("");
    setHarga(0);
    setNama("");
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let midtransScriptTag = document.createElement("script");
    midtransScriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-lMX7fU7MF393SLYD";
    midtransScriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(midtransScriptTag);

    return () => {
      document.body.removeChild(midtransScriptTag);
    };
  }, []);

  return (
    <section>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          rowGap: "1rem",
        }}
      >
        <Typography>Payment Midtrans</Typography>
        <TextField value={idTransaksi} onChange={handleId} id="outlined-basic" label="Id Transaksi" variant="outlined" size="small" />
        <TextField value={nama} onChange={handleNama} id="outlined-basic" label="Nama" variant="outlined" size="small" />
        <TextField value={harga} onChange={handleHarga} id="outlined-basic" label="Harga" variant="outlined" size="small" />

        <Button onClick={handleBayar} variant="outlined">
          Bayar
        </Button>
      </Box>
    </section>
  );
};
export default PaymentMidtrans;
