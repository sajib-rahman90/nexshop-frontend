"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, Send, Bot, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollShadow } from "@heroui/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content: "Hi there! I'm Nex, your AI shopping assistant. How can I help you find the perfect product today?",
  }
];

const SUGGESTIONS = [
  "Recommend a smartwatch for fitness",
  "What are the best noise-cancelling headphones?",
  "I need a smart home hub under $600",
  "Show me the latest VR headsets"
];

export default function AIPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const query = text || input;
    if (!query.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: query }]);
    setInput("");
    setIsTyping(true);

    // Call backend API
    try {
      const { data } = await api.post("/ai/chat", {
        messages: [...messages, { role: "user", content: query }]
      });

      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch (err) {
      console.error(err);
      const status = err?.response?.status;
      if (status === 429) {
        toast.error("AI quota exceeded. Please wait a moment and try again.");
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "⚠️ I'm temporarily unavailable due to API quota limits. Please try again in a minute!"
        }]);
      } else if (status === 500 && err?.response?.data?.message?.includes('GEMINI_API_KEY')) {
        toast.error("Gemini API key not configured in backend.");
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "❌ The AI service is not configured. Please add your GEMINI_API_KEY to the backend .env file."
        }]);
      } else {
        toast.error("Failed to connect to Nex AI. Please try again.");
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col py-6" style={{ background: "var(--background)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl flex-1 flex flex-col">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 mb-4 text-white shadow-lg">
            <Sparkles size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
            AI Shopping Assistant
          </h1>
          <p className="opacity-60" style={{ color: "var(--foreground)" }}>
            Ask me anything. I'll help you find exactly what you need.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl mb-6">

          {/* Messages Area */}
          <ScrollShadow className="flex-1 p-6" ref={scrollRef}>
            <div className="space-y-6">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gradient-to-br from-emerald-400 to-blue-500 text-white"
                    }`}>
                    {msg.role === "user" ? (user ? user.name?.[0].toUpperCase() : <User size={18} />) : <Bot size={18} />}
                  </div>

                  <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                        ? "bg-blue-500 text-white rounded-tr-sm"
                        : "bg-gray-100 dark:bg-gray-800 rounded-tl-sm text-gray-800 dark:text-gray-200"
                      }`}>
                      {msg.content}
                    </div>
                    {msg.link && (
                      <Button
                        as={Link}
                        href={msg.link}
                        size="sm"
                        color="primary"
                        variant="flat"
                        endContent={<ArrowRight size={14} />}
                      >
                        View Recommendations
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 text-white flex items-center justify-center shrink-0">
                    <Bot size={18} />
                  </div>
                  <div className="px-5 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 rounded-tl-sm flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollShadow>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-6 pb-2 pt-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me to find products, compare features, or recommend gifts..."
                className="w-full pl-5 pr-14 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-900 transition-all text-sm"
                style={{ color: "var(--foreground)" }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
            <p className="text-center text-[10px] text-gray-400 mt-3">
              Nex Assistant can make mistakes. Consider verifying important details on product pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
