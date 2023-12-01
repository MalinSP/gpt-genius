"use client";

import { generateChatResponse } from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

type MessageChat = { role: string; content: string };

const Chat = () => {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Array<object>>([]);

  const { mutate } = useMutation({
    mutationFn: (query: any) => generateChatResponse([...messages, query]),
    onSuccess: (data) => {
      console.log(data);
      if (!data) {
        toast.error("Something went wrong...");
        return;
      }
      setMessages((prev) => [...prev, data]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query: MessageChat = { role: "user", content: text };
    mutate(query);
    console.log(messages);
    setMessages((prev: Array<object>) => [...prev, query]);
    setText("");
  };
  console.log(messages);
  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl">messages</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message GeniusGPT"
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary join-item" type="submit">
            ask question
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
