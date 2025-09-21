
import React from 'react';
import { LightbulbIcon, PhotoIcon } from './Icons';

interface WelcomeScreenProps {
  onExampleClick: (prompt: string) => void;
}

const examples = [
  'A confused cat looking at a complex math equation',
  'A dog wearing a tiny chef hat cooking spaghetti',
  'A squirrel riding a tiny motorcycle',
  'An old-school computer with a "surprised pikachu" face on the screen',
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onExampleClick }) => {
  return (
    <div className="text-center p-6 sm:p-8 bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-2xl animate-fade-in">
      <div className="flex justify-center mb-4">
        <PhotoIcon />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">
        Let's Create Some Memes!
      </h2>
      <p className="text-gray-400 mb-6">
        Type a funny idea in the box above, or try one of these to get started.
      </p>
      <div className="flex flex-col items-start gap-3 text-left">
        {examples.map((example) => (
          <button
            key={example}
            onClick={() => onExampleClick(example)}
            className="w-full p-3 bg-gray-700/50 hover:bg-indigo-600/50 rounded-lg transition-all duration-200 flex items-center gap-4 group"
            aria-label={`Generate meme for: ${example}`}
          >
            <LightbulbIcon />
            <span className="text-gray-300 group-hover:text-white transition-colors duration-200">{example}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
