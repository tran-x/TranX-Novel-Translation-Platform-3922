import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faList, 
  faCog, 
  faEdit, 
  faLock,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../contexts/UserContext';

const ChapterPage = () => {
  const { novelSlug, chapterNumber } = useParams();
  const { user, isTranslator } = useUser();
  const navigate = useNavigate();
  const [showChapterList, setShowChapterList] = useState(false);
  const [readerSettings, setReaderSettings] = useState({
    fontSize: 16,
    theme: 'light'
  });
  const [comment, setComment] = useState('');

  // Mock data
  const novel = {
    title: "Coiling Dragon",
    slug: "coiling-dragon",
    translator: "RWX",
    translatorId: "rwx"
  };

  const chapter = {
    number: parseInt(chapterNumber),
    title: "The Dragonblood Warrior Clan",
    content: `<p>On the Yulan continent, the empires of the north and south have been at war for countless years. In the eastern regions of the Yulan continent, there was a small, unremarkable town called Wushan town.</p>

    <p>Although Wushan town was unremarkable, it was extremely ancient. The town's population was roughly fifty thousand people, and it possessed a history of roughly five thousand years. In the back mountains of Wushan town, there was an extremely ancient clan – the Baruch clan.</p>

    <p>The Baruch clan possessed a history of roughly five thousand years as well, the same as Wushan town. What's more, the history of the Baruch clan was inextricably linked with that of Wushan town. But now, the Baruch clan was in dire straits.</p>

    <p>Within the Baruch clan's manor, in the main hall.</p>

    <p>"Father, our clan's situation is becoming more and more dire. We only have three or four hundred gold coins left. I'm afraid that in just two more years, we won't even be able to afford to hire those servants." A middle-aged man said respectfully to an old man with a head full of white hair.</p>`,
    isLocked: false,
    publishedAt: new Date(),
    nextChapter: 2,
    prevChapter: null
  };

  const chapters = Array.from({ length: 50 }, (_, i) => ({
    number: i + 1,
    title: `Chapter ${i + 1}: ${i === 0 ? 'The Dragonblood Warrior Clan' : 
      i === 20 ? 'The Ernst Institute' : 
      `Chapter Title ${i + 1}`}`,
    isLocked: i > 30
  }));

  const comments = [
    {
      id: 1,
      user: "DragonReader",
      content: "Great chapter! The world-building is amazing.",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      user: "NovelFan2024",
      content: "Can't wait to see what happens next!",
      timestamp: new Date(Date.now() - 7200000)
    }
  ];

  const isOwner = user && (user.username === novel.translator || user.role === 'admin');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    // Add comment logic here
    setComment('');
  };

  return (
    <div className={`min-h-screen transition-colors ${
      readerSettings.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 border-b ${
        readerSettings.theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to={`/novel/${novelSlug}`}
              className="flex items-center text-gray-600 hover:text-black"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="mr-1" />
              Back to Novel
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowChapterList(!showChapterList)}
                className="p-2 text-gray-600 hover:text-black rounded-lg border border-gray-300"
              >
                <FontAwesomeIcon icon={faList} size="lg" />
              </button>
              <button
                onClick={() => setReaderSettings(prev => ({
                  ...prev,
                  theme: prev.theme === 'light' ? 'dark' : 'light'
                }))}
                className="p-2 text-gray-600 hover:text-black rounded-lg border border-gray-300"
              >
                <FontAwesomeIcon icon={faCog} size="lg" />
              </button>
              {isOwner && (
                <Link
                  to={`/edit-chapter/${novelSlug}/${chapterNumber}`}
                  className="p-2 text-gray-600 hover:text-black rounded-lg border border-gray-300"
                >
                  <FontAwesomeIcon icon={faEdit} size="lg" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Chapter Header */}
        <div className="text-center mb-8">
          <Link
            to={`/novel/${novelSlug}`}
            className="text-lg text-gray-600 hover:underline mb-2 block"
          >
            {novel.title}
          </Link>
          <h1 className="text-3xl font-bold mb-4">
            Chapter {chapter.number}: {chapter.title}
          </h1>
          {chapter.isLocked && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center text-yellow-800">
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                <span>This chapter is locked. Purchase with points to unlock.</span>
              </div>
            </div>
          )}
        </div>

        {/* Chapter Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose max-w-none mb-12"
          style={{ fontSize: `${readerSettings.fontSize}px`, lineHeight: 1.8 }}
        >
          {chapter.isLocked && !user ? (
            <div className="text-center py-16">
              <FontAwesomeIcon icon={faLock} size="3x" className="mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600 mb-4">This chapter is locked</p>
              <p className="text-gray-500 mb-6">Sign in or purchase points to unlock</p>
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                >
                  Sign In
                </Link>
                <button className="border border-black text-black px-6 py-2 rounded-lg hover:bg-black hover:text-white">
                  Purchase Points
                </button>
              </div>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 py-6 border-t border-gray-200">
          {chapter.prevChapter ? (
            <Link
              to={`/novel/${novelSlug}/chapter-${chapter.prevChapter}`}
              className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
              Previous
            </Link>
          ) : (
            <div></div>
          )}

          {chapter.nextChapter ? (
            <Link
              to={`/novel/${novelSlug}/chapter-${chapter.nextChapter}`}
              className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Next
              <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
            </Link>
          ) : (
            <div></div>
          )}
        </div>

        {/* Translator Info */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Translator</h3>
          <div className="flex items-center justify-between">
            <div>
              <Link
                to={`/profile/${novel.translatorId}`}
                className="font-medium text-black hover:underline"
              >
                {novel.translator}
              </Link>
              <p className="text-sm text-gray-600">Professional Translator</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Ko-fi
              </button>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                Patreon
              </button>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>
          
          {user && (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this chapter..."
                className="w-full p-4 border border-gray-300 rounded-lg resize-none"
                rows={4}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!comment.trim()}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post Comment
                </button>
              </div>
            </form>
          )}

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">{comment.user}</span>
                  <span className="text-sm text-gray-500">
                    {comment.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter List Sidebar */}
      <AnimatePresence>
        {showChapterList && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setShowChapterList(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">Chapters</h3>
                  <button
                    onClick={() => setShowChapterList(false)}
                    className="text-gray-500 hover:text-black"
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                {chapters.map((chap) => (
                  <Link
                    key={chap.number}
                    to={`/novel/${novelSlug}/chapter-${chap.number}`}
                    className={`block p-3 rounded-lg mb-2 transition-colors ${
                      chap.number === chapter.number
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setShowChapterList(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{chap.title}</span>
                      {chap.isLocked && <FontAwesomeIcon icon={faLock} size="sm" />}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChapterPage;