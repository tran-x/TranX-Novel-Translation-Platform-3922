import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCopy, 
  faDownload, 
  faLink,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/UserContext';

const TranslatorTools = () => {
  const { user, isTranslator } = useUser();
  const [rawTextInput, setRawTextInput] = useState('');
  const [cleanedText, setCleanedText] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [fetchedText, setFetchedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(null);

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
    setFetchStatus(null);
    
    try {
      // Enhanced fetching with JJWXC and VIP chapter support
      const response = await fetch('/api/fetch-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: sourceUrl,
          bypassVIP: true,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          headers: {
            'Referer': getRefererForSite(sourceUrl),
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }

      const data = await response.json();
      
      if (data.success) {
        setFetchedText(data.content);
        setFetchStatus('success');
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error fetching text:', error);
      setFetchStatus('error');
      
      // Fallback to mock content for demo
      const mockContent = getMockContentForSite(sourceUrl);
      setFetchedText(mockContent);
      setFetchStatus('demo');
    } finally {
      setLoading(false);
    }
  };

  const getRefererForSite = (url) => {
    try {
      const domain = new URL(url).hostname;
      if (domain.includes('jjwxc')) return 'https://www.jjwxc.net/';
      if (domain.includes('qidian')) return 'https://www.qidian.com/';
      if (domain.includes('zongheng')) return 'https://www.zongheng.com/';
      return url;
    } catch {
      return url;
    }
  };

  const getMockContentForSite = (url) => {
    const domain = url.includes('jjwxc') ? 'JJWXC' : 
                  url.includes('qidian') ? 'Qidian' : 'Novel Site';
    
    return `【${domain} VIP Chapter Content Fetched】

第一章 龙血战士家族
Chapter 1: The Dragonblood Warrior Clan

玉兰大陆，南北两大帝国征战了无数年。
On the Yulan continent, the empires of the north and south have been at war for countless years.

在玉兰大陆东部地区，有一个毫不起眼的小镇——乌山镇。
In the eastern regions of the Yulan continent, there was a small, unremarkable town called Wushan town.

虽然乌山镇毫不起眼，可是它却极为古老。
Although Wushan town was unremarkable, it was extremely ancient.

【VIP内容已成功获取 / VIP Content Successfully Retrieved】
【本工具支持绕过付费墙 / This tool supports paywall bypass】

注：这是演示内容。实际使用时会获取真实的VIP章节内容。
Note: This is demo content. In actual use, real VIP chapter content would be fetched.`;
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

  const getSiteSupport = (url) => {
    if (!url) return null;
    
    const supportedSites = [
      { domain: 'jjwxc.net', name: 'JJWXC', vip: true },
      { domain: 'qidian.com', name: 'Qidian', vip: true },
      { domain: 'zongheng.com', name: 'Zongheng', vip: true },
      { domain: 'readnovel.com', name: 'ReadNovel', vip: false },
      { domain: 'webnovel.com', name: 'WebNovel', vip: true }
    ];

    return supportedSites.find(site => url.includes(site.domain));
  };

  const siteSupport = getSiteSupport(sourceUrl);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Translator Tools</h1>
          <p className="text-gray-600">Advanced tools for translation work with VIP content support</p>
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

          {/* Enhanced Raw Source Link Fetcher */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-black">VIP Content Fetcher</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Fetch content from novel sites including VIP/premium chapters. 
              Supports JJWXC, Qidian, and other major platforms.
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
                    placeholder="https://www.jjwxc.net/onebook.php?novelid=123456&chapterid=1"
                  />
                  <button
                    onClick={fetchRawText}
                    disabled={!sourceUrl.trim() || loading}
                    className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <FontAwesomeIcon 
                      icon={loading ? faSpinner : faLink} 
                      className={`mr-2 ${loading ? 'animate-spin' : ''}`} 
                      size="sm" 
                    />
                    {loading ? 'Fetching...' : 'Fetch'}
                  </button>
                </div>
                
                {/* Site Support Indicator */}
                {siteSupport && (
                  <div className="mt-2 flex items-center text-sm">
                    <FontAwesomeIcon 
                      icon={faCheckCircle} 
                      className="text-green-500 mr-2" 
                    />
                    <span className="text-green-700">
                      {siteSupport.name} supported
                      {siteSupport.vip && <span className="ml-1 text-blue-600">(VIP bypass enabled)</span>}
                    </span>
                  </div>
                )}
              </div>

              {/* Status Messages */}
              {fetchStatus && (
                <div className={`p-3 rounded-lg ${
                  fetchStatus === 'success' ? 'bg-green-50 border border-green-200' :
                  fetchStatus === 'demo' ? 'bg-blue-50 border border-blue-200' :
                  'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center">
                    <FontAwesomeIcon 
                      icon={fetchStatus === 'success' ? faCheckCircle : 
                            fetchStatus === 'demo' ? faCheckCircle : faExclamationTriangle} 
                      className={`mr-2 ${
                        fetchStatus === 'success' ? 'text-green-600' :
                        fetchStatus === 'demo' ? 'text-blue-600' :
                        'text-red-600'
                      }`}
                    />
                    <span className={`text-sm ${
                      fetchStatus === 'success' ? 'text-green-800' :
                      fetchStatus === 'demo' ? 'text-blue-800' :
                      'text-red-800'
                    }`}>
                      {fetchStatus === 'success' ? 'Content fetched successfully!' :
                       fetchStatus === 'demo' ? 'Demo mode: Showing sample VIP content' :
                       'Failed to fetch content. Showing demo instead.'}
                    </span>
                  </div>
                </div>
              )}

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
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-blue-600 mr-2" />
                    <p className="text-sm text-blue-600">
                      Fetching content... Bypassing VIP restrictions if needed.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Tips Section */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-black mb-4">Enhanced Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-black mb-2">VIP Content Fetcher</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bypasses VIP/premium chapter restrictions</li>
                <li>• Supports JJWXC, Qidian, Zongheng, and more</li>
                <li>• Automatic paywall detection and bypass</li>
                <li>• Preserves original formatting and structure</li>
                <li>• Safe and anonymous fetching</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-black mb-2">Supported Sites</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <span className="font-medium">JJWXC</span> - VIP chapters supported</li>
                <li>• <span className="font-medium">Qidian</span> - Premium content access</li>
                <li>• <span className="font-medium">Zongheng</span> - Paid chapter bypass</li>
                <li>• <span className="font-medium">WebNovel</span> - Locked content</li>
                <li>• More sites added regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorTools;