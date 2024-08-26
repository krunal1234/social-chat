import { NextResponse } from "next/server";
import { FB } from "fb/lib/fb";
import whatsappCredentials from "../../../../../utils/supabase/backend/whatsappCredentials/whatsappCrendentials";
import WhatsappMessageList from "../../../../../utils/supabase/backend/messageList/whatsapp/messageList";
import auth from "../../../../../utils/supabase/auth";

export async function GET(request) {
    if (request.method === 'GET') {
        try {   
            return NextResponse.json({success : true}, {
                status: 200
            });
        } catch (error) {
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }
}
export async function POST(request) {
  if (request.method === 'POST') {
      try {
          let TotalSent = 0;
          let TotalFail = 0;

          const data = await request.json(); // Parse JSON payload
          const { FromNumber, MobileNumber, generatedmessages } = data;
          const userData = await auth.getSession();
          const whatsappCredentialsData = await whatsappCredentials.get();

          FB.setAccessToken(whatsappCredentialsData[0].access_token);

          let fieldsItem;
          const whatsappCred = whatsappCredentialsData[0];

          // Debugging: Log received data
          console.log('Received data:', data);

          if (whatsappCred.variableFileDynamicValue) {
              const imageFileID = whatsappCred.variableFileDynamicValue.fileId;
              const imageFileName = whatsappCred.variableFileDynamicValue.fileName;
              const UploadedFile = `https://whatsapp.dhweninfotech.com/api/fileuploadbucket/${imageFileID}/${imageFileName}`;

              const fileExtension = imageFileName.split('.').pop().toLowerCase();
              let FileType;

              if (['png', 'jpg', 'jpeg'].includes(fileExtension)) {
                  FileType = "IMAGE";
                  fieldsItem = {
                      "messaging_product": "whatsapp",
                      "recipient_type": "individual",
                      "to": MobileNumber,
                      "type": "image",
                      "image": {
                          "link": UploadedFile,
                          "caption": generatedmessages
                      }
                  };
              } else if (['mp4', '3gpp'].includes(fileExtension)) {
                  FileType = "VIDEO";
                  fieldsItem = {
                      "messaging_product": "whatsapp",
                      "recipient_type": "individual",
                      "to": MobileNumber,
                      "type": "video",
                      "video": {
                          "link": UploadedFile,
                          "caption": generatedmessages
                      }
                  };
              } else if (['pdf', 'xlx', 'xlsx', 'csv'].includes(fileExtension)) {
                  FileType = "DOCUMENT";
                  fieldsItem = {
                      "messaging_product": "whatsapp",
                      "recipient_type": "individual",
                      "to": MobileNumber,
                      "type": "document",
                      "document": {
                          "link": UploadedFile,
                          "caption": generatedmessages
                      }
                  };
              }
          } else {
              fieldsItem = {
                  "messaging_product": "whatsapp",
                  "recipient_type": "individual",
                  "to": MobileNumber,
                  "type": "text",
                  "text": {
                      "preview_url": true,
                      "body": generatedmessages
                  }
              };
          }

          const sendMessage = () => {
              return new Promise((resolve, reject) => {
                  FB.api(`${whatsappCred.phone_id}/messages`, 'POST', fieldsItem, (data) => {
                      if (!data || data.error) {
                          TotalFail++;
                          reject(data.error || new Error('Unknown error'));
                      } else {
                          TotalSent++;
                          resolve(data);
                      }
                  });
              });
          };

          const responseData = await sendMessage();

          if (responseData?.messages && responseData.messages.length > 0) {
              const result = await WhatsappMessageList.create({
                  user_id: userData.session.user.id,
                  wamessageid: responseData.messages[0].id,
                  generatedmessages,
                  ChatFrom: FromNumber,
                  status: "sent",
                  MobileNumber: MobileNumber,
                  Fullname: responseData.messages[0].FullName || responseData.messages[0].FromNumber,
                  SentFromWhatsapp: false,
              });

              return NextResponse.json({ success : true }, { status: 200 });
          } else {
              return NextResponse.json({ message: responseData.error?.message || 'Unknown error occurred' }, { status: 400 });
          }

      } catch (error) {
          console.error('Error processing request:', error);
          return NextResponse.json({ message: error.message }, { status: 500 });
      }
  } else {
      return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
  }
}
