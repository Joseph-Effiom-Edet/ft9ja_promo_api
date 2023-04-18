import * as dotenv from "dotenv";
import express from "express";
import { Participant } from "../models/Participants.js";
import Sib from "sib-api-v3-sdk";

dotenv.config();

const router = express.Router();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;

router.post("/", async (req, res) => {
  const newParticipant = new Participant({
    proofOfAdvocacy: req.body.proofOfAdvocacy,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    nationality: req.body.nationality,
  });

  const sendEmail = new Sib.TransactionalEmailsApi();

  const sender = {
    email: "traders@ft9ja.com",
  };

  const receiver = [
    {
      email: req.body.email,
    },
  ];

  try {
    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="style.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style="background: #ededed; display: grid; padding: 10px 0 10px 0">
        <div style="background: #ffffff; width: 100%; padding: 50px 0">
          <div style="display: grid; background: white">
            <div
              style="
                border-bottom: 1px solid rgba(128, 128, 128, 0.3);
                width: 90%;
                display: grid;
                margin: 0 auto auto;
              "
            >
              <img
                src="https://res.cloudinary.com/ddlupbcws/image/upload/v1680791936/logo_2_ft9ja_1_fsh9iz.png"
                alt=""
                style="width: 201px; margin: 0 auto 30px auto"
              />
            </div>
            <div style="margin: 41px auto 0 auto">
              <img
                src="https://res.cloudinary.com/ddlupbcws/image/upload/v1681733505/animation_500_lgf8yqp4_ap45x2.gif"
                alt=""
                style="width: 222px"
              />
            </div>
            <div
              style="
                margin: 41px auto;
                display: grid;
                gap: 24px;
                border-bottom: 1px solid rgba(128, 128, 128, 0.3);
                padding-bottom: 63px;
                width: 90%;
              "
            >
              <p
                style="
                  font-family: 'Open Sans', sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                "
              >
                Dear ${req.body.firstName}</span>
              </p>
              <p
                style="
                  font-family: 'Open Sans', sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                "
              >
                We are pleased to inform you that your registration for the FT9ja
                Promo has been successful! We have received your details and
                uploaded document.
              </p>
              <p
                style="
                  font-family: 'Open Sans', sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                "
              >
                Regards,
                <span>FT9ja Team</span>
              </p>
            </div>
            <footer style="display: grid">
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  margin: 0 auto 20px auto;
                "
              >
                <div
                  style="
                    border: 1px solid #000000;
                    background: white;
                    display: grid;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                  "
                >
                  <img
                    src="https://res.cloudinary.com/ddlupbcws/image/upload/v1681287720/facebook_aesodh.png"
                    alt=""
                    style="width: 80%; margin: auto"
                  />
                </div>
                <div
                  style="
                    border: 1px solid #000000;
                    background: white;
                    display: grid;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                  "
                >
                  <img
                    src="https://res.cloudinary.com/ddlupbcws/image/upload/v1681287720/instagram_jto0qp.png"
                    alt=""
                    style="width: 80%; margin: auto"
                  />
                </div>
                <div
                  style="
                    border: 1px solid #000000;
                    background: white;
                    display: grid;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                  "
                >
                  <img
                    src="https://res.cloudinary.com/ddlupbcws/image/upload/v1681287720/whatsapp_id03gi.png"
                    alt=""
                    style="width: 80%; margin: auto"
                  />
                </div>
              </div>
              <div style="display: grid; gap: 12px">
                <p
                  style="
                    font-family: 'Open Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: center;
                  "
                >
                  Lagos: 30a Oladimeji Alo Street, Lekki Phase 1.
                </p>
                <p
                  style="
                    font-family: 'Open Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: center;
                  "
                >
                  Abuja: 18, Queen Elizabeth Street, Asokoro (Appointments only)
                </p>
                <p
                  style="
                    font-family: 'Open Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: center;
                  "
                >
                  You can also connect to our community of Traders here
                  <span style="color: #008000; font-weight: 500">
                    <a
                      href="https://www.community.ft9ja.com/"
                      target="_blank"
                      style="color: inherit"
                    >
                      https://www.community.ft9ja.com/
                    </a>
                  </span>
                </p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
    `;
    const savedPost = await newParticipant.save();
    sendEmail
      .sendTransacEmail({
        sender,
        to: receiver,
        subject: "Registeration Successfull",
        htmlContent: html,
      })
      .then(() => {
        return res.status(201).json({
          data: savedPost,
          msg: "Email has been sent",
        });
      })
      .catch(console.log);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/participants", async (req, res) => {
  try {
    const participans = await Participant.find();
    res.status(201).json(participans);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/participants/:id", async (req, res) => {
  try {
    const post = await Participant.findById(req.params.id);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/participants/:id", async (req, res) => {
  try {
    await Participant.findByIdAndDelete(req.params.id);
    res.status(200).json("Participant has been deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/participants/:id", async (req, res) => {
  try {
    const updatedPost = await Participant.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;
