import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/UserContext';
import RichTextEditor from '../components/Editor/RichTextEditor';

const EditChapterPage = () => {
  const { novelSlug, chapterNumber } = useParams();
  const { user, isTranslator } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    chapterNumber: '',
    title: '',
    content: '',
    isLocked: false
  });
  const [loading, setLoading] = useState(false);

  // Mock novel data
  const novel = {
    title: "Coiling Dragon",
    slug: "coiling-dragon",
    translator: "RWX"
  };

  useEffect(() => {
    // Mock loading chapter data
    const mockChapter = {
      chapterNumber: chapterNumber,
      title: "The Dragonblood Warrior Clan",
      content: `<p>On the Yulan continent, the empires of the north and south have been at war for countless years...</p>`,
      isLocked: false
    };
    
    setFormData(mockChapter);
  }, [chapterNumber]);

  if (!isTranslator) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Access Denied</h1>
          <p className="text-gray-600">You need translator privileges to edit chapters.</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContentChange = (value) => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const chapterData = {
        ...formData,
        novelSlug,
        updatedAt: new Date(),
        author: user.username
      };

      console.log('Updating chapter:', chapterData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate(`/novel/${novelSlug}/chapter-${formData.chapterNumber}`);
    } catch (error) {
      console.error('Error updating chapter:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Edit Chapter</h1>
          <p className="text-gray-600">Update chapter in {novel.title}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Chapter Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Chapter Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Chapter Number *
                </label>
                <input
                  type="number"
                  name="chapterNumber"
                  value={formData.chapterNumber}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="e.g., 1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Chapter Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter chapter title"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isLocked"
                name="isLocked"
                checked={formData.isLocked}
                onChange={handleInputChange}
                className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
              />
              <label htmlFor="isLocked" className="ml-2 text-sm font-medium text-black flex items-center">
                <FontAwesomeIcon icon={faLock} className="mr-1" size="sm" />
                Lock Chapter (Requires points to unlock)
              </label>
            </div>
            
            {formData.isLocked && (
              <p className="text-sm text-gray-600 mt-2 ml-6">
                Locked chapters can be purchased using points. Users without points can purchase via PayPal.
              </p>
            )}
          </div>

          {/* Chapter Content */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Chapter Content</h2>
            <RichTextEditor
              value={formData.content}
              onChange={handleContentChange}
              placeholder="Update chapter content..."
            />
          </div>

          {/* Preview */}
          {formData.content && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-black mb-6">Preview</h2>
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-2xl font-bold mb-4">
                  Chapter {formData.chapterNumber}: {formData.title}
                </h3>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/novel/${novelSlug}/chapter-${chapterNumber}`)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.chapterNumber || !formData.title || !formData.content}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Chapter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChapterPage;