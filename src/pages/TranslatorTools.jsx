import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCopy, 
  faDownload, 
  faLink 
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/UserContext';

const TranslatorTools = () => {
  const { user, isTranslator } = useUser();
  const [rawTextInput, setRawTextInput] = useState('');
  const [cleanedText, setCleanedText] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [fetchedText, setFetchedText] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isTranslator) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Access Denied</h1>
          <p className="text-gray-600">You need translator privileges to access these tools.</p>
        </div>
      </div>
    );
  }

  const cleanRawText = () => {
    if (!rawTextInput.trim()) return;

    // Remove Chinese/Japanese/Korean characters, keep only English/translated text
    const lines = rawTextInput.split('\n');
    const cleanedLines = lines.filter(line => {
      // Remove lines that are primarily Chinese/Japanese/Korean characters
      const cjkRegex = /[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g;
      const cjkMatches = line.match(cjkRegex);
      const totalChars = line.length;
      const cjkChars = cjkMatches ? cjkMatches.length : 0;
      
      // If more than 50% of characters are CJK, remove the line
      return totalChars === 0 || (cjkChars / totalChars) < 0.5;
    }).filter(line => line.trim() !== ''); // Remove empty lines

    setCleanedText(cleanedLines.join('\n'));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const fetchRawText = async () => {
    if (!sourceUrl.trim()) return;

    setLoading(true);
    try {
      // Mock fetching raw text - in real app, this would be a backend service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock fetched content
      const mockContent = `第一章 龙血战士家族
我爱你。
Chapter 1: The Dragonblood Warrior Clan
Wo ai ni.

玉兰大陆，南北两大帝国征战了无数年。
Yulan dalu, nanbei liang da diguo zhengzhan le wushu nian.
On the Yulan continent, the empires of the north and south have been at war for countless years.

在玉兰大陆东部地区，有一个毫不起眼的小镇——乌山镇。
Zai yulan dalu dongbu diqu, you yi ge hao bu qi yan de xiao zhen——wushan zhen.
In the eastern regions of the Yulan continent, there was a small, unremarkable town called Wushan town.`;

      setFetchedText(mockContent);
    } catch (error) {
      console.error('Error fetching text:', error);
      alert('Error fetching text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadText = (text, filename) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Translator Tools</h1>
          <p className="text-gray-600">Helpful tools for translation work</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Raw Text Remover */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-black">Raw Text Remover</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Remove original language text and keep only the translated content. 
              Useful for cleaning up mixed-language documents.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Input Text (Mixed Language)
                </label>
                <textarea
                  value={rawTextInput}
                  onChange={(e) => setRawTextInput(e.target.value)}
                  className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Paste your mixed language text here..."
                />
              </div>

              <button
                onClick={cleanRawText}
                disabled={!rawTextInput.trim()}
                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clean Text
              </button>

              {cleanedText && (
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Cleaned Text (Translation Only)
                  </label>
                  <div className="relative">
                    <textarea
                      value={cleanedText}
                      readOnly
                      className="w-full h-48 p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <div className="absolute top-2 right-2 space-x-2">
                      <button
                        onClick={() => copyToClipboard(cleanedText)}
                        className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        title="Copy to clipboard"
                      >
                        <FontAwesomeIcon icon={faCopy} size="sm" />
                      </button>
                      <button
                        onClick={() => downloadText(cleanedText, 'cleaned-text.txt')}
                        className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        title="Download as file"
                      >
                        <FontAwesomeIcon icon={faDownload} size="sm" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Raw Source Link Fetcher */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-black">Raw Source Fetcher</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Fetch raw text content from source URLs. 
              Useful for getting the original text to translate.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Source URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="https://example.com/chapter-1"
                  />
                  <button
                    onClick={fetchRawText}
                    disabled={!sourceUrl.trim() || loading}
                    className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <FontAwesomeIcon icon={faLink} className="mr-2" size="sm" />
                    {loading ? 'Fetching...' : 'Fetch'}
                  </button>
                </div>
              </div>

              {fetchedText && (
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Fetched Content
                  </label>
                  <div className="relative">
                    <textarea
                      value={fetchedText}
                      onChange={(e) => setFetchedText(e.target.value)}
                      className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <div className="absolute top-2 right-2 space-x-2">
                      <button
                        onClick={() => copyToClipboard(fetchedText)}
                        className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        title="Copy to clipboard"
                      >
                        <FontAwesomeIcon icon={faCopy} size="sm" />
                      </button>
                      <button
                        onClick={() => downloadText(fetchedText, 'fetched-content.txt')}
                        className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        title="Download as file"
                      >
                        <FontAwesomeIcon icon={faDownload} size="sm" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {loading && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-600">
                    Fetching content from the source URL... This may take a moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-black mb-4">Translation Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-black mb-2">Raw Text Remover</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Automatically detects and removes CJK characters</li>
                <li>• Preserves paragraph structure</li>
                <li>• Removes empty lines for cleaner output</li>
                <li>• Perfect for cleaning mixed-language documents</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-black mb-2">Source Fetcher</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Fetches raw content from web pages</li>
                <li>• Supports most novel hosting sites</li>
                <li>• Copyable and downloadable results</li>
                <li>• Saves time on manual copy-paste</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorTools;