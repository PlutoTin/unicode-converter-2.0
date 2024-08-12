import React, { useState } from 'react';

interface UnicodeDecoderEncoderProps {}

const UnicodeDecoderEncoder: React.FC<UnicodeDecoderEncoderProps> = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('encoder');
  const [ignoreEnglish, setIgnoreEnglish] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleEncode = () => {
    const encodedString = input
      .split('')
      .map((char) => {
        if (ignoreEnglish && char.match(/[a-zA-Z]/)) {
          return char;
        }
        return `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`;
      })
      .join('');
    setOutput(encodedString);
  };

  const handleDecode = () => {
    const decodedString = input
      .replace(/\\u([0-9a-fA-F]{4})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      })
      .replace(/([a-zA-Z])/g, (match) => {
        return match;
      });
    setOutput(decodedString);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleIgnoreEnglishChange = () => {
    setIgnoreEnglish(!ignoreEnglish);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">Unicode Decoder and Encoder</h1>
      <div className="flex flex-wrap justify-center mb-4">
        <button
          className={`text-sm font-bold py-2 px-4 rounded-md ${
            activeTab === 'encoder'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => handleTabChange('encoder')}
        >
          Encoder
        </button>
        <button
          className={`text-sm font-bold py-2 px-4 rounded-md ${
            activeTab === 'decoder'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => handleTabChange('decoder')}
        >
          Decoder
        </button>
      </div>
      <textarea
        className="w-full h-40 p-2 mb-4 border border-gray-400 rounded-md"
        value={input}
        onChange={handleInputChange}
        placeholder={activeTab === 'encoder' ? 'Enter text to encode' : 'Enter text to decode'}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-4"
        onClick={activeTab === 'encoder' ? handleEncode : handleDecode}
      >
        {activeTab === 'encoder' ? 'Encode' : 'Decode'}
      </button>
      <button
        className={`text-sm font-bold py-2 px-4 rounded-md ${
          ignoreEnglish ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
        }`}
        onClick={handleIgnoreEnglishChange}
      >
        {ignoreEnglish ? 'Ignoring English' : 'Ignore English'}
      </button>
      <textarea
        className="w-full h-40 p-2 mb-4 border border-gray-400 rounded-md"
        value={output}
        readOnly
        placeholder={activeTab === 'encoder' ? 'Encoded text' : 'Decoded text'}
      />
    </div>
  );
};

export default UnicodeDecoderEncoder;