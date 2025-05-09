"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
//import { useAuth } from "@/contexts/AuthContext";
import {
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
//import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  sender: "user" | "admin";
  content: string;
  timestamp: Date;
  read: boolean;
};

// Sample messages for demonstration
const SAMPLE_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "admin",
    content:
      "Hello! Welcome to Millennia Trades support. How can we help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
  },
  {
    id: "2",
    sender: "user",
    content:
      "Hi, I have a question about my investment portfolio. I'm trying to diversify but not sure where to start.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 10), // 10 minutes after previous message
    read: true,
  },
  {
    id: "3",
    sender: "admin",
    content:
      "I'd be happy to help with your portfolio diversification! Based on your current investments, I would recommend looking into some ETFs that cover different market sectors you don't currently have exposure to. Is there a particular goal you're trying to achieve with your diversification?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 20), // 20 minutes after first message
    read: true,
  },
  {
    id: "4",
    sender: "user",
    content:
      "I'm mostly looking to reduce risk while maintaining similar returns. I currently have a lot of tech stocks.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: true,
  },
  {
    id: "5",
    sender: "admin",
    content:
      "That makes sense. Since you already have significant tech exposure, I would suggest adding some ETFs that focus on other sectors like healthcare, utilities, or consumer staples. These tend to be less correlated with tech and can help reduce overall portfolio volatility. Would you like me to recommend some specific ETFs to consider?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: true,
  },
];

export default function SupportChat() {
  //const { user } = useAuth();
  //const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Today, show time
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays === 1) {
      // Yesterday
      return `Yesterday, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays < 7) {
      // Within the last week
      return `${diffDays} days ago, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      // Older than a week
      return date.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
      read: false,
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate admin response after 1 second
    setTimeout(() => {
      const adminResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "admin",
        content:
          "Thank you for your message. Our support team will get back to you shortly.",
        timestamp: new Date(),
        read: false,
      };

      setMessages((prev) => [...prev, adminResponse]);

      //   toast({
      //     title: "Message Sent",
      //     description: "Our team will respond shortly.",
      //   });
    }, 1000);
  };

  return (
    <>
      <div className="space-y-6 mt-16 md:mt-0">
        <div>
          <h1 className="text-2xl font-bold">Support Chat</h1>
          <p className="text-muted-foreground mt-2">
            Chat with our support team for assistance with your investments
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="md:col-span-3 glass-card flex flex-col h-[70vh]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-invest" />
                Millennia Trades Support
              </CardTitle>
              <CardDescription>
                Our team typically responds within 1 hour during business hours
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="flex-grow overflow-auto pt-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-invest text-white rounded-tr-none"
                          : "bg-gray-100 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs opacity-70">
                          {formatDate(message.timestamp)}
                        </span>
                        {message.sender === "user" &&
                          (message.read ? (
                            <CheckCircle className="h-3 w-3 opacity-70" />
                          ) : (
                            <Clock className="h-3 w-3 opacity-70" />
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="pt-4 pb-3">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button
                  type="submit"
                  className="bg-invest hover:bg-invest-secondary text-white"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Support Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Monday - Friday</dt>
                    <dd className="font-medium">9:00 AM - 8:00 PM EST</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Saturday</dt>
                    <dd className="font-medium">10:00 AM - 4:00 PM EST</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Sunday</dt>
                    <dd className="font-medium">Closed</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
