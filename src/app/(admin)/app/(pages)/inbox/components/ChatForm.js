import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import { Send, AttachSquare } from 'iconsax-react';

const ChatForm = ({ onNewMessage }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [formData, setFormData] = useState({
    platform: "Whatsapp",
    platform_id: "1",
    generatedmessages: "",
    FromNumber: "15550043811",
    MobileNumber: "917405076858",
    variableFileDynamicValue: {
      fileId: "",
      fileName: ""
    }
  });

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    // const formData = new FormData();
    // formData.append('file', e.target.files[0]);

    // try {
    //   if (e.target.files && e.target.files.length > 0) {
    //     const response = await fetch(`/api/fileuploadbucket`, {
    //       method: 'POST',
    //       body: formData,
    //     });
    //     const data = await response.json();

    //     if (data.response === "1") {
    //       setFormData(prevFormData => ({
    //         ...prevFormData,
    //         variableFileDynamicValue: {
    //           fileId: data.data,
    //           fileName: data.filename
    //         },
    //       }));

    //       const fileGetResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/fileuploadbucket/${data.data}/${data.filename}`);
    //       const fileGetData = await fileGetResponse.json();

    //       if (fileGetData.response === "1") {
    //         console.log(fileGetData);
    //       }
    //     } else {
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    // }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
debugger;
    if (formData.generatedmessages.trim()) {
      const newMessage = { text: formData.generatedmessages, sender: 'user' };
      onNewMessage(newMessage);
      setFormData({ ...formData, generatedmessages: '' });
    }
    
    try {
      const response = await fetch(`/api/sendmessage/whatsapp`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.response === '1') {
        setFormData({ ...formData, generatedmessages: '', file: null });
        setIsHidden(true);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const onEmojiClick = (event) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      generatedmessages: prevFormData.generatedmessages + event.emoji,
    }));
    setIsHidden(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/sendmessage/whatsapp`);
        const data = await response.json();

        if (data.response === "1" && data.data && data.data.length > 0) {
          setFormData({
            fullname: data.Fullname,
            MobileNumber: data.MobileNumber,
            phonenumberid: data.data[0].phonenumberid,
            FromNumber: data.data[0].mobilenumber,
            accessToken: data.data[0].token
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [formData.accountId]);

  return (
    <div className="m-2 flex">
      <form onSubmit={handleFormSubmit} className="w-full" encType="multipart/form-data">
        <div className="container-fluid">
          <div className="flex items-center relative">
            <div className="mr-2">
              <label htmlFor="fileInput" className="cursor-pointer">
                <AttachSquare />
              </label>
              <input type="file" name="fileInput" className="hidden" onChange={handleFileChange} />
            </div>
            <div className="mr-2 flex items-center">
              <img 
                src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f603.png" 
                onClick={toggleVisibility} 
                alt="smile" 
                className="w-8 h-8 cursor-pointer" 
              />
              {!isHidden && (
                <Picker 
                  style={{ position: "absolute", bottom: 14, left: 2, zIndex: 999 }} 
                  autoFocus={false} 
                  onEmojiClick={onEmojiClick} 
                />
              )}
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                placeholder={formData.variableFileDynamicValue.fileId ? 'Enter Caption' : 'Enter Message'} 
                name="generatedmessages" 
                value={formData.generatedmessages} 
                onChange={handleInputChange} 
                className="w-full h-10 px-3 border border-gray-300 rounded" 
              />
            </div>
            <div className="ml-2">
              <button className="bg-blue-500 text-white p-2 rounded" type='submit'>
                <Send size="24" color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
