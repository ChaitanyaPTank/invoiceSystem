const invoicesModel = require('../models/invoices');

exports.addInvoice = async (req, res) => {
  try {
    const {
      items,
      total,
      customerName,
    } = req.body;

    const invoiceNo = await invoicesModel.countDocuments() + 1;

    const newInvoice = await invoicesModel.create({ items, total, customerName, invoiceNo });
    if (!newInvoice) {
      return res.status(500).send('Something went wrong');
    }

    console.log(newInvoice);

    return res.status(200).send(newInvoice);
  }
  catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

exports.getInvoices = async (req, res) => {
  try {
    let { invoiceNo } = req.params;

    const invoice = await invoicesModel.find({ invoiceNo });

    if (!invoice) {
      return res.status(404).send('No invoice could be found');
    }

    console.log(invoice);
    return res.status(200).send(invoice)
  }
  catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}