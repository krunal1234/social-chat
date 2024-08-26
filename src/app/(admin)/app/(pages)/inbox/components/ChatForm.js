import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { Send, AttachSquare } from 'iconsax-react';
import { toast } from 'react-toastify';
import Image from 'next/image';

const ChatForm = ({ onNewMessage, FromNumber, MobileNumber , Fullname}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [formData, setFormData] = useState({ generatedmessages: '', Fullname: Fullname });

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.generatedmessages.trim()) {
      // const newMessage = { id: Date.now(), generatedmessages: formData.generatedmessages, SentFromWhatsapp: false };
      // onNewMessage(newMessage);

      try {
        const response = await fetch('/api/sendmessage/whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            ...formData, 
            FromNumber, 
            Fullname,
            MobileNumber 
          }),
        });
        const data = await response.json();

        if (data?.message) {
          toast.error(data.message);
        } else {
          setFormData({ generatedmessages: '' });
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const onEmojiClick = (event) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      generatedmessages: prevFormData.generatedmessages + event.emoji,
    }));
    setIsHidden(false);
  };

  return (
    <div className="m-2 flex">
      <form onSubmit={handleFormSubmit} className="w-full">
        <div className="container-fluid">
          <div className="flex items-center relative">
            <div className="mr-2">
              <label htmlFor="fileInput" className="cursor-pointer">
                <AttachSquare />
              </label>
              <input type="file" name="fileInput" className="hidden" />
            </div>
            <div className="mr-2 flex items-center">
              <Image 
                src={"https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f603.png"}
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
                placeholder="Enter Message" 
                name="generatedmessages" 
                value={formData.generatedmessages} 
                onChange={handleInputChange} 
                className="w-full h-10 px-3 border border-gray-300 rounded" 
              />
            </div>
            <div className="ml-2">
              <button className="bg-blue-500 text-white p-2 rounded" type="submit">
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
