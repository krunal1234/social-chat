import { NextResponse } from "next/server";

export async function GET(request) {
  if (request.method === 'GET') {
    try {
      let mode = request.query["hub.mode"];
      let challange = request.query["hub.challenge"];
      let token = request.query["hub.verify_token"];

      const my_token = "webhook_social_chat";
      if (mode === "subscribe" && token === my_token) {
        return NextResponse.json(challange, {
          status: 200
        });
      } else {
        return NextResponse.json({success : false}, {
          status: 200
        });
      }
    } catch (error) {
      return NextResponse.json(error, {
        status: 200
      });
    }
  }
};

export async function POST(request) {
  if (request.method === 'POST') {
    const data = await request.json();
    try {
      if (data.entry &&
          data.entry[0].changes &&
          data.entry[0].changes[0].value &&
          data.entry[0].changes[0].value.metadata) {
        
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

        if (data.entry[0].changes[0].value.messages) {
          const messageType = data.entry[0].changes[0].value.messages[0].type;
          const messageValue = data.entry[0].changes[0].value.messages[0];

          if (messageType === 'text') {
            sendData = {
              ChatFrom: data.entry[0].changes[0].value.metadata.display_phone_number,
              Fullname: data.entry[0].changes[0].value.contacts[0].profile.name,
              MobileNumber: data.entry[0].changes[0].value.contacts[0].wa_id,
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
              ChatFrom: data.entry[0].changes[0].value.metadata.display_phone_number,
              Fullname: data.entry[0].changes[0].value.contacts[0].profile.name,
              MobileNumber: data.entry[0].changes[0].value.contacts[0].wa_id,
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
              ChatFrom: data.entry[0].changes[0].value.metadata.display_phone_number,
              Fullname: data.entry[0].changes[0].value.contacts[0].profile.name,
              MobileNumber: data.entry[0].changes[0].value.contacts[0].wa_id,
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
            return NextResponse.json({success : true}, {
              status: 200
            });
          })
          .catch(function (error) {
          console.log("something went wrong", error);
          });
        }
        
        if (data.entry[0].changes[0].value.statuses) {
          const statusValue = data.entry[0].changes[0].value.statuses[0];

          sendData = {
            ChatFrom: data.entry[0].changes[0].value.metadata.display_phone_number,
            MobileNumber: statusValue.recipient_id,
            wamessageid: statusValue.id,
            status: statusValue.status,
          };

          await fetch('/api/messageList',{
              method : "UPDATE",
              body : JSON.stringify(sendData)
          })
          .then(function (response) {
            return NextResponse.json({success : true}, {
              status: 200
            });
          })
          .catch(function (error) {
          console.log("something went wrong", error);
          });
        }
      }
    } catch (error) {
      return NextResponse.json(error, {
        status: 200
      });
    }
  }
}
