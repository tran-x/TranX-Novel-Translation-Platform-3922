import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faBook, 
  faCalendar, 
  faHeart, 
  faEdit,
  faSave,
  faTimes,
  faCamera,
  faUpload
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/UserContext';

const ProfilePage = () => {
  const { username } = useParams();
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('novels');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Mock profile data
  const profile = {
    username: username,
    displayName: username === 'rwx' ? 'RWX' : username === 'X' ? 'Administrator' : username,
    role: username === 'rwx' ? 'translator' : username === 'X' ? 'admin' : 'reader',
    joinDate: new Date('2023-01-15'),
    bio: username === 'rwx' ? 'Professional translator specializing in Chinese web novels. Bringing you the best stories from the East.' : 
         username === 'X' ? 'Platform Administrator managing TranX community.' : 'Avid reader of translated novels.',
    avatar: user?.avatar || null,
    location: username === 'rwx' ? 'United States' : username === 'X' ? 'Global' : 'Unknown',
    website: username === 'rwx' ? 'https://rwxtranslations.com' : '',
    stats: {
      novelsTranslated: username === 'rwx' ? 3 : 0,
      chaptersTranslated: username === 'rwx' ? 245 : 0,
      followers: username === 'rwx' ? 1250 : username === 'X' ? 5000 : 12,
      following: 15
    },
    novels: username === 'rwx' ? [
      {
        id: 1,
        title: 'Coiling Dragon',
        chapters: 806,
        status: 'Completed',
        cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop'
      },
      {
        id: 2,
        title: 'I Shall Seal the Heavens',
        chapters: 1614,
        status: 'Completed',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop'
      }
    ] : [],
    readingList: [
      {
        id: 1,
        title: 'The Legendary Mechanic',
        currentChapter: 142,
        totalChapters: 1463,
        cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=300&fit=crop'
      },
      {
        id: 2,
        title: 'Overlord',
        currentChapter: 8,
        totalChapters: 14,
        cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop'
      }
    ]
  };

  const isOwnProfile = user?.username === username;

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    setEditData({
      displayName: profile.displayName,
      bio: profile.bio,
      location: profile.location,
      website: profile.website
    });
    setAvatarPreview(profile.avatar);
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      // In real app, call API to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedData = { ...editData };
      if (avatarFile) {
        // In real app, upload avatar to server and get URL
        updatedData.avatar = avatarPreview;
      }
      
      // Update user context if editing own profile
      if (isOwnProfile) {
        updateUser(updatedData);
      }
      
      setIsEditing(false);
      setAvatarFile(null);
      setAvatarPreview(null);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({});
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {(isEditing && avatarPreview) || profile.avatar ? (
                  <img 
                    src={isEditing && avatarPreview ? avatarPreview : profile.avatar} 
                    alt={profile.displayName} 
                    className="w-24 h-24 rounded-full object-cover" 
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} size="2x" className="text-gray-500" />
                )}
              </div>
              
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <label className="bg-black text-white p-2 rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
                    <FontAwesomeIcon icon={faCamera} size="sm" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.displayName}
                      onChange={(e) => setEditData(prev => ({ ...prev, displayName: e.target.value }))}
                      className="text-3xl font-bold text-black mb-2 border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-black mb-2">{profile.displayName}</h1>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      profile.role === 'translator' ? 'bg-blue-100 text-blue-800' : 
                      profile.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {profile.role === 'translator' ? 'Translator' : 
                       profile.role === 'admin' ? 'Administrator' : 'Reader'}
                    </span>
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faCalendar} className="mr-1" size="sm" />
                      Joined {profile.joinDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {isOwnProfile && (
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <FontAwesomeIcon icon={faSave} className="mr-2" size="sm" />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          <FontAwesomeIcon icon={faTimes} className="mr-2" size="sm" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleEditProfile}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <FontAwesomeIcon icon={faEdit} className="mr-2" size="sm" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              {profile.bio && (
                <div className="mb-4">
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-700">{profile.bio}</p>
                  )}
                </div>
              )}

              {/* Additional Info */}
              <div className="space-y-2 mb-4">
                {profile.location && (
                  <div className="text-sm text-gray-600">
                    <strong>Location:</strong> {isEditing ? (
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                        className="ml-2 border border-gray-300 rounded px-2 py-1"
                        placeholder="Location"
                      />
                    ) : (
                      profile.location
                    )}
                  </div>
                )}
                {profile.website && (
                  <div className="text-sm text-gray-600">
                    <strong>Website:</strong> {isEditing ? (
                      <input
                        type="url"
                        value={editData.website}
                        onChange={(e) => setEditData(prev => ({ ...prev, website: e.target.value }))}
                        className="ml-2 border border-gray-300 rounded px-2 py-1"
                        placeholder="Website URL"
                      />
                    ) : (
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {profile.website}
                      </a>
                    )}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">{profile.stats.novelsTranslated}</div>
                  <div className="text-sm text-gray-600">Novels</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">{profile.stats.chaptersTranslated}</div>
                  <div className="text-sm text-gray-600">Chapters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">{profile.stats.followers}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">{profile.stats.following}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {(profile.role === 'translator' || profile.role === 'admin') && (
                <button
                  onClick={() => setActiveTab('novels')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'novels'
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FontAwesomeIcon icon={faBook} className="inline mr-2" size="sm" />
                  {profile.role === 'admin' ? 'Managed Novels' : 'Translated Novels'}
                </button>
              )}
              <button
                onClick={() => setActiveTab('reading')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reading'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FontAwesomeIcon icon={faHeart} className="inline mr-2" size="sm" />
                Reading List
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'novels' && (profile.role === 'translator' || profile.role === 'admin') && (
            <div>
              <h2 className="text-xl font-bold text-black mb-6">
                {profile.role === 'admin' ? 'Managed Novels' : 'Translated Novels'}
              </h2>
              {profile.novels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profile.novels.map((novel) => (
                    <div key={novel.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <img
                        src={novel.cover}
                        alt={novel.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-black mb-2">{novel.title}</h3>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>{novel.chapters} chapters</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            novel.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {novel.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FontAwesomeIcon icon={faBook} size="3x" className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">
                    {profile.role === 'admin' ? 'No novels managed yet' : 'No translated novels yet'}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reading' && (
            <div>
              <h2 className="text-xl font-bold text-black mb-6">Reading List</h2>
              {profile.readingList.length > 0 ? (
                <div className="space-y-4">
                  {profile.readingList.map((novel) => (
                    <div key={novel.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={novel.cover}
                          alt={novel.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-black mb-2">{novel.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Chapter {novel.currentChapter} / {novel.totalChapters}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-black h-2 rounded-full"
                                style={{ width: `${(novel.currentChapter / novel.totalChapters) * 100}%` }}
                              />
                            </div>
                            <span>{Math.round((novel.currentChapter / novel.totalChapters) * 100)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FontAwesomeIcon icon={faHeart} size="3x" className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">No novels in reading list yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;