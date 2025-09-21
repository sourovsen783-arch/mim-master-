
import React, { useState, useCallback } from 'react';
import { GenerationStatus } from './types';
import { generateMemeImage } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Spinner } from './components/Spinner';
import { MemeCard } from './components/MemeCard';
import { ErrorMessage } from './components/ErrorMessage';
import { SparklesIcon, PhotoIcon } from './components/Icons';
import { WelcomeScreen } from './components/WelcomeScreen';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || status === GenerationStatus.LOADING) {
      return;
    }
    
    setStatus(GenerationStatus.LOADING);
    setImageUrl(null);
    setError(null);

    try {
      const b64Image = await generateMemeImage(prompt);
      setImageUrl(`data:image/jpeg;base64,${b64Image}`);
      setStatus(GenerationStatus.SUCCESS);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate meme. ${errorMessage}`);
      setStatus(GenerationStatus.ERROR);
    }
  }, [prompt, status]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl bg-gray-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700 p-6 sm:p-8 transition-all duration-300">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={handlePromptChange}
              placeholder="e.g., A cat DJing at a party in space"
              className="w-full h-28 p-4 bg-gray-900 border-2 border-gray-700 rounded-lg text-lg text-white placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 resize-none"
              rows={3}
            />
            <button
              onClick={handleGenerate}
              disabled={status === GenerationStatus.LOADING || !prompt.trim()}
              className="absolute bottom-4 right-4 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300 transform hover:scale-105 disabled:scale-100"
            >
              {status === GenerationStatus.LOADING ? (
                <>
                  <Spinner />
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon />
                  Generate
                </>
              )}
            </button>
          </div>
        </div>

        <div className="w-full max-w-2xl mt-8">
          {status === GenerationStatus.LOADING && <Spinner size="lg" />}
          {status === GenerationStatus.ERROR && error && <ErrorMessage message={error} />}
          {status === GenerationStatus.SUCCESS && imageUrl && <MemeCard imageUrl={imageUrl} prompt={prompt} />}
          {status === GenerationStatus.IDLE && <WelcomeScreen />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
