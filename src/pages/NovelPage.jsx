import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faUser, 
  faCalendar, 
  faGlobe, 
  faEdit, 
  faPlus, 
  faHeart 
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';

const NovelPage = () => {
  const { novelSlug } = useParams();
  const { user, isTranslator } = useUser();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllChapters, setShowAllChapters] = useState(false);

  // Mock data - in real app, fetch based on novelSlug
  const novel = {
    id: 1,
    title: "Coiling Dragon",
    originalTitle: "盘龙",
    description: `<p>Empires rise and fall on the Yulan Continent. Saints, immortal beings of unimaginable power, battle using spells and swords, leaving swathes of destruction in their wake. Magical beasts rule the mountains, where the brave – or the foolish – go to test their strength.</p>
    
    <p>Even the mighty can fall, feasted on by those stronger. The strong live like royalty; the weak strive to survive another day.</p>
    
    <p>This is the world which Linley is born into. Raised in the small town of Wushan, Linley is a scion of the Baruch clan, the clan of the once-legendary Dragonblood Warriors. Their fame once shook the world, but the clan is now so decrepit that even the heirlooms of the clan have been sold off.</p>`,
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    originalAuthor: "I Eat Tomatoes",
    rawSource: "qidian.com",
    type: "Chinese",
    statusInCOO: "Completed",
    totalChapters: 806,
    translator: "RWX",
    translatorId: "rwx",
    translationStatus: "Completed",
    updateSchedule: "Daily",
    volumes: [
      { name: "Volume 1: The Ring Awakens", startChapter: 1 },
      { name: "Volume 2: Coiling Dragon Ring", startChapter: 21 },
      { name: "Volume 3: Mountain Range of Magical Beasts", startChapter: 45 }
    ],
    chapters: Array.from({ length: 50 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}: ${i === 0 ? 'The Dragonblood Warrior Clan' : 
        i === 20 ? 'The Ernst Institute' : 
        i === 44 ? 'Entering the Mountain Range' : 
        `Chapter Title ${i + 1}`}`,
      publishedAt: new Date(Date.now() - (49 - i) * 24 * 60 * 60 * 1000),
      isLocked: false
    })),
    slug: "coiling-dragon"
  };

  const isOwner = user && (user.username === novel.translator || user.role === 'admin');
  const chaptersToShow = showAllChapters ? novel.chapters : novel.chapters.slice(0, 10);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={novel.cover}
                    alt={novel.title}
                    className="w-full md:w-48 h-64 md:h-72 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-black mb-2">{novel.title}</h1>
                        <p className="text-lg text-gray-600 mb-4">{novel.originalTitle}</p>
                      </div>
                      {isOwner && (
                        <div className="flex space-x-2">
                          <Link
                            to={`/edit-novel/${novel.slug}`}
                            className="p-2 text-gray-600 hover:text-black border border-gray-300 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faEdit} size="sm" />
                          </Link>
                          <Link
                            to={`/create-chapter/${novel.slug}`}
                            className="p-2 text-gray-600 hover:text-black border border-gray-300 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faPlus} size="sm" />
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Original Author</p>
                        <p className="font-medium">{novel.originalAuthor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          novel.type === 'Chinese' ? 'bg-red-100 text-red-800' :
                          novel.type === 'Japanese' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {novel.type}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status in COO</p>
                        <p className="font-medium">{novel.statusInCOO}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Raw Source</p>
                        <p className="font-medium">{novel.rawSource}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Chapters</p>
                        <p className="font-medium">{novel.totalChapters}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Translation Status</p>
                        <p className="font-medium">{novel.translationStatus}</p>
                      </div>
                    </div>

                    {user && (
                      <button
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                          isFollowing 
                            ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                            : 'bg-black text-white hover:bg-gray-800'
                        }`}
                      >
                        <FontAwesomeIcon icon={faHeart} className={`mr-2 ${isFollowing ? 'text-red-600' : ''}`} />
                        {isFollowing ? 'Following' : 'Follow'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-bold text-black mb-4">Description</h2>
                  <div 
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: novel.description }}
                  />
                </div>

                {/* Volumes */}
                {novel.volumes.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-bold text-black mb-4">Volumes</h2>
                    <div className="space-y-2">
                      {novel.volumes.map((volume, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium">{volume.name}</p>
                          <p className="text-sm text-gray-600">Starts with Chapter {volume.startChapter}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Translator Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-black mb-4">Translator</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </div>
                <div>
                  <Link
                    to={`/profile/${novel.translatorId}`}
                    className="font-medium text-black hover:underline"
                  >
                    {novel.translator}
                  </Link>
                  <p className="text-sm text-gray-600">Professional Translator</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Update Schedule:</span> {novel.updateSchedule}</p>
              </div>
              <div className="mt-4 space-y-2">
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  Support on Ko-fi
                </button>
                <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                  Support on Patreon
                </button>
              </div>
            </div>

            {/* Chapter List */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-black mb-4">Chapters</h3>
              <div className="space-y-2">
                {chaptersToShow.map((chapter) => (
                  <Link
                    key={chapter.number}
                    to={`/novel/${novel.slug}/chapter-${chapter.number}`}
                    className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <p className="font-medium text-black">{chapter.title}</p>
                    <p className="text-sm text-gray-600">
                      {chapter.publishedAt.toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>
              {novel.chapters.length > 10 && (
                <button
                  onClick={() => setShowAllChapters(!showAllChapters)}
                  className="w-full mt-4 py-2 text-center text-gray-600 hover:text-black border border-gray-300 rounded-lg transition-colors"
                >
                  {showAllChapters ? 'Show Less' : `Show All ${novel.chapters.length} Chapters`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelPage;