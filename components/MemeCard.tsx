
import React from 'react';

interface MemeCardProps {
  imageUrl: string;
  prompt: string;
}

export const MemeCard: React.FC<MemeCardProps> = ({ imageUrl, prompt }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 shadow-lg animate-fade-in">
      <div className="aspect-square w-full bg-gray-900 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={prompt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-4">
        <p className="text-gray-400 text-sm">Your Prompt:</p>
        <p className="text-white font-medium text-lg italic">"{prompt}"</p>
      </div>
    </div>
  );
};
