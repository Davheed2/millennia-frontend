"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { useSession } from "@/store";
import {
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  Paperclip,
} from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { socketService } from "@/lib/socket/socketService";
import { cn } from "@/lib/utils";
import { useGetChatMessages, markMessageAsRead } from "@/lib/chat.api";
import { ChatMessage } from "@/interfaces";

export default function SupportChat() {
  const { user } = useSession((state) => state);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [showAutoReply, setShowAutoReply] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userId = user && user[0]?.id;

  const {
    data: messages = [],
    isLoading,
    refetch: refetchMessages,
  } = useGetChatMessages(userId || "");
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Connect to socket service when component mounts
    socketService.connect();

    socketService.onMessageReceived(() => {
      refetchMessages();
    });

    socketService.onUserTyping(() => {
      setIsTyping(true);
      if (typingTimeout) clearTimeout(typingTimeout);
      const timeout = setTimeout(() => setIsTyping(false), 3000);
      setTypingTimeout(timeout);
    });

    socketService.onUserStopTyping(() => {
      setIsTyping(false);
      if (typingTimeout) clearTimeout(typingTimeout);
    });

    return () => {
      socketService.disconnect();
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [refetchMessages, typingTimeout]);

  const formatDate = (date: string | Date | null) => {
    if (!date) return "";
    const messageDate = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffHours =
      (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

    if (diffHours < 24) {
      return format(messageDate, "h:mm a");
    } else if (diffHours < 48) {
      return `Yesterday, ${format(messageDate, "h:mm a")}`;
    } else {
      return format(messageDate, "MMM d, h:mm a");
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !userId) return;

    try {
      socketService.sendMessage({
        senderId: userId,
        content: newMessage,
      });

      setNewMessage("");
      refetchMessages();

      if (!showAutoReply) {
        const firstConversation = messages.filter(
          (msg) => msg.senderId === userId
        );

        if (firstConversation.length < 1) {
          setTimeout(() => {
            setShowAutoReply(true);
            scrollToBottom();
          }, 1000);
        }
      }
    } catch (error) {
      toast.error("Error", {
        description:
          String(error) || "Failed to send message. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (!messages?.length) return;

    const selectedConversation = messages.filter(
      (msg) => msg.senderId !== userId
    );

    if (selectedConversation.length) {
      (async () => {
        for (const message of selectedConversation) {
          try {
            await markMessageAsRead(message.id);
          } catch (error) {
            console.error("Failed to mark message as read", error);
          }
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Create the auto-reply message object
  const autoReplyMessage: ChatMessage = {
    id: 9999999999999999, 
    senderId: "0", 
    recipientId: userId,
    content:
      "Thank you for your message. Our support team will get back to you shortly.",
    created_at: new Date(),
    updated_at: new Date(),
  };

  // Combine regular messages with the auto-reply if needed
  const displayMessages = showAutoReply
    ? [...messages, autoReplyMessage]
    : messages;

  return (
    <>
      <div className="space-y-6 mt-16 lg:mt-0">
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
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-invest"></div>
                </div>
              ) : (
                <ScrollArea className="h-full scrollbar-hide">
                  <div className="space-y-4">
                    {displayMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.senderId === userId
                            ? "justify-end"
                            : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg p-3",
                            message.senderId === userId
                              ? "bg-invest text-white rounded-tr-none"
                              : "bg-gray-100 rounded-tl-none"
                          )}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center gap-1 mt-1 md:mt-0 md:ml-4">
                              <span className="text-xs opacity-70 whitespace-nowrap">
                                {formatDate(message.created_at)}
                              </span>
                              {message.senderId === userId &&
                                (message.recipientId !== userId ? (
                                  <CheckCircle className="h-3 w-3 opacity-70 flex-shrink-0" />
                                ) : (
                                  <Clock className="h-3 w-3 opacity-70 flex-shrink-0" />
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex gap-1">
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                        <span>Support is typing...</span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              )}
            </CardContent>
            <CardFooter className="pt-4 pb-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex w-full gap-2"
              >
                <Button type="button" variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-grow"
                />
                <Button
                  type="submit"
                  className="bg-invest hover:bg-invest-secondary text-white"
                  disabled={!newMessage.trim()}
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
