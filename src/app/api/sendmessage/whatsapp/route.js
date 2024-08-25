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
        const sendMessage = async (fieldsItem, recipient) => {
            return new Promise((resolve) => {
                FB.api(whatsappCredentialsData[0].phone_id + '/messages', 'POST', fieldsItem, async function (data) {
                if (!data || data.error) {
                    TotalFail++;
                    resolve(false);
                } else {
                    TotalSent++;
                    resolve(true);
                }
                if (data.messages && data.messages.length > 0) {
                    // let sendData = {
                    // accountId : whatsappCredentialsData[0].user_id,
                    // FromNumber : FromNumber,
                    // Fullname: FromNumber,
                    // MobileNumber: MobileNumber,
                    // Email: "",
                    // messageList : [{
                    //     wamessageid : data.messages[0].id,
                    //     CampaignTemplateId :'',
                    //     generatedmessages: generatedmessages,
                    //     FileUploaded : UploadedFile,
                    //     BtnURL : BTNUrl,
                    //     FileType: FileType,
                    //     ChatFrom: '0',
                    //     status : data.messages[0].message_status,
                    //     templateType : whatsappCredentialsData[0].templateType,
                    //     BtnPayload : BTNPayload,
                    //     BtnPhone : BTNPhone,
                    // }]
                    // } 
                    
                    const result = await WhatsappMessageList.create({
                        user_id: userData.session.user.id, // Assuming `user_id` is the primary key or identifier in your table
                        wamessageid : data.messages[0].id,
                        generatedmessages,
                        ChatFrom: FromNumber,
                        status: "sent",
                        MobileNumber: MobileNumber,
                        Fullname: data.messages[0].FullName ? data.messages[0].FullName : data.messages[0].FromNumber
                    });
        
                    return NextResponse.json(result, {
                        status: 200
                    });
                }
                });
            });
        };

        let fieldsItem
        if (whatsappCredentialsData[0].variableFileDynamicValue) {
            const imageFileID = whatsappCredentialsData[0].variableFileDynamicValue.fileId;
            const imageFileName = whatsappCredentialsData[0].variableFileDynamicValue.fileName;
            UploadedFile = await `https://whatsapp.dhweninfotech.com/api/fileuploadbucket/${imageFileID}/${imageFileName}`;

            const fileExtension = whatsappCredentialsData[0].variableFileDynamicValue.fileName.split('.').pop().toLowerCase();
            let imageType;
            if (fileExtension === 'png') {
                FileType = "IMAGE";
                fieldsItem = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": mobileNumber,
                "type": "image",
                "image": {
                    "link" : UploadedFile,
                    "caption" :generatedmessages
                }
                };
            } else if (fileExtension === 'mp4' || fileExtension === '3gpp') {
                FileType = "VIDEO";
                fieldsItem = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": mobileNumber,
                "type": "video",
                "video": {
                    "link" : UploadedFile,
                    "caption" :generatedmessages
                }
                };
            } else if (fileExtension === 'pdf' || fileExtension === 'xlx' || fileExtension === 'xlsx' || fileExtension === 'csv') {
                FileType = "DOCUMENT";
                fieldsItem = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": mobileNumber,
                "type": "document",
                "document": {
                    "link" : UploadedFile,
                    "caption" :generatedmessages
                }
                };
            } else if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
                FileType = "IMAGE";
                fieldsItem = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": mobileNumber,
                "type": "image",
                "image": {
                    "link" : UploadedFile,
                    "caption" :generatedmessages
                }
                };
            }
        }else{
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

        // Wait for the sendMessage function to complete before moving to the next iteration
        await sendMessage(fieldsItem,FromNumber);

        return NextResponse.json({ success: true }, { status: 200 });
      } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
    }
  }