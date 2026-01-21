import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, AlertCircle } from 'lucide-react'; // Added AlertCircle
import { useCoach, CoachPersonaId } from '@/context/CoachContext';
import { coachPersonaData, CoachPersona } from '@/data/coachPersonaData'; // Use CoachPersona type
import ChatMessage from '@/components/ai/ChatMessage';
import { getApiUrl } from '@/config';

// This local 'coachSelectorButtons' array is for the selector UI
const coachSelectorButtons: { id: CoachPersonaId, name: string }[] = [
  { id: 'stoic', name: 'The Stoic' },
  { id: 'operator', name: 'The Operator' },
  { id: 'nurturer', name: 'The Nurturer' },
];

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp?: string;
}

const AICoachPage: React.FC = () => {
  const { selectedCoachId, setSelectedCoachId } = useCoach();

  // Correctly find the current coach and provide a default
  const currentCoachOrDefault = coachPersonaData.find(coach => coach.id === selectedCoachId) || coachPersonaData.find(coach => coach.id === 'stoic');
  // Ensure currentCoach is not undefined before proceeding. Fallback to a default stub if necessary.
  const currentCoach: CoachPersona = currentCoachOrDefault || {
    id: 'fallback', name: 'Default Coach', title: 'Default Coach', description: 'A helpful assistant.',
    iconName: 'user', iconColor: 'text-gray-500', sampleQuote: '', cannedResponses: ["Hello! How can I help?"],
    imageUrl: '', glowColor: '#FFFFFF', glowColorRgb: '255,255,255'
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Initial greeting from the coach when selected or when component mounts with a default coach
  useEffect(() => {
    setMessages([]); // Clear previous messages when coach changes
    // Defensive check for currentCoach and cannedResponses
    const greeting = (currentCoach && currentCoach.cannedResponses && currentCoach.cannedResponses.length > 0)
      ? currentCoach.cannedResponses[0]
      : "How can I assist you today?";

    setTimeout(() => {
        setMessages([{ id: `ai-greeting-${Date.now()}`, text: greeting, sender: 'ai', timestamp: new Date().toLocaleTimeString() }]);
    }, 100);
  }, [selectedCoachId, currentCoach]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: currentMessage.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);

    try {
        // SAVAGE PROTOCOL: Use Real Mirror API
        const response = await fetch(getApiUrl('/api/mirror/roast'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ excuse: messageToSend })
        });

        const data = await response.json();

        // Handle API success or fallback
        const aiResponseText = data.roast || "System Malfunction. Re-engage.";

        const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            text: aiResponseText,
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
        // Fallback for offline/error
        const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            text: "Connection Lost. The Mirror is offline, but the standard remains. Get after it.",
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, aiMessage]);
    } finally {
        setIsTyping(false);
    }
  };

  // Fallback UI if currentCoach is somehow still not resolved (should not happen with the stub)
  if (!currentCoach || !currentCoach.id) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-neutral-900 text-neutral-100 p-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Coach Data Error</h2>
        <p className="text-neutral-400 text-center">There was an issue loading coach information. Please try again later or select a different coach.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-neutral-900 text-neutral-100">
      <header className="p-4 border-b border-neutral-700 bg-neutral-800/50">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            {currentCoach.imageUrl && (
              <img src={currentCoach.imageUrl} alt={currentCoach.name} className="w-10 h-10 rounded-full border-2" style={{borderColor: currentCoach.glowColor || '#FFFFFF'}} />
            )}
            <div>
              <h1 className="text-xl font-semibold text-neutral-100">{currentCoach.name || "AI Coach"}</h1>
              <p className="text-xs text-neutral-400">{currentCoach.description || "Your personal AI assistant."}</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          {coachPersonaData.map((persona) => (
            <div
              key={persona.id}
              className={`cursor-pointer p-2 rounded-lg border-2 ${selectedCoachId === persona.id ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => setSelectedCoachId(persona.id)}
            >
              <img src={persona.imageUrl} alt={persona.name} className="w-16 h-16 rounded-full" />
              <p className="text-center text-sm mt-2">{persona.name}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="flex-grow overflow-y-auto p-4 space-y-2 bg-neutral-800/60"> {/* Adjusted spacing and bg */}
        {messages.map(msg => (
          <ChatMessage
            key={msg.id}
            messageText={msg.text}
            sender={msg.sender}
            timestamp={msg.timestamp}
            aiTheme={msg.sender === 'ai' ? currentCoach.theme : undefined}
          />
        ))}
        {isTyping && <div className="text-zinc-500 text-xs italic p-2">Computing Response...</div>}
        <div ref={messagesEndRef} /> {/* For auto-scrolling */}
      </div>

      <div className="p-4 border-t border-neutral-700 bg-neutral-800/50">
        <form className="flex gap-2" onSubmit={handleSendMessage}>
          <Input
            type="text"
            placeholder="What's your problem? Spit it out."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="flex-grow bg-neutral-700 border-neutral-600 text-neutral-100 placeholder:text-neutral-400 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isTyping}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AICoachPage;
