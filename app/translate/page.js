"use client";

import { useState } from "react";
import Link from "next/link";

export default function TranslatePage() {
  const [mode, setMode] = useState("text"); // 'text', 'image', 'audio'
  const [targetLanguage, setTargetLanguage] = useState("English");

  const [textInput, setTextInput] = useState("");
  const [fileToUpload, setFileToUpload] = useState(null);

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  const [loading, setLoading] = useState(false);
  const [translationResult, setTranslationResult] = useState("");
  const [error, setError] = useState("");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const file = new File([blob], 'recording.webm', { type: 'audio/webm' });
        setFileToUpload(file);
        setAudioURL(URL.createObjectURL(blob));
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setError("");
    } catch (err) {
      setError("Microphone access denied or not available.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(t => t.stop());
      setIsRecording(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileToUpload(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setTranslationResult("");

    if (mode === 'text' && !textInput.trim()) {
      setError("Please enter some text to translate.");
      return;
    }
    if ((mode === 'image' || mode === 'audio') && !fileToUpload) {
      setError(`Please select an ${mode} file to upload.`);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("mode", mode);
      formData.append("targetLanguage", targetLanguage);

      if (mode === "text") {
        formData.append("text", textInput);
      } else {
        formData.append("file", fileToUpload);
      }

      const res = await fetch("/api/translate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Translation failed by backend");

      setTranslationResult(data.translation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: '40px' }}>

      <main style={{ maxWidth: '800px', margin: '40px auto 0', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        <div className="glass-card animate-fade-in-up" style={{ padding: '40px' }}>
          <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>What do you need translated?</h2>
          <p className="section-subtitle" style={{ marginBottom: '24px', fontSize: '1.05rem', color: '#cbd5e1' }}>Translate signs, menus, or conversations instantly. Select an input mode below.</p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button onClick={() => setMode('text')} className={mode === 'text' ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1, background: mode === 'text' ? '#f97316' : 'rgba(255,255,255,0.05)', color: '#fff' }}>📝 Text</button>
            <button onClick={() => setMode('image')} className={mode === 'image' ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1, background: mode === 'image' ? '#f97316' : 'rgba(255,255,255,0.05)', color: '#fff' }}>📸 Image</button>
            <button onClick={() => setMode('audio')} className={mode === 'audio' ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1, background: mode === 'audio' ? '#f97316' : 'rgba(255,255,255,0.05)', color: '#fff' }}>🎙️ Audio</button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="label" style={{ display: 'block', marginBottom: '8px', color: '#f8fafc' }}>Target Language</label>
              <select
                value={targetLanguage}
                onChange={e => setTargetLanguage(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.1)', color: '#ffffff', fontSize: '1rem' }}
              >
                <option value="English" style={{ background: '#1a1b26', color: '#fff' }}>English</option>
                <option disabled style={{ background: '#1a1b26', color: '#94a3b8' }}>─── Indian Languages ───</option>
                <option value="Hindi" style={{ background: '#1a1b26', color: '#fff' }}>Hindi</option>
                <option value="Bengali" style={{ background: '#1a1b26', color: '#fff' }}>Bengali</option>
                <option value="Telugu" style={{ background: '#1a1b26', color: '#fff' }}>Telugu</option>
                <option value="Marathi" style={{ background: '#1a1b26', color: '#fff' }}>Marathi</option>
                <option value="Tamil" style={{ background: '#1a1b26', color: '#fff' }}>Tamil</option>
                <option value="Urdu" style={{ background: '#1a1b26', color: '#fff' }}>Urdu</option>
                <option value="Gujarati" style={{ background: '#1a1b26', color: '#fff' }}>Gujarati</option>
                <option value="Kannada" style={{ background: '#1a1b26', color: '#fff' }}>Kannada</option>
                <option value="Odia" style={{ background: '#1a1b26', color: '#fff' }}>Odia</option>
                <option value="Malayalam" style={{ background: '#1a1b26', color: '#fff' }}>Malayalam</option>
                <option value="Punjabi" style={{ background: '#1a1b26', color: '#fff' }}>Punjabi</option>
                <option value="Assamese" style={{ background: '#1a1b26', color: '#fff' }}>Assamese</option>
                <option value="Maithili" style={{ background: '#1a1b26', color: '#fff' }}>Maithili</option>
                <option value="Kashmiri" style={{ background: '#1a1b26', color: '#fff' }}>Kashmiri</option>
                <option value="Konkani" style={{ background: '#1a1b26', color: '#fff' }}>Konkani</option>
                <option value="Sindhi" style={{ background: '#1a1b26', color: '#fff' }}>Sindhi</option>
                <option value="Nepali" style={{ background: '#1a1b26', color: '#fff' }}>Nepali</option>
                <option disabled style={{ background: '#1a1b26', color: '#94a3b8' }}>─── International ───</option>
                <option value="Spanish" style={{ background: '#1a1b26', color: '#fff' }}>Spanish</option>
                <option value="French" style={{ background: '#1a1b26', color: '#fff' }}>French</option>
                <option value="German" style={{ background: '#1a1b26', color: '#fff' }}>German</option>
                <option value="Japanese" style={{ background: '#1a1b26', color: '#fff' }}>Japanese</option>
              </select>
            </div>

            {mode === 'text' && (
              <div>
                <label className="label" style={{ display: 'block', marginBottom: '8px', color: '#f8fafc' }}>Text to translate</label>
                <textarea
                  rows={4}
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  placeholder="Type or paste text here..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.05)', color: '#ffffff', fontSize: '1rem', resize: 'vertical' }}
                />
              </div>
            )}

            {mode === 'image' && (
              <div className="animate-fade-in-up">
                <label className="label" style={{ display: 'block', marginBottom: '8px', color: '#f8fafc' }}>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px dashed #64748b', background: 'rgba(255,255,255,0.05)', color: '#ffffff', fontSize: '1rem' }}
                />
                <p style={{ marginTop: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>Upload a photo of a menu, sign, or document.</p>
              </div>
            )}

            {mode === 'audio' && (
              <div className="animate-fade-in-up">
                <label className="label" style={{ display: 'block', marginBottom: '8px', color: '#f8fafc' }}>Audio Input</label>

                <div style={{ padding: '16px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {!isRecording ? (
                      <button type="button" onClick={startRecording} className="btn-secondary" style={{ border: '1px solid #e74c3c', color: '#e74c3c', flex: 1, minWidth: '150px' }}>
                        🔴 Record Mic
                      </button>
                    ) : (
                      <button type="button" onClick={stopRecording} className="btn-primary" style={{ background: '#e74c3c', color: '#fff', flex: 1, minWidth: '150px', animation: 'pulse 1.5s infinite' }}>
                        ⏹ Stop Recording
                      </button>
                    )}

                    <div style={{ position: 'relative', flex: 1, minWidth: '150px' }}>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => { handleFileChange(e); setAudioURL(null); }}
                        style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                      />
                      <button type="button" className="btn-secondary" style={{ width: '100%', pointerEvents: 'none', color: '#ffffff', border: '1px solid #64748b' }}>
                        📁 Upload File
                      </button>
                    </div>
                  </div>

                  {audioURL && !isRecording && (
                    <div style={{ width: '100%', marginTop: '8px' }}>
                      <p style={{ fontSize: '0.9rem', color: '#4ade80', marginBottom: '8px' }}>✓ Audio recorded and ready for translation</p>
                      <audio src={audioURL} controls style={{ width: '100%', height: '40px' }} />
                    </div>
                  )}

                  {fileToUpload && !audioURL && !isRecording && (
                    <p style={{ fontSize: '0.9rem', color: '#4ade80', marginBottom: '0' }}>✓ External file "{fileToUpload.name}" selected</p>
                  )}

                  {!fileToUpload && !isRecording && (
                    <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0' }}>Record your voice directly or upload a pre-recorded audio snippet.</p>
                  )}
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '14px', fontSize: '1.1rem', marginTop: '10px', background: '#f97316', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              {loading ? "Translating..." : "Translate Directly"}
            </button>
            {error && <div className="badge badge-danger" style={{ padding: '12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', border: '1px solid #f87171' }}>⚠️ {error}</div>}
          </form>
        </div>

        {translationResult && (
          <div className="glass-card animate-fade-in-up" style={{ padding: '40px', borderTop: '4px solid #f97316' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 600, marginBottom: '16px' }}>Translated to {targetLanguage}</h3>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '1.1rem', lineHeight: 1.6, color: '#ffffff', whiteSpace: 'pre-wrap' }}>
              {translationResult}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}