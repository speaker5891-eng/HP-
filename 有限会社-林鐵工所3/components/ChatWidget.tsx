import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Search, ImageIcon, LayoutTemplate } from 'lucide-react';
import { sendMessageToGemini, generateImageWithGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'image'>('chat');
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'こんにちは。林鐵工所の「鉄（テツ）」です。加工技術や材質について、何かご質問はありますか？' }
  ]);
  const [input, setInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Image Gen State
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(true); // Optimistic default

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, activeTab]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isChatLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsChatLoading(true);

    try {
      let fullResponse = "";
      let groundingMetadata = null;
      // Add placeholder
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      const stream = sendMessageToGemini(userText);

      for await (const chunk of stream) {
        if (chunk.text) fullResponse += chunk.text;
        if (chunk.groundingMetadata) groundingMetadata = chunk.groundingMetadata;

        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.role === 'model') {
            lastMsg.text = fullResponse;
            if (groundingMetadata) {
                lastMsg.groundingMetadata = groundingMetadata;
            }
          }
          return newMessages;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: '申し訳ありません。現在、通信回線が混み合っているようです。少し時間を置いて再度お試しください。', isError: true }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const checkApiKey = async () => {
    if ((window as any).aistudio) {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      setHasApiKey(hasKey);
      return hasKey;
    }
    return true; // Default to true if not in AI Studio environment or handling externally
  };

  const handleSelectKey = async () => {
    if ((window as any).aistudio) {
      await (window as any).aistudio.openSelectKey();
      await checkApiKey();
    }
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePrompt.trim() || isImageLoading) return;

    const hasKey = await checkApiKey();
    if (!hasKey) {
        // If no key selected, stop here. UI will show the select button.
        return;
    }

    setIsImageLoading(true);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImageWithGemini(imagePrompt, imageSize);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error(error);
      alert("画像生成に失敗しました。APIキーまたは通信状況をご確認ください。");
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl w-[350px] sm:w-[400px] h-[550px] flex flex-col transition-all duration-300 transform origin-bottom-right pointer-events-auto ${
          isOpen ? 'scale-100 opacity-100 mb-4' : 'scale-0 opacity-0 mb-0'
        }`}
      >
        {/* Header */}
        <div className="bg-orange-600 rounded-t-2xl flex flex-col">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-white">
                <Bot className="w-6 h-6" />
                <div>
                <h3 className="font-bold text-sm">技術相談AI 鉄さん</h3>
                </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-orange-700 p-1 rounded-full transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex px-2 pb-2 gap-2">
            <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    activeTab === 'chat' 
                    ? 'bg-white text-orange-600 shadow-sm' 
                    : 'bg-orange-700/50 text-orange-100 hover:bg-orange-700'
                }`}
            >
                <MessageCircle className="w-3.5 h-3.5" />
                チャット
            </button>
            <button
                onClick={() => { setActiveTab('image'); checkApiKey(); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    activeTab === 'image' 
                    ? 'bg-white text-orange-600 shadow-sm' 
                    : 'bg-orange-700/50 text-orange-100 hover:bg-orange-700'
                }`}
            >
                <ImageIcon className="w-3.5 h-3.5" />
                画像生成
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden bg-slate-900 relative">
          
          {/* TAB: CHAT */}
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {messages.map((msg, idx) => (
                    <div 
                    key={idx} 
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                    <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user' ? 'bg-slate-700' : 'bg-orange-600'
                        }`}
                    >
                        {msg.role === 'user' ? <User className="w-5 h-5 text-slate-300" /> : <Bot className="w-5 h-5 text-white" />}
                    </div>
                    <div className="flex flex-col gap-1 max-w-[80%]">
                        <div 
                            className={`rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                            msg.role === 'user' 
                                ? 'bg-slate-800 text-slate-200 rounded-tr-none' 
                                : msg.isError 
                                ? 'bg-red-900/50 text-red-200 rounded-tl-none border border-red-800'
                                : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none'
                            }`}
                        >
                            {msg.text || <Loader2 className="w-4 h-4 animate-spin text-orange-500" />}
                        </div>
                        
                        {/* Grounding Sources */}
                        {msg.groundingMetadata?.groundingChunks && (
                            <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800 text-xs mt-1">
                                <div className="flex items-center gap-1 text-slate-400 mb-1">
                                    <Search className="w-3 h-3" />
                                    <span className="font-bold">参考情報</span>
                                </div>
                                <ul className="space-y-1">
                                    {msg.groundingMetadata.groundingChunks.map((chunk: any, i: number) => {
                                        if (chunk.web?.uri) {
                                            return (
                                                <li key={i}>
                                                    <a href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline truncate block max-w-[200px]">
                                                        {chunk.web.title || chunk.web.uri}
                                                    </a>
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
                </div>
                
                {/* Input */}
                <div className="p-4 bg-slate-900 border-t border-slate-700">
                <form onSubmit={handleChatSubmit} className="relative">
                    <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="ステンレスの溶接について..."
                    className="w-full bg-slate-800 text-slate-200 pl-4 pr-12 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-slate-500 text-sm transition-all"
                    disabled={isChatLoading}
                    />
                    <button
                    type="submit"
                    disabled={isChatLoading || !input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                    {isChatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                </form>
                </div>
            </div>
          )}

          {/* TAB: IMAGE GENERATION */}
          {activeTab === 'image' && (
            <div className="h-full flex flex-col p-4 overflow-y-auto scrollbar-hide">
                {!hasApiKey && (
                    <div className="mb-4 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg text-center">
                        <p className="text-yellow-200 text-xs mb-3">
                            画像生成には有料APIキーが必要です。<br/>
                            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline hover:text-white">詳細はこちら</a>
                        </p>
                        <button 
                            onClick={handleSelectKey}
                            className="bg-yellow-600 hover:bg-yellow-500 text-white text-xs font-bold py-2 px-4 rounded transition-colors"
                        >
                            APIキーを選択・設定する
                        </button>
                    </div>
                )}

                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                        <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                            <LayoutTemplate className="w-4 h-4 text-orange-500" />
                            イメージ生成
                        </h4>
                        <form onSubmit={handleImageSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">プロンプト（作りたい画像の説明）</label>
                                <textarea
                                    value={imagePrompt}
                                    onChange={(e) => setImagePrompt(e.target.value)}
                                    placeholder="例：未来的な鉄工所の外観、夕暮れ時、サイバーパンク風"
                                    className="w-full bg-slate-900 text-slate-200 p-3 rounded-lg border border-slate-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm h-24 resize-none"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">画像サイズ</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['1K', '2K', '4K'] as const).map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setImageSize(size)}
                                            className={`py-2 px-2 rounded text-xs font-bold border transition-all ${
                                                imageSize === size 
                                                ? 'bg-orange-600 border-orange-500 text-white' 
                                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isImageLoading || !imagePrompt.trim() || !hasApiKey}
                                className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {isImageLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                                生成する
                            </button>
                        </form>
                    </div>

                    {/* Result Area */}
                    <div className="flex-1 min-h-[200px] bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden relative">
                        {isImageLoading ? (
                            <div className="flex flex-col items-center gap-3 text-slate-500">
                                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                                <span className="text-xs animate-pulse">画像を生成中...</span>
                            </div>
                        ) : generatedImage ? (
                            <div className="relative w-full h-full group">
                                <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                                <a 
                                    href={generatedImage} 
                                    download="generated-image.png"
                                    className="absolute bottom-4 right-4 bg-slate-900/80 hover:bg-orange-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                                    title="ダウンロード"
                                >
                                    <ImageIcon className="w-5 h-5" />
                                </a>
                            </div>
                        ) : (
                            <div className="text-slate-700 text-xs text-center px-4">
                                プロンプトを入力して<br/>画像を生成してください
                            </div>
                        )}
                    </div>
                </div>
            </div>
          )}

        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto bg-orange-600 hover:bg-orange-500 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group ${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'rotate-0 opacity-100'}`}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-sm">
          技術相談はこちら
        </span>
      </button>
    </div>
  );
};

export default ChatWidget;