import { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Paperclip, User, Wrench, CheckCheck } from 'lucide-react';

interface ChatPageProps {
  user: any;
}

interface Message {
  id: number;
  sender: 'user' | 'mechanic';
  content: string;
  timestamp: Date;
  image?: string;
  read?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    sender: 'mechanic',
    content: 'Halo! Saya Budi, mekanik MotoDif. Ada yang bisa saya bantu hari ini?',
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  },
];

export function ChatPage({ user }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
      read: false,
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate mechanic typing and response
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        'Terima kasih atas pertanyaannya! Untuk motor Anda, saya rekomendasikan...',
        'Saya sudah cek kompatibilitasnya. Part tersebut cocok untuk motor Anda.',
        'Untuk modifikasi seperti itu, estimasi biaya sekitar Rp 3-5 juta. Mau saya buatkan penawaran detail?',
        'Bisa kirim foto motor Anda? Saya akan berikan rekomendasi yang lebih spesifik.',
        'Bagus pilihannya! Part ini berkualitas dan harganya masih reasonable. Mau langsung saya proseskan?',
      ];
      
      const mechanicResponse: Message = {
        id: messages.length + 2,
        sender: 'mechanic',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        read: true,
      };

      setMessages(prev => [...prev, mechanicResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In real app, would upload to server
    const imageMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: 'Ini foto motor saya',
      timestamp: new Date(),
      image: URL.createObjectURL(file),
      read: false,
    };

    setMessages([...messages, imageMessage]);

    // Mechanic response to image
    setIsTyping(true);
    setTimeout(() => {
      const mechanicResponse: Message = {
        id: messages.length + 2,
        sender: 'mechanic',
        content: 'Wah motornya keren! Dari foto ini saya lihat ada beberapa area yang bisa di-upgrade. Mau saya kasih rekomendasi lengkap?',
        timestamp: new Date(),
        read: true,
      };
      setMessages(prev => [...prev, mechanicResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const quickQuestions = [
    'Rekomendasi knalpot untuk R15?',
    'Berapa biaya bore up?',
    'Part apa yang kompatibel?',
    'Estimasi waktu pengerjaan?',
  ];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Chat Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="size-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
            <Wrench className="size-6" />
          </div>
          <div>
            <h2>Mekanik MotoDif</h2>
            <p className="text-sm text-zinc-400">
              <span className="inline-block size-2 bg-green-500 rounded-full mr-2" />
              Online - Siap membantu Anda
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Welcome Message */}
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 text-center text-sm">
            <p className="text-blue-400 mb-2">💬 Konsultasi Real-Time dengan Mekanik</p>
            <p className="text-zinc-400">
              Tanyakan apapun tentang sparepart, modifikasi, atau perawatan motor Anda. Mekanik kami siap membantu!
            </p>
          </div>

          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-red-600/20' 
                    : 'bg-gradient-to-br from-red-600 to-red-700'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="size-4" />
                  ) : (
                    <Wrench className="size-4" />
                  )}
                </div>

                <div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-800 text-zinc-100'
                  }`}>
                    {message.image && (
                      <img 
                        src={message.image} 
                        alt="Uploaded" 
                        className="rounded-lg mb-2 max-w-xs"
                      />
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1 px-2">
                    <p className="text-xs text-zinc-500">
                      {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {message.sender === 'user' && (
                      <CheckCheck className={`size-3 ${message.read ? 'text-blue-500' : 'text-zinc-600'}`} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[80%]">
                <div className="size-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center flex-shrink-0">
                  <Wrench className="size-4" />
                </div>
                <div className="bg-zinc-800 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="size-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="size-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="size-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      {messages.length <= 2 && (
        <div className="px-4 sm:px-6 lg:px-8 py-3 bg-zinc-900/50 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-zinc-500 mb-2">Pertanyaan cepat:</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputMessage(question)}
                  className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:border-red-600/30 transition-colors whitespace-nowrap text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-zinc-900 border-t border-zinc-800 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
            >
              <ImageIcon className="size-5 text-zinc-400" />
            </button>

            <div className="flex-1 bg-zinc-800 rounded-lg flex items-end">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ketik pertanyaan Anda..."
                className="flex-1 bg-transparent px-4 py-3 focus:outline-none resize-none max-h-32"
                rows={1}
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-500 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="size-5" />
            </button>
          </div>

          <p className="text-xs text-zinc-500 mt-2 text-center">
            Kirim foto motor Anda untuk mendapat rekomendasi yang lebih akurat
          </p>
        </div>
      </div>
    </div>
  );
}
