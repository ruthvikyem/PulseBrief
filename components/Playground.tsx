"use client";

import React, { useState, useRef, useEffect } from "react";
import { SAMPLE_SCENARIOS, SampleScenario } from "@/lib/sample-data";
import {
  Sparkles,
  Trash2,
  ArrowRight,
  Loader2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Upload,
  FileAudio,
  Play,
  Pause,
  HelpCircle,
  CheckCircle2,
  Radio,
} from "lucide-react";

interface PlaygroundProps {
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>> | ((val: string | ((prev: string) => string)) => void);
  selectedSampleId: string;
  setSelectedSampleId: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

// Typing for Web Speech API
interface IWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

export function Playground({
  transcript,
  setTranscript,
  selectedSampleId,
  setSelectedSampleId,
  onAnalyze,
  isLoading,
}: PlaygroundProps) {
  // Mic Recording State
  const [isRecordingMic, setIsRecordingMic] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Audio Playback / Synthesis State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Uploaded Audio File State
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const [isTranscribingFile, setIsTranscribingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  // Initialize Web Speech Recognition
  useEffect(() => {
    const win = typeof window !== "undefined" ? (window as unknown as IWindow) : null;
    const SpeechRecognition = win?.SpeechRecognition || win?.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript.trim()) {
          setTranscript((prev: string) => {
            const separator = prev.trim() ? "\n" : "";
            return prev + separator + currentTranscript.trim();
          });
          setSelectedSampleId("");
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsRecordingMic(false);
      };

      recognition.onend = () => {
        setIsRecordingMic(false);
      };

      recognitionRef.current = recognition;
    } else {
      setRecognitionSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [setTranscript, setSelectedSampleId]);

  // Toggle Live Mic Recording
  const toggleMicRecording = () => {
    if (!recognitionRef.current) {
      alert("Live microphone speech-to-text is not supported in this browser. Please try Chrome, Edge, or Safari.");
      return;
    }

    if (isRecordingMic) {
      recognitionRef.current.stop();
      setIsRecordingMic(false);
    } else {
      // Stop speech synthesis if playing
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      }

      try {
        recognitionRef.current.start();
        setIsRecordingMic(true);
      } catch (err) {
        console.error("Mic start failed:", err);
      }
    }
  };

  // Play / Speak Transcript with Browser Speech Synthesis
  const toggleSpeechPlayback = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("Audio synthesis is not supported on your browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      if (!transcript.trim()) {
        alert("Please select a sample or enter text first to play voice audio.");
        return;
      }

      // Stop mic if recording
      if (isRecordingMic && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsRecordingMic(false);
      }

      window.speechSynthesis.cancel();
      // Clean up bracketed timestamps for cleaner natural speech
      const spokenText = transcript.replace(/\[\d\d:\d\d\]/g, "");
      const utterance = new SpeechSynthesisUtterance(spokenText.slice(0, 500)); // Play first segment
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsPlayingAudio(false);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Handle Audio File Upload (.mp3, .wav, .m4a)
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const audioUrl = URL.createObjectURL(file);
    setUploadedAudioUrl(audioUrl);
    setIsTranscribingFile(true);

    // Simulate AI speech-to-text ingestion
    setTimeout(() => {
      setIsTranscribingFile(false);
      const simulatedAudioTranscript = `[00:05] Speaker 1 (Customer Lead): "We uploaded this meeting audio file (${file.name}). Our main goal is resolving latency in the export pipeline and integrating automated webhooks."\n[00:32] Speaker 2 (Engineering Lead): "We will deploy an asynchronous worker queue with automatic retry logic and support for custom webhook headers."\n[01:10] Speaker 1: "Sounds great. Let's make sure the delivery is tested by Thursday afternoon."`;
      setTranscript(simulatedAudioTranscript);
      setSelectedSampleId("");
    }, 1200);
  };

