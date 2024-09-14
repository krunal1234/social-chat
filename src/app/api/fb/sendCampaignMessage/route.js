// pages/api/sendCampaignMessage.js

import axios from 'axios';
import FB from 'fb'; // Ensure FB is correctly set up for your project
import ContactsList from '../../../../../utils/supabase/backend/contacts/contacts';
import { NextResponse } from 'next/server';
import WhatsappCampaignsList from '../../../../../utils/supabase/backend/campaigns/campaigns';
import auth from '../../../../../utils/supabase/auth';
import WhatsappMessageList from '../../../../../utils/supabase/backend/messageList/whatsapp/messageList';

export async function POST(request) {
    if (request.method === 'POST') {
        try {
            const userData = await auth.getSession();
            const data = await request.json();

            let UploadedFile, BTNUrl, BTNPhone, BTNPayload, FileType,  BtnURLText, BtnUrlOrigin, generatedmessages;
            let { CampaignName, CampaignOwnerName, CampaignTemplateId, FromNumber, Recipients, accessToken, business_id, phonenumberid, templateType, variableBodyDynamicValue, variableButtonDynamicValue, variableFileDynamicValue} = data;

            // Check if the campaign name already exists
            const existingCampaign = await WhatsappCampaignsList.findOne(CampaignName);
            if (existingCampaign.length > 0) {
                return NextResponse.json({
                    response: "-2",
                    message: "Campaign Name Already Taken"
                }, { status: 200 });
            }
            
            let TotalSent = 0;
            let TotalFail = 0;
            FB.setAccessToken(accessToken);

            // Create a function to handle the asynchronous FB.api call
            const sendMessage = async (fieldsItem, recipient) => {
                return new Promise((resolve) => {
                    FB.api(`${phonenumberid}/messages`, 'POST', fieldsItem, async function (data) {
                        if (!data || data.error) {
                            TotalFail++;
                            resolve(false);
                            } else {
                            TotalSent++;
                            resolve(true);
                            if (data.messages && data.messages.length > 0) {
                                const result = await WhatsappMessageList.create({
                                    user_id: userData.session.id,
                                    wamessageid: data.messages[0].id,
                                    generatedmessages: generatedmessages, 
                                    ChatFrom: FromNumber, 
                                    MobileNumber: recipient.mobilenumber,
                                    Fullname: recipient.fullname ? recipient.fullname : recipient.mobilenumber,
                                    status: data.messages[0].message_status, 
                                    SentFromWhatsapp: false,
                                });
                            }
                        }
                    });
                });
            };

            // Create a function to fetch the template data
            const Template = (TemplateId) => {
                return new Promise((resolve, reject) => {
                FB.api(TemplateId, function (data) {
                    if (!data || data.error) {
                    reject(!data ? 'error occurred' : data.error);
                    } else {
                    resolve(data);
                    }
                });
                });
            };
            // Use Promise.all to wait for all sendMessage promises to complete
            await Promise.all(
                Recipients.map(async (recipient) => {
                let indexButton;
                const contactValues = await ContactsList.findById(recipient.id);
                const templateData = await Template(CampaignTemplateId);

                templateData.components.forEach((component) => {
                    if (component.type === "BUTTONS") {
                    component.buttons.forEach((button, index) => {
                        if (button.example) {
                        indexButton = index;
                        }
                        if (button.type === "URL") {
                        BtnURLText = button.text;
                        BTNUrl = button.url;
                        if (variableButtonDynamicValue && variableButtonDynamicValue.buttonUrlOrigin) {
                            BtnUrlOrigin = variableButtonDynamicValue.buttonUrlOrigin;
                        }
                        }
                        if (button.type === "PHONE_NUMBER") {
                        BtnPhoneText = button.text;
                        }
                    });
                    }
                });

                if (templateData.components && templateData.components.length > 0 && templateData.components[0].type === "BODY") {
                    generatedmessages = templateData.components[0].text;
                }
                if (templateData.components && templateData.components.length > 0 && templateData.components[1].type === "BODY") {
                    generatedmessages = templateData.components[1].text;
                }
                if (templateData != null && templateData.components && templateData.components.length > 0 && templateData.components[2] && templateData.components[2].buttons && templateData.components[2].buttons.length > 0 && templateData.components[2].buttons[0].type === 'QUICK_REPLY') {
                    BTNPayload = true;
                }
                templateData.components = [];

                if (variableButtonDynamicValue && variableButtonDynamicValue.buttonUrlValue) {
                    BTNUrl = variableButtonDynamicValue.buttonUrlValue;
                    templateData.components.push({
                    "type": "button",
                    "sub_type": "url",
                    "index": indexButton,
                    "parameters": [
                        {
                        "type": "text",
                        "text": BTNUrl
                        }
                    ]
                    });
                }

                if (variableFileDynamicValue) {
                    const imageFileID = variableFileDynamicValue.fileId;
                    const imageFilePath = variableFileDynamicValue.filePath;
                    UploadedFile = `https://iztwmjuqnrnpmctznjvw.supabase.co/storage/v1/object/sign/${imageFilePath}`;

                    if (templateType === "IMAGE") {
                    FileType = "IMAGE";
                    templateData.components.push({
                        "type": "header",
                        "parameters": [
                        {
                            "type": "image",
                            "image": {
                            "link": UploadedFile
                            }
                        }
                        ]
                    });
                    }
                    if (templateType === "DOCUMENT") {
                    FileType = "DOCUMENT";
                    templateData.components.push({
                        "type": "header",
                        "parameters": [
                        {
                            "type": "document",
                            "document": {
                            "link": UploadedFile
                            }
                        }
                        ]
                    });
                    }
                    if (templateType === "VIDEO") {
                    FileType = "VIDEO";
                    templateData.components.push({
                        "type": "header",
                        "parameters": [
                        {
                            "type": "video",
                            "video": {
                            "link": UploadedFile
                            }
                        }
                        ]
                    });
                    }
                }

                if (variableBodyDynamicValue) {
                    if (generatedmessages) {
                    let pattern = /\{\{\d+\}\}/g;

                    Object.keys(variableBodyDynamicValue).forEach((key) => {
                        let values = contactValues[0][variableBodyDynamicValue[key]];
                        generatedmessages = generatedmessages.replace(
                        pattern,
                        (match) => values || match
                        );
                    });
                    }
                    templateData.components.push({
                    "type": "body",
                    "parameters": Object.keys(variableBodyDynamicValue).map(key => ({
                        "type": "text",
                        "text": contactValues[0][variableBodyDynamicValue[key]]
                    }))
                    });
                }

                let fieldsItem = {
                    "messaging_product": "whatsapp",
                    "recipient_type": "individual",
                    "to": recipient.mobilenumber,
                    "type": "template",
                    "template": {
                    "name": templateData.name,
                    "language": {
                        "code": templateData.language
                    },
                    "components": templateData.components
                    }
                };

                // Wait for the sendMessage function to complete before moving to the next iteration
                await sendMessage(fieldsItem, recipient);

                })
            );
            const Campaign = WhatsappCampaignsList.create({
                user_id: userData.session.id,
                RecipientsIds: Recipients,
                CampaignTemplateId : CampaignTemplateId,
                CampaignName : CampaignName,
                CampaignOwnerName : CampaignOwnerName,
                FromNumber : FromNumber,
                status : 1,
                IsActive : 1,
                IsDeleted : 1,
                totalSent : TotalSent,
                totalFail : TotalFail
            });

            // Update Campaign with totals
            Campaign.totalSent = TotalSent;
            Campaign.totalFail = TotalFail;

            return NextResponse.json({
                response: "1",
                message: "Message Sent Successfully",
                data: Campaign
            });
        } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' } ,{status : 500 });
        }
    } else {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` } ,{status : 405 });
    }
}
