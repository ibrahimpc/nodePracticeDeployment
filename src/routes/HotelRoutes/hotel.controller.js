const hotelModel = require("../../models/hotels");
const nodemailer = require("nodemailer");

const saveHotel = async (req, res) => {
  try {
    console.log("save hotel");
    const result = await hotelModel.create(req?.body);
    res.send({ result });
  } catch (e) {
    res.send({ error: e });
  }
};
const getHotel = async (req, res) => {
  let location = req?.params?.location;
  try {
    console.log("get hotel hit");
    let query = {};
    res.send({ result: "deployedment successfull" });
    // if (!!location) {
    //   console.log("location available");
    //   query = { country: location };
    //   const result = await hotelModel.find(query);
    //   res.send({ result });
    // } else {
    //   console.log("location not available");
    //   const result = await hotelModel.find();
    //   res.send({ result });
    // }
  } catch (e) {
    res.send({ error: e });
  }
};
const updateHotel = async (req, res) => {
  try {
    const itemId = req?.params?.id;
    const matchedHotel = await hotelModel?.findById(itemId);
    if (!!matchedHotel) {
      Object.keys(req?.body).forEach((i) => {
        if (req?.body[i] !== undefined) {
          matchedHotel[i] = req?.body?.[i];
        }
      });
      await matchedHotel.save();
      res.send({
        status: true,
        result: matchedHotel,
      });
    }
    //DIFFERENT APPROACH FOR THE ABOVE SAME LOGIC
    //         const updatedHotel = await hotelModel?.findByIdAndUpdate(itemId,req.body,{new:true})
    //              res.send({
    //                  status:true,
    //                  result:updatedHotel
    //              })
  } catch (e) {
    res.send({
      error: e,
      status: 400,
      message: "hotel not availale with the id",
    });
  }
};
const deleteHotel = async (req, res) => {
  try {
    const result = await hotelModel.findByIdAndDelete(req?.params?.id);
    if (result !== null) {
      res.send({
        status: true,
        result: "HOTEL DELETED SUCCESSFULLY",
      });
    } else {
      res.status(404).send({
        status: false,
        result: "HOTEL NOT EXISTS",
      });
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
    console.log(e, "failure");
  }
};
const makeEmailCall = async (req, res) => {
  try {
    const { to, subject, text, attachment } = req.body;
    console.log(to, subject, req.body, "email call");
    const transporter = nodemailer.createTransport({
      service: "gmail", // e.g., Gmail, Yahoo, etc.
      auth: {
        user: "mohammedibrahimfazal@gmail.com",
        pass: "buug muqf bavc qxnn",
      },
    });

    const mailOptions = {
      from: "mohammedibrahimfazal@gmail.com",
      to,
      subject,
      text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
        return res.status(500).send(error.toString());
      }
      res.status(200).send("Email sent: " + info.response);
    });
  } catch {}
};

module.exports = {
  saveHotel,
  getHotel,
  updateHotel,
  deleteHotel,
  makeEmailCall,
};
