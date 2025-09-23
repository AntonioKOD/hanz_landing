"use client";

import { useState, useRef, useEffect } from "react";
// Custom chat implementation since ai/react doesn't exist in v5
import { Send, X, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInterfaceProps {
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
  businessType: string;
}

export function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hallo! Ich bin dein Hanz-Assistent. Hanz ist die innovative Plattform für Dienstleister in Deutschland, die eine neue Art der Kundenakquise bietet. Wie kann ich dir heute helfen? Erzähle mir gerne, in welchem Bereich du tätig bist oder welche Fragen du zu Hanz hast!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
    businessType: ''
  });
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  // Custom input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Custom submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      let assistantMessage = '';
      const assistantMessageId = Date.now().toString() + '_assistant';

      // Add empty assistant message
      setMessages(prev => [...prev, {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
      }]);

      // Stream the response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        console.log('Received chunk:', chunk); // Debug log
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.trim()) {
            console.log('Processing line:', line); // Debug log
            // Try different formats that AI SDK v5 might use
            let content = '';
            
            if (line.startsWith('0:')) {
              content = line.slice(2);
            } else if (line.startsWith('data: ')) {
              content = line.slice(6);
            } else if (line.startsWith('"')) {
              // JSON format
              try {
                const parsed = JSON.parse(line);
                content = parsed.content || parsed.text || '';
              } catch (e) {
                // If not JSON, treat as plain text
                content = line;
              }
            } else {
              // Plain text
              content = line;
            }
            
            if (content) {
              assistantMessage += content;
              
              // Update the assistant message
              setMessages(prev => prev.map(msg => 
                msg.id === assistantMessageId 
                  ? { ...msg, content: assistantMessage }
                  : msg
              ));
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      setMessages(prev => [...prev, {
        id: Date.now().toString() + '_error',
        role: 'assistant',
        content: 'Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Contact form handlers
  const handleContactFormChange = (field: keyof ContactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingForm(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          to: 'antonio_kodheli@icloud.com',
          subject: 'Neue Anfrage von Hanz Chatbot'
        }),
      });

      if (response.ok) {
        // Add success message to chat
        setMessages(prev => [...prev, {
          id: Date.now().toString() + '_success',
          role: 'assistant',
          content: 'Vielen Dank! Deine Nachricht wurde erfolgreich an unser Team gesendet. Wir melden uns schnellstmöglich bei dir zurück!'
        }]);
        
        // Reset form and hide it
        setContactForm({ name: '', email: '', message: '', businessType: '' });
        setShowContactForm(false);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString() + '_error',
        role: 'assistant',
        content: 'Entschuldigung, es gab einen Fehler beim Senden deiner Nachricht. Bitte versuche es später erneut oder kontaktiere uns direkt.'
      }]);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Hanz Assistent</h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" ? "bg-gray-600" : "bg-blue-600"
                  }`}
                >
                  {message.role === "user" ? (
                    <User size={12} className="text-white" />
                  ) : (
                    <Bot size={12} className="text-white" />
                  )}
                </div>
                <div
                  className={`px-3 py-2 rounded-lg text-sm ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.content.includes('kann ich dir nicht helfen') || message.content.includes('keine Antwort') ? (
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                    >
                      Kontaktformular öffnen
                    </button>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Bot size={12} className="text-white" />
              </div>
              <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Contact Form */}
      {showContactForm && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h4 className="font-semibold text-gray-900 mb-3">Kontaktformular</h4>
          <form onSubmit={handleContactFormSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Dein Name"
              value={contactForm.name}
              onChange={(e) => handleContactFormChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Deine E-Mail"
              value={contactForm.email}
              onChange={(e) => handleContactFormChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={contactForm.businessType}
              onChange={(e) => handleContactFormChange('businessType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Dein Geschäftsbereich</option>
              <option value="Bau & Renovierung">Bau & Renovierung</option>
              <option value="Elektrik">Elektrik</option>
              <option value="Sanitär & Heizung">Sanitär & Heizung</option>
              <option value="Garten & Außenbereich">Garten & Außenbereich</option>
              <option value="Transport & Umzug">Transport & Umzug</option>
              <option value="Auto & Motoring">Auto & Motoring</option>
              <option value="Business-Services">Business-Services</option>
              <option value="Gesundheit & Schönheit">Gesundheit & Schönheit</option>
              <option value="Events & Kultur">Events & Kultur</option>
              <option value="Möbel & Tischlerarbeiten">Möbel & Tischlerarbeiten</option>
              <option value="Reinigung">Reinigung</option>
              <option value="Bildung">Bildung</option>
            </select>
            <textarea
              placeholder="Deine Nachricht"
              value={contactForm.message}
              onChange={(e) => handleContactFormChange('message', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              required
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={isSubmittingForm}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
              >
                {isSubmittingForm ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>
              <button
                type="button"
                onClick={() => setShowContactForm(false)}
                className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Schreibe deine Nachricht..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by Hanz • Deine smarte Plattform für mehr Geschäft
        </p>
      </div>
    </div>
  );
}
