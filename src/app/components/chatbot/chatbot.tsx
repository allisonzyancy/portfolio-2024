'use client';
// src/components/Chat.tsx
import { KeyboardEventHandler, useEffect, useState } from 'react';
import Message from './message';
import OpenAI from 'openai';
import { MessageDto } from '@/models/MessageDto';
import { ArrowLink } from '../arrow-link';
import { ArrowDownConvo, TypingDots } from '../icons';

function scrollChatWindow () {
  const chatWindow = document.querySelector('#chatWindow');
      chatWindow?.scrollTo(0, chatWindow?.scrollHeight);
}

interface ChatbotProps {
  fullVersion?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ fullVersion = false }) => {
  const [ isWaiting, setIsWaiting ] = useState<boolean>(false);
  const [ messages, setMessages ] = useState<Array<MessageDto>>(new Array<MessageDto>());
  const [ input, setInput ] = useState<string>('');
  const [ assistant, setAssistant ] = useState<any>(null);
  const [ thread, setThread ] = useState<any>(null);
  const [ openai, setOpenai ] = useState<any>(null);
  const [ hasError, setHasError ] = useState<boolean>(false);

  useEffect(() => {
    if (messages.length) {
      scrollChatWindow();
    }
  }, [ messages.length ]);

  useEffect(() => {
    try {
      initChatBot();
    } catch (e) {
      console.error(e);
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    setMessages([
      {
        content: "Hi, I'm Allison's personal assistant. How can I help you?",
        isUser: false
      }
    ])
  }, [ assistant ]);

  const initChatBot = async () => {
    const openaiClient = new OpenAI({
      // apiKey: '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',
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });

    const assistantClient:any = await openaiClient.beta.assistants.create({
      name: "Allison's Assistant",
      instructions: "You are an expert about my career and experience in the development industry.",
      tools: [{ type: "code_interpreter" }, { type: "file_search" }],
      model: "gpt-4-turbo"
    });

    await openaiClient.beta.assistants.update(assistantClient.id, {
      tool_resources: { file_search: { vector_store_ids: [ 'vs_GhI00Wfiq4oBx0kF2CAFAeDO' ] } },
    });

    const thread = await openaiClient.beta.threads.create();

    console.log(assistantClient);

    setOpenai(openaiClient);
    setAssistant(assistantClient);
    setThread(thread);
  };

  const createNewMessage = (content: string, isUser: boolean): MessageDto => {
    const newMessage = new MessageDto(isUser, content);

    return newMessage;
  }

  const handleSendMessage = async () => {
    messages.push(createNewMessage(input, true));
    setMessages([...messages]);
    setInput("");

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: input
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id
    });

    let response = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    while (response.status === 'in_progress' || response.status === 'queued') {
      setIsWaiting(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      response = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    setIsWaiting(false);

    const messageList = await openai.beta.threads.messages.list(thread.id);

    const lastMessage = messageList.data
      .filter((message: any) => message.run_id === run.id && message.role === 'assistant')
      .pop();

    if (lastMessage) {
      setMessages([...messages, createNewMessage(lastMessage.content[0]["text"].value, false)]);
    }
  }

   // detect enter key and send message
   const handleKeyPress:KeyboardEventHandler<HTMLTextAreaElement> = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!input || isWaiting) return;
      handleSendMessage();
    }
  };

  const msgWindowClasses = [
    'w-full p-8 bg-slate-800/50 items-start flex-1 overflow-y-scroll lg:block scrollbar-track-slate-200/15 scrollbar-thumb-pink-300 scrollbar-thin backdrop-blur scroll-smooth',
    !fullVersion ? 'max-h-96 hidden' : '',
    fullVersion ? 'lg:min-h-96 min-h-96' : ''
  ].join(' ');

  const formClasses = [
    'bg-slate-800 shadow-md rounded mb-3 lg:block relative',
    !fullVersion ? 'hidden' : ''
  ].join(' ');

  return (
    <div className="w-full flex-1 flex flex-col justify-end">
      {
        !fullVersion && (
          <h3 className="text-md font-semibold text-slate-200">Want to know more?
            <strong className="hidden lg:inline ml-2">Ask my OpenAI assistant!</strong>
            <ArrowLink href="/assistant" arrowDirection="right" className="!text-pink-300 font-medium *:hover:text-pink-500 lg:hidden ml-2">Ask my OpenAI assistant!</ArrowLink>
          </h3>
        )
      }
      <span className="text-xs text-pink-300 font-light mb-3 hidden lg:block">Fueled by OpenAI Assistant</span>
      <div className={msgWindowClasses}
        id="chatWindow"
        style={{ flex: '1 1 1rem' }}
      >
        {messages.map((message, index) => (
          <Message key={`message-${index}`} message={message} />
        ))}
        { isWaiting && (
          <div className="convo-dots bg-slate-700/50 p-3 rounded-lg w-auto justify-self-start inline-block">
            <TypingDots />
          </div>
        )}
      </div>
      <form
        className={formClasses}
        onSubmit={handleSendMessage}
      >
        <textarea
          className="w-full p-8 bg-transparent resize-none"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          required
          disabled={isWaiting}
          maxLength={50}
        />
        <span className="text-xs text-pink-300 absolute bottom-2 right-2">
          {input.length}/50
        </span>
        <div className="absolute inline-block -top-16 right-6 text-pink-300 bg-slate-900 rounded-full p-2 border-pink-400 border-solid border opacity-50 transition-opacity hover:opacity-100 cursor-pointer"
          onClick={() => scrollChatWindow()}
        >
          <ArrowDownConvo />
        </div>
      </form>
      {
        !fullVersion && (
          <ArrowLink href="/assistant" arrowDirection="right" className="!text-pink-300 font-medium *:hover:text-pink-400 text-sm hidden lg:block">Expand for full version</ArrowLink>
        )
      }
    </div>
  );
};

export default Chatbot;