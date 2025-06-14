import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faClock, 
  faComments, 
  faFire 
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const HomePage = () => {
  const featuredNovels = [
    {
      id: 1,
      title: "Coiling Dragon",
      originalTitle: "盘龙",
      author: "I Eat Tomatoes",
      translator: "RWX",
      type: "Chinese",
      status: "Completed",
      chapters: 806,
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      description: "Empires rise and fall on the Yulan Continent. Saints, immortal beings of unimaginable power, battle using spells and swords...",
      slug: "coiling-dragon"
    },
    {
      id: 2,
      title: "The Legendary Mechanic",
      originalTitle: "超神机械师",
      author: "Qi Peijia",
      translator: "Henyee",
      type: "Chinese",
      status: "Ongoing",
      chapters: 1463,
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      description: "What do you do when you wake up and find yourself inside the very game that you love?",
      slug: "legendary-mechanic"
    },
    {
      id: 3,
      title: "Overlord",
      originalTitle: "オーバーロード",
      author: "Kugane Maruyama",
      translator: "Nigel",
      type: "Japanese",
      status: "Ongoing",
      chapters: 14,
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "The final hour of the popular virtual reality game Yggdrasil has come...",
      slug: "overlord"
    }
  ];

  const latestChapters = [
    {
      novelTitle: "Coiling Dragon",
      chapterTitle: "Chapter 21: The Ernst Institute",
      chapterNumber: 21,
      novelSlug: "coiling-dragon",
      translator: "RWX",
      timeAgo: "2 hours ago"
    },
    {
      novelTitle: "The Legendary Mechanic",
      chapterTitle: "Chapter 1464: Unexpected Encounter",
      chapterNumber: 1464,
      novelSlug: "legendary-mechanic",
      translator: "Henyee",
      timeAgo: "5 hours ago"
    },
    {
      novelTitle: "Overlord",
      chapterTitle: "Volume 15 Chapter 1: To Take a Paid Vacation",
      chapterNumber: 1,
      novelSlug: "overlord",
      translator: "Nigel",
      timeAgo: "1 day ago"
    }
  ];

  const latestComments = [
    {
      user: "DragonReader",
      comment: "This chapter was absolutely amazing! The fight scene was so well written.",
      novel: "Coiling Dragon",
      timeAgo: "1 hour ago"
    },
    {
      user: "MechFan2024",
      comment: "Can't wait for the next chapter! This arc is getting intense.",
      novel: "The Legendary Mechanic",
      timeAgo: "3 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-black mb-6"
          >
            Welcome to TranX
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Discover the finest translated Chinese, Japanese, and Korean novels. 
            Join our community of readers and translators.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/register"
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Start Reading
            </Link>
            <Link
              to="/become-translator"
              className="border border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-colors font-medium"
            >
              Become a Translator
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Novels */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faFire} className="mr-2" />
              <h2 className="text-2xl font-bold text-black">Featured Novels</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredNovels.map((novel) => (
                <motion.div
                  key={novel.id}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={novel.cover}
                    alt={novel.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        novel.type === 'Chinese' ? 'bg-red-100 text-red-800' :
                        novel.type === 'Japanese' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {novel.type}
                      </span>
                      <span className="text-xs text-gray-500">{novel.chapters} chapters</span>
                    </div>
                    <h3 className="font-bold text-lg text-black mb-1">
                      <Link to={`/novel/${novel.slug}`} className="hover:underline">
                        {novel.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{novel.originalTitle}</p>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {novel.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>by {novel.author}</span>
                      <span>TL: {novel.translator}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Latest Chapters */}
            <div>
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                <h3 className="text-lg font-bold text-black">Latest Updates</h3>
              </div>
              <div className="space-y-3">
                {latestChapters.map((chapter, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <Link
                      to={`/novel/${chapter.novelSlug}/chapter-${chapter.chapterNumber}`}
                      className="font-medium text-black hover:underline block mb-1"
                    >
                      {chapter.chapterTitle}
                    </Link>
                    <p className="text-sm text-gray-600 mb-1">{chapter.novelTitle}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>by {chapter.translator}</span>
                      <span>{chapter.timeAgo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Comments */}
            <div>
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faComments} className="mr-2" />
                <h3 className="text-lg font-bold text-black">Latest Comments</h3>
              </div>
              <div className="space-y-3">
                {latestComments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">"{comment.comment}"</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>by {comment.user}</span>
                      <span>{comment.timeAgo}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">on {comment.novel}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;