const midtransClient = require("midtrans-client");

exports.createPaymentIntent = (req, res) => {
  try {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-KnjMymVKTJd4BnRbLBcDF8yX",
      clientKey: "SB-Mid-client-lMX7fU7MF393SLYD",
    });

    let parameter = {
      transaction_details: {
        order_id: req.body.idTransaksi,
        nama_produk: req.body.nama,
        gross_amount: req.body.harga,
      },
    };

    snap.createTransaction(parameter).then((transaction) => {
      const dataPayment = {
        response: JSON.stringify(transaction),
      };
      const token = transaction.token;
      res.status(200).json({
        message: "Success",
        dataPayment,
        token,
      });
    });

    // const { idTransaksi, nama, harga, token } = req.body;

    // res.status(200).json({
    //   idTransaksi,
    //   nama,
    //   harga,
    //   token,
    // });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
