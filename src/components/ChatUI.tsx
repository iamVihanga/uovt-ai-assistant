'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import Avatar from './Avatar';
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { model, chatHistory } from "@/lib/geminiClient";
import type { RootState } from "@/app/GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import { addToMessages, removeFromMessage } from "@/app/GlobalRedux/Features/message/messageSlice";
import TypingDots from './TypingDots';
import ReactMarkdown from 'react-markdown'

type Props = {}

function ChatUI({ }: Props) {
  const messages = useSelector((state: RootState) => state.message.messages);
  const dispatch = useDispatch()
  const bottomEl = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState<string>("")
  const [responseError, setResponseError] = useState<string>('')

  const getResponse = async (prompt: string) => {
    try {
      const typingMessage: ConversationType = {
        id: Math.floor(Math.random() * 10000) + 1,
        message: 'typing-indicator',
        user: 'ai'
      }

      dispatch(addToMessages(typingMessage))

      const chat = await model.startChat({ history: chatHistory });
      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();

      dispatch(removeFromMessage('typing-indicator'))
      return {
        user_prompt: prompt,
        response: text
      };
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
        setResponseError(errorMessage!)
      }
    };
  }

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;

    // Add user message to conversation
    const userMessage: ConversationType = {
      id: Math.floor(Math.random() * 10000) + 1,
      message: message,
      user: 'user',
    };

    dispatch(addToMessages(userMessage))
    setMessage('');

    // Get AI response
    const ai_response = await getResponse(message);

    // Add AI response to conversation
    const aiMessage: ConversationType = {
      id: Math.floor(Math.random() * 10000) + 1,
      message: ai_response?.response!,
      user: 'ai',
    };

    dispatch(addToMessages(aiMessage))

    // ------------ Modify Chat History -----------------
    let newUserRole = {
      role: "user",
      parts: ai_response?.user_prompt,
    };
    let newAIRole = {
      role: "model",
      parts: ai_response?.response,
    };

    chatHistory.push(newUserRole);
    chatHistory.push(newAIRole);
  };

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  return (
    <div className="min-h-screen flex flex-col bg-gray-200 relative">
      {/* Top Bar */}
      <div className="fixed z-50 top-0 h-16 w-full bg-gray-900 flex items-center py-2 px-3 shadow-lg">
        <div className="flex w-full items-center justify-between">
          {/* Left Content */}
          <div className="flex items-center gap-x-2">
            <Avatar isOnline dot userType='ai' />
            <div className="">
              <h2 className='font-bold  text-sm text-cyan-500'><span className='text-green-500 font-medium'>Hello</span> UOVT</h2>
              <p className='text-[10px] text-gray-200 -mt-0.5'>University AI Assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- Conversation Area ---------------------- */}
      <div className="flex-1 flex flex-col justify-end gap-y-3 py-20 px-3 overflow-y-auto">
        {messages.map(messageObj => (
          <div key={messageObj.id} className={`flex items-start gap-2 ${messageObj.user === 'user' ? 'justify-start' : 'flex-row-reverse'}`}>
            {messageObj.user === 'user' && <Avatar userType='user' />}
            {messageObj.user === 'ai' && <Avatar userType='ai' />}

            {(messageObj.message !== 'typing-indicator' && messageObj.user === 'user') && (
              <p className={`user-chat-bg text-white py-2 px-3 text-xs rounded-xl shadow-md`}>
                {messageObj.message}
              </p>
            )}

            {(messageObj.message !== 'typing-indicator' && messageObj.user === 'ai') && (
              <ReactMarkdown className={'ai-chat-bg ml-5 text-white py-2 px-3 text-xs rounded-xl shadow-md whitespace-pre-wrap'}>
                {messageObj.message}
              </ReactMarkdown>
            )}

            {messageObj.message === 'typing-indicator' &&
              <div className={`ai-chat-bg py-3 px-3 text-xs rounded-xl shadow-md`}>
                <TypingDots />
              </div>
            }

          </div>
        ))}
        <div ref={bottomEl}></div>
      </div>
      {/* ------------------------------------------------------------- */}

      {/* Bottom Bar */}
      <div className="fixed z-50 bottom-0 h-16 w-full bg-gray-300 flex items-center py-2 px-3 shadow-lg">
        <form onSubmit={handleSendMessage} className="flex gap-x-1 w-full items-center justify-between">
          <Input
            className='rounded-full border border-gray-500 bg-gray-200 text-xs placeholder:text-gray-400 '
            placeholder='Type your message here...'
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button type='submit' size={"default"} className='rounded-full border-gradient shadow-lg'>
            <PaperAirplaneIcon className='w-5 h-5 text-blue-900' strokeWidth={2} />
          </Button>
        </form>
      </div>
    </div >
  )
}

export default ChatUI