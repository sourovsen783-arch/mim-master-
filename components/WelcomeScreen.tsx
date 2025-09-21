
import React from 'react';
import { PhotoIcon } from './Icons';

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="text-center p-8 bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-2xl animate-fade-in">
      <div className="flex justify-center mb-4">
        <PhotoIcon />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">
        Let's Create Some Memes!
      </h2>
      <p className="text-gray-400">
        Type a funny idea in the box above and click "Generate" to see the magic happen.
      </p>
    </div>
  );
};
