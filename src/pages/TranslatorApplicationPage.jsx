import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/UserContext';

const TranslatorApplicationPage = () => {
  const { user, isTranslator } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    novelType: 'Chinese',
    novelTitle: '',
    translatedChapter: '',
    username: user?.username || '',
    email: user?.email || '',
    experience: '',
    motivation: '',
    sampleFile: null
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (isTranslator) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faCheck} size="2x" className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-black mb-4">You're Already a Translator!</h1>
          <p className="text-gray-600 mb-6">You already have translator privileges on TranX.</p>
          <button
            onClick={() => navigate('/create-novel')}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Create Your First Novel
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, sampleFile: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call to submit application
      console.log('Submitting translator application:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faCheck} size="2x" className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-black mb-4">Application Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in becoming a translator. We'll review your application 
            and get back to you within 2-3 business days.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black mb-4">Become a Translator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community of translators and help bring amazing stories to readers worldwide. 
            Share your passion for literature and language with our growing community.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold text-black mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Your username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Translation Details */}
            <div>
              <h2 className="text-xl font-bold text-black mb-4">Translation Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Novel Type *
                  </label>
                  <select
                    name="novelType"
                    value={formData.novelType}
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
                    Novel Title *
                  </label>
                  <input
                    type="text"
                    name="novelTitle"
                    value={formData.novelTitle}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Title of the novel you want to translate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Translation Experience
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Tell us about your translation experience (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Why do you want to become a translator? *
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Share your motivation and passion for translation"
                  />
                </div>
              </div>
            </div>

            {/* Sample Translation */}
            <div>
              <h2 className="text-xl font-bold text-black mb-4">Sample Translation</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Translated Chapter (Link or Text) *
                  </label>
                  <textarea
                    name="translatedChapter"
                    value={formData.translatedChapter}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Paste your translated chapter or provide a link to your work"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Upload Sample File (Optional)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FontAwesomeIcon icon={faUpload} className="w-6 h-6 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> sample translation
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOC, or TXT files</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                  {formData.sampleFile && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {formData.sampleFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-black mb-2">Before you apply:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You must have permission to translate the novel</li>
                <li>• All translations must be original work</li>
                <li>• Regular updates are expected once you start a project</li>
                <li>• You agree to follow our community guidelines</li>
              </ul>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !formData.novelTitle || !formData.translatedChapter || !formData.motivation}
                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TranslatorApplicationPage;