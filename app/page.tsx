'use client';

import { useState, useRef } from 'react';
import { Upload, Mic, FileAudio, Loader2, Copy, Download } from 'lucide-react';

export default function Home() {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setError('');
      setTranscription('');
    }
  };

  const handleTranscribe = async () => {
    if (!audioFile) {
      setError('ကျေးဇူးပြု၍ အသံဖိုင်တစ်ခုကို ရွေးချယ်ပါ');
      return;
    }

    setIsTranscribing(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('audio', audioFile);

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setTranscription(data.transcription);
      } else {
        setError(data.error || 'အသံဖိုင်ကို စာသားအဖြစ် ပြောင်းလဲ၍ မရပါ');
      }
    } catch (err) {
      setError('အမှားတစ်ခု ဖြစ်ပွားခဲ့သည်။ ကျေးဇူးပြု၍ ထပ်မံကြိုးစားပါ။');
    } finally {
      setIsTranscribing(false);
    }
  };

  const copyToClipboard = async () => {
    if (transcription) {
      await navigator.clipboard.writeText(transcription);
    }
  };

  const downloadTranscription = () => {
    if (transcription) {
      const blob = new Blob([transcription], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'myanmar-transcription.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Mic className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800 myanmar-text">
              မြန်မာ အသံဖိုင် စာသားပြောင်းအက်ပ်
            </h1>
          </div>
          <p className="text-lg text-gray-600 myanmar-text">
            မြန်မာအသံဖိုင်များကို မြန်မာစာသို့ ပြောင်းလဲပေးသော အက်ပ်
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="audio/*"
              className="hidden"
            />

            <div className="flex flex-col items-center">
              <FileAudio className="w-16 h-16 text-gray-400 mb-4" />

              {audioFile ? (
                <div className="mb-4">
                  <p className="text-lg font-medium text-gray-700 myanmar-text">
                    ရွေးချယ်ထားသော ဖိုင်:
                  </p>
                  <p className="text-blue-600 font-medium">{audioFile.name}</p>
                  <p className="text-sm text-gray-500">
                    ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              ) : (
                <div className="mb-4">
                  <p className="text-lg text-gray-600 myanmar-text mb-2">
                    အသံဖိုင်တစ်ခုကို ရွေးချယ်ပါ
                  </p>
                  <p className="text-sm text-gray-500">
                    MP3, WAV, M4A, OGG စသည့် ဖိုင်များကို ပံ့ပိုးပေးပါသည်
                  </p>
                </div>
              )}

              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors myanmar-text"
              >
                <Upload className="w-5 h-5" />
                {audioFile ? 'ဖိုင်ပြောင်းရွေးပါ' : 'ဖိုင်ရွေးချယ်ပါ'}
              </button>
            </div>
          </div>

          {/* Transcribe Button */}
          {audioFile && (
            <div className="mt-6 text-center">
              <button
                onClick={handleTranscribe}
                disabled={isTranscribing}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto transition-colors myanmar-text"
              >
                {isTranscribing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    စာသားပြောင်းနေသည်...
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    စာသားပြောင်းပါ
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 myanmar-text">{error}</p>
          </div>
        )}

        {/* Transcription Result */}
        {transcription && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 myanmar-text">စာသားရလဒ်</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button
                  onClick={downloadTranscription}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border">
              <p className="text-lg leading-relaxed myanmar-text text-gray-800 whitespace-pre-wrap">
                {transcription}
              </p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-3 myanmar-text">အသုံးပြုပုံ</h3>
          <ul className="space-y-2 text-blue-700 myanmar-text">
            <li>• မြန်မာအသံဖိုင်တစ်ခုကို ရွေးချယ်ပါ</li>
            <li>• "စာသားပြောင်းပါ" ခလုတ်ကို နှိပ်ပါ</li>
            <li>• ရလဒ်စာသားကို ကူးယူခြင်း သို့မဟုတ် ဒေါင်းလုဒ်လုပ်ပါ</li>
            <li>• အကောင်းဆုံးရလဒ်အတွက် ရှင်းလင်းသော အသံဖိုင်များကို အသုံးပြုပါ</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