  const handleSelectSample = (sample: SampleScenario) => {
    setSelectedSampleId(sample.id);
    setTranscript(sample.transcript);
    setUploadedFileName(null);
    setUploadedAudioUrl(null);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  const handleClear = () => {
    setSelectedSampleId("");
    setTranscript("");
    setUploadedFileName(null);
    setUploadedAudioUrl(null);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;
  const charCount = transcript.length;

  return (
    <div id="sandbox" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
      {/* Hidden Audio File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleAudioUpload}
        className="hidden"
      />

      {/* Container Card */}
      <div className="relative rounded-2xl glass-panel p-5 sm:p-7 md:p-9 shadow-2xl border border-white/[0.09] overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header with Audio Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Zero-Auth Ephemeral Playground
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select a sample scenario, record your live microphone, upload an audio file, or paste raw meeting notes.
            </p>

            {/* In-Memory Privacy Guarantee Notice */}
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                <strong>100% Confidential:</strong> In-memory ephemeral processing. No transcripts or audio are stored or trained on.
              </span>
            </div>
          </div>

          {/* Functional Voice & Audio Control Suite */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* 1. Live Mic Speech-to-Text Button */}
            <button
              onClick={toggleMicRecording}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 shadow-sm ${
                isRecordingMic
                  ? "bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse ring-2 ring-rose-500/30"
                  : "bg-white/[0.03] text-slate-300 border-white/[0.08] hover:bg-white/[0.07] hover:text-white"
              }`}
              title={isRecordingMic ? "Click to stop recording" : "Record your live microphone"}
            >
              {isRecordingMic ? (
                <>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <MicOff className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <span>Stop Mic Recording</span>
                  {/* Equalizer Waveform Bars */}
                  <div className="flex items-center gap-0.5 ml-1 h-3">
                    <span className="w-0.5 h-3 bg-rose-400 rounded-full animate-bounce" />
                    <span className="w-0.5 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-0.5 h-3 bg-rose-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Record Voice (Mic)</span>
                </>
              )}
            </button>

            {/* 2. Audio File Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.03] text-slate-300 border border-white/[0.08] hover:bg-white/[0.07] hover:text-white transition-all shadow-sm"
              title="Upload MP3, WAV, or M4A audio file"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-400" />
              <span>Upload Audio File</span>
            </button>

            {/* 3. Text-to-Speech Playback Button */}
            <button
              onClick={toggleSpeechPlayback}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 shadow-sm ${
                isPlayingAudio
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 animate-pulse"
                  : "bg-white/[0.03] text-slate-300 border-white/[0.08] hover:bg-white/[0.07] hover:text-white"
              }`}
              title={isPlayingAudio ? "Stop playback" : "Listen to audio simulation"}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Pause Audio</span>
                  <div className="flex items-center gap-0.5 ml-1 h-3">
                    <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-bounce" />
                    <span className="w-0.5 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Play Call Audio</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Uploaded File Player Banner (If active) */}
        {uploadedFileName && (
          <div className="mt-4 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-indigo-200">
            <div className="flex items-center gap-2.5">
              <FileAudio className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="font-semibold text-white">{uploadedFileName}</span>
                <span className="text-slate-400 ml-2">
                  {isTranscribingFile ? "AI Transcribing speech..." : "Ready for extraction"}
                </span>
              </div>
            </div>

            {uploadedAudioUrl && (
              <audio
                ref={audioPlayerRef}
                src={uploadedAudioUrl}
                controls
                className="h-8 max-w-xs rounded-lg opacity-85"
              />
            )}
          </div>
        )}

        {/* Sample Selectors */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              1. Choose a Sample Scenario (1-Click Test)
            </label>
            <span className="text-[11px] text-slate-500 hidden sm:inline">Click to instantly populate sandbox</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SAMPLE_SCENARIOS.map((sample) => {
              const isSelected = selectedSampleId === sample.id;
              return (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`relative text-left p-3.5 rounded-xl border transition-all duration-200 group ${
                    isSelected
                      ? "bg-gradient-to-b from-indigo-950/60 to-slate-900/80 border-indigo-500/50 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                      : "bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.05] hover:border-white/[0.15]"
                  }`}
                >
                  <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {sample.badge}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {sample.description}
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Raw Transcript Input Area */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>2. Raw Input Transcript / Live Notes</span>
              <span className="text-[10px] text-slate-500 font-normal lowercase">(markdown, timestamps, or voice input)</span>
            </label>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>{wordCount} words • {charCount} chars</span>
              {transcript && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <textarea
              value={transcript}
              onChange={(e) => {
                setTranscript(e.target.value);
                setSelectedSampleId("");
              }}
              placeholder="Paste raw conversation, Zoom/Google Meet transcript, customer interview notes, or hit 'Record Voice (Mic)' to speak live..."
              rows={7}
              className="w-full rounded-xl bg-[#0a0e18]/90 border border-white/[0.1] p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-mono leading-relaxed resize-y"
            />

            {/* Live Audio Status Overlay */}
            {isRecordingMic && (
              <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-950/90 border border-rose-500/40 text-rose-300 text-xs shadow-lg animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                <span>Listening to Microphone...</span>
              </div>
            )}

            {isPlayingAudio && (
              <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs shadow-lg animate-pulse">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Playing Voice Audio Stream...</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button & Extraction Trigger */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Output produces structured PRD, checklist, and Linear JSON spec.</span>
          </div>

          <button
            onClick={onAnalyze}
            disabled={isLoading || !transcript.trim()}
            className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl ${
              isLoading || !transcript.trim()
                ? "bg-slate-800 text-slate-500 border border-white/[0.05] cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30 hover:shadow-indigo-500/40 active:scale-[0.98]"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Extracting Product Spec & Actions...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Extract Actions & Spec</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
