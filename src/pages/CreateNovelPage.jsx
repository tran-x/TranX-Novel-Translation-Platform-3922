import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUpload, 
  faPlus, 
  faTimes 
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/UserContext';
import RichTextEditor from '../components/Editor/RichTextEditor';

const CreateNovelPage = () => {
  const { user, isTranslator } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    originalTitle: '',
    description: '',
    originalAuthor: '',
    rawSource: '',
    type: 'Chinese',
    statusInCOO: 'Ongoing',
    totalChapters: '',
    translationStatus: 'Ongoing',
    updateSchedule: '',
    cover: null
  });
  const [volumes, setVolumes] = useState([]);
  const [newVolume, setNewVolume] = useState({ name: '', startChapter: '' });
  const [loading, setLoading] = useState(false);

  if (!isTranslator) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need translator privileges to create novels.</p>
          <button
            onClick={() => navigate('/become-translator')}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Become a Translator
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData(prev => ({ ...prev, description: value }));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, cover: file }));
    }
  };

  const addVolume = () => {
    if (newVolume.name && newVolume.startChapter) {
      setVolumes(prev => [...prev, { ...newVolume, id: Date.now() }]);
      setNewVolume({ name: '', startChapter: '' });
    }
  };

  const removeVolume = (id) => {
    setVolumes(prev => prev.filter(vol => vol.id !== id));
  };

  const extractSiteName = (url) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Process raw source to extract site name
      const processedData = {
        ...formData,
        rawSource: extractSiteName(formData.rawSource),
        volumes,
        translator: user.username,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').trim('-')
      };

      // In a real app, send to API
      console.log('Creating novel:', processedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate(`/novel/${processedData.slug}`);
    } catch (error) {
      console.error('Error creating novel:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Create New Novel</h1>
          <p className="text-gray-600">Add a new novel to the platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Novel Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter novel title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Original Title
                </label>
                <input
                  type="text"
                  name="originalTitle"
                  value={formData.originalTitle}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="原文标题 / 原題 / 원제"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Original Author *
                </label>
                <input
                  type="text"
                  name="originalAuthor"
                  value={formData.originalAuthor}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter original author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Novel Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Raw Source URL
                </label>
                <input
                  type="url"
                  name="rawSource"
                  value={formData.rawSource}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="https://example.com/novel"
                />
                {formData.rawSource && (
                  <p className="text-sm text-gray-500 mt-1">
                    Site: {extractSiteName(formData.rawSource)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Status in COO *
                </label>
                <select
                  name="statusInCOO"
                  value={formData.statusInCOO}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Hiatus">Hiatus</option>
                  <option value="Dropped">Dropped</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Total Chapters
                </label>
                <input
                  type="number"
                  name="totalChapters"
                  value={formData.totalChapters}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="e.g., 1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Translation Status *
                </label>
                <select
                  name="translationStatus"
                  value={formData.translationStatus}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Hiatus">Hiatus</option>
                  <option value="Dropped">Dropped</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Update Schedule
                </label>
                <input
                  type="text"
                  name="updateSchedule"
                  value={formData.updateSchedule}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="e.g., Daily, Weekly, Irregular"
                />
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Cover Image</h2>
            
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FontAwesomeIcon icon={faUpload} className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> cover image
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleCoverUpload}
                />
              </label>
            </div>
            
            {formData.cover && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {formData.cover.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Description</h2>
            <RichTextEditor
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Enter novel description..."
            />
          </div>

          {/* Volumes */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Volumes (Optional)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={newVolume.name}
                onChange={(e) => setNewVolume(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Volume name"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newVolume.startChapter}
                  onChange={(e) => setNewVolume(prev => ({ ...prev, startChapter: e.target.value }))}
                  placeholder="Start chapter"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addVolume}
                  disabled={!newVolume.name || !newVolume.startChapter}
                  className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faPlus} size="lg" />
                </button>
              </div>
            </div>

            {volumes.length > 0 && (
              <div className="space-y-2">
                {volumes.map((volume) => (
                  <div key={volume.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <span className="font-medium">{volume.name}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        (Starts with Chapter {volume.startChapter})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVolume(volume.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.title || !formData.originalAuthor}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Novel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNovelPage;