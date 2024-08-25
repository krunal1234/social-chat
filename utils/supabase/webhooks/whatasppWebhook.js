const express = require('express');
const axios = require('axios');
const supabase = require('../supabase'); // Import the Supabase client

const router = express.Router();

// Get all upcoming request in webhook
router.get('/', async (req, res) => {
  try {
    let mode = req.query["hub.mode"];
    let challange = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];

    const my_token = "webhook";
    if (mode === "subscribe" && token === my_token) {
      res.send(challange);
    } else {
      res.send("something went wrong");
    }
  } catch (error) {
    res.send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    if (req.body.entry &&
        req.body.entry[0].changes &&
        req.body.entry[0].changes[0].value &&
        req.body.entry[0].changes[0].value.metadata) {
      
      let sendData;
      const { data: messages, error: insertError } = await supabase
        .from('messages')
        .insert([{ 
          isSent: true, 
          timestamp: new Date().toISOString()
        }]);

      if (insertError) {
        throw insertError;
      }

      if (req.body.entry[0].changes[0].value.messages) {
        const messageType = req.body.entry[0].changes[0].value.messages[0].type;
        const messageValue = req.body.entry[0].changes[0].value.messages[0];

        if (messageType === 'text') {
          sendData = {
            ChatFrom: req.body.entry[0].changes[0].value.metadata.display_phone_number,
            Fullname: req.body.entry[0].changes[0].value.contacts[0].profile.name,
            MobileNumber: req.body.entry[0].changes[0].value.contacts[0].wa_id,
            Email: "",
            messageList: [{
              wamessageid: messageValue.id,
              CampaignTemplateId: '',
              generatedmessages: messageValue.text.body,
              FileUploaded: "",
              FileType: "",
              BtnURL: "",
              ChatFrom: '1',
              status: "sent",
              templateType: "",
              BtnPayload: false,
              BtnPhone: "",
              timestamp: new Date().toISOString(),
            }]
          };
        } else if (messageType === 'button') {
          sendData = {
            ChatFrom: req.body.entry[0].changes[0].value.metadata.display_phone_number,
            Fullname: req.body.entry[0].changes[0].value.contacts[0].profile.name,
            MobileNumber: req.body.entry[0].changes[0].value.contacts[0].wa_id,
            Email: "",
            messageList: [{
              wamessageid: messageValue.id,
              CampaignTemplateId: '',
              generatedmessages: messageValue.button.payload,
              FileUploaded: "",
              FileType: "",
              BtnURL: "",
              ChatFrom: '1',
              status: "sent",
              templateType: "",
              BtnPayload: false,
              BtnPhone: "",
              timestamp: new Date().toISOString(),
            }]
          };
        } else {
          sendData = {
            ChatFrom: req.body.entry[0].changes[0].value.metadata.display_phone_number,
            Fullname: req.body.entry[0].changes[0].value.contacts[0].profile.name,
            MobileNumber: req.body.entry[0].changes[0].value.contacts[0].wa_id,
            Email: "",
            messageList: [{
              wamessageid: messageValue.id,
              CampaignTemplateId: '',
              generatedmessages: messageValue.image.caption,
              FileUploaded: messageValue.image.id,
              FileType: "",
              BtnURL: "",
              ChatFrom: '1',
              status: "sent",
              templateType: "",
              BtnPayload: false,
              BtnPhone: "",
              timestamp: new Date().toISOString(),
            }]
          };
        }
        
        await fetch('/api/messageList',{
            method : "POST",
            body : JSON.stringify(sendData)
        })
        .then(function (response) {
        res.sendStatus(200);
        })
        .catch(function (error) {
        console.log("something went wrong", error);
        });
      }
      
      if (req.body.entry[0].changes[0].value.statuses) {
        const statusValue = req.body.entry[0].changes[0].value.statuses[0];

        sendData = {
          ChatFrom: req.body.entry[0].changes[0].value.metadata.display_phone_number,
          MobileNumber: statusValue.recipient_id,
          wamessageid: statusValue.id,
          status: statusValue.status,
        };

        await fetch('/api/messageList',{
            method : "UPDATE",
            body : JSON.stringify(sendData)
        })
        .then(function (response) {
            res.sendStatus(200);
        })
        .catch(function (error) {
        console.log("something went wrong", error);
        });
      }
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
