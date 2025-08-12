import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Generating...');

  useEffect(() => {
    let interval;
    if (isLoading) {
      const dots = ['.', '..', '...'];
      let dotIndex = 0;
      interval = setInterval(() => {
        setLoadingText(`Generating${dots[dotIndex]}`);
        dotIndex = (dotIndex + 1) % dots.length;
      }, 500);
    } else {
      setLoadingText('Generating...');
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = { role: 'user', parts: [{ text: inputValue }] };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    const history = newMessages.slice(0, -1);
    const message = inputValue;

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gemini/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ history, message }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiResponse = '';
    let firstChunk = true;

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setIsLoading(false);
        break;
      }
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          if (firstChunk) {
            setMessages([...newMessages, { role: 'model', parts: [{ text: '' }] }]);
            firstChunk = false;
          }
          const json = JSON.parse(line.substring(6));
          const textPart = json.candidates[0].content.parts[0].text;
          aiResponse += textPart;
          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1] = { role: 'model', parts: [{ text: aiResponse }] };
            return updatedMessages;
          });
        }
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button 
        className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg"
        onClick={toggleChat}
      >
        AI
      </button>
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-lg shadow-lg flex flex-col">
          <div className="bg-purple-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h2 className="text-lg font-semibold">NutriGuide AI</h2>
            <button onClick={toggleChat} className="text-white text-xl">&times;</button>
          </div>
          <div className="flex-grow p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 p-2 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-purple-500 text-white self-end ml-auto' : 'bg-gray-200 text-black self-start'}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.parts[0].text}</ReactMarkdown>
              </div>
            ))}
            {isLoading && (
              <div className="my-2 p-2 rounded-lg max-w-xs bg-gray-200 text-black self-start">
                {loadingText}
              </div>
            )}
          </div>
          <div className="p-3 border-t border-gray-200 flex">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask something..."
              className="flex-grow border rounded-full py-2 px-4 mr-2"
            />
            <button onClick={handleSendMessage} className="bg-purple-500 text-white rounded-full px-4 py-2">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
