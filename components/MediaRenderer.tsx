
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

interface MediaRendererProps {
  imagePrompt?: string;
  videoId?: string;
  title: string;
}

const MediaRenderer: React.FC<MediaRendererProps> = ({ imagePrompt, videoId, title }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoSummary, setVideoSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const generateImage = async () => {
      if (!process.env.API_KEY || !imagePrompt || imageUrl || isGenerating) return;
      setIsGenerating(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: `High-fidelity, cinematic institutional-grade visualization: ${imagePrompt}. Style: Deep Obsidian and Champagne Gold, 8K, intricate details, photorealistic financial terminal.` }] },
        });
        
        if (isMounted) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Image generation failed:", error);
      } finally {
        if (isMounted) setIsGenerating(false);
      }
    };

    generateImage();
    return () => { isMounted = false; };
  }, [imagePrompt]);

  const generateSummary = async () => {
    if (!process.env.API_KEY || videoSummary || isSummarizing) return;
    setIsSummarizing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide an institutional executive brief of the concept: ${title}. Detail strategic implications, mathematical modeling, and dynastic risk factors. Output purely technical prose, authoritative tone.`,
      });
      setVideoSummary(response.text || "Summary stream unavailable. Consult Oracle node.");
    } catch (error) {
      console.error("Summary generation failed:", error);
    } finally {
      setIsSummarizing(false);
    }
  };

  useEffect(() => {
    if (!videoId && !videoSummary && !isSummarizing) {
      generateSummary();
    }
  }, [videoId]);

  return (
    <div className="space-y-8">
      <div className="relative group overflow-hidden rounded-[48px] border-2 border-white/5 bg-white/[0.01] shadow-2xl">
        {imageUrl ? (
          <motion.img 
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5 }}
            src={imageUrl} 
            alt={title} 
            className="w-full aspect-video object-cover transition-transform duration-[2000ms] group-hover:scale-110"
          />
        ) : (
          <div className="w-full aspect-video flex flex-col items-center justify-center space-y-6">
            {isGenerating ? (
              <>
                <motion.div 
                    animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-12 h-12 border-[3px] border-accent/20 border-t-accent rounded-full" 
                />
                <span className="text-[12px] font-bold text-accent uppercase tracking-[0.5em] animate-pulse">Rendering Sovereign Context...</span>
              </>
            ) : (
              <span className="text-[12px] font-bold text-white/20 uppercase tracking-[0.6em] italic">Visual Intelligence Recalibrating...</span>
            )}
          </div>
        )}

        {videoId && (
          <button 
            onClick={() => setShowVideo(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md"
          >
            <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-[#0A192F] shadow-[0_0_60px_rgba(255,255,255,0.3)]"
            >
              <span className="text-4xl ml-2">▶</span>
            </motion.div>
          </button>
        )}
      </div>

      <div className="flex gap-4">
        {!videoId && (
            <div className="px-6 py-2 bg-accent/10 border border-accent/30 rounded-full">
                <span className="text-[8px] font-bold text-accent uppercase tracking-widest">Video Node Absent - AI Failsafe Triggered</span>
            </div>
        )}
        <button 
            onClick={generateSummary}
            disabled={isSummarizing}
            className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-50"
        >
            {isSummarizing ? "Syncing..." : videoSummary ? "Intelligence Sync Complete" : "Request Executive Summary"}
        </button>
      </div>

      <AnimatePresence>
        {videoSummary && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="p-10 rounded-[40px] bg-white/[0.02] border border-white/10 shadow-inner"
            >
                <span className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] block mb-6">Sovereign Analysis Brief</span>
                <div className="text-lg text-slate-300 font-light leading-relaxed space-y-6 italic">
                    {videoSummary.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVideo && videoId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-16"
          >
            <div className="w-full max-w-7xl aspect-video relative">
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute -top-20 right-0 text-white/40 hover:text-white flex items-center gap-6 text-sm font-bold uppercase tracking-[0.4em] transition-all"
              >
                Close Briefing <span className="text-4xl font-light">✕</span>
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} 
                title={title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-[64px] shadow-[0_60px_150px_rgba(0,0,0,0.8)] border-2 border-white/10"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaRenderer;
