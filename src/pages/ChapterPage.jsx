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
  faTimes,
  faBookmark,
  faComment,
  faPlus,
  faMinus
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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFootnotes, setShowFootnotes] = useState(true);
  const [paragraphComments, setParagraphComments] = useState({});
  const [showCommentForm, setShowCommentForm] = useState(null);

  // Mock data
  const novel = {
    title: "Coiling Dragon",
    slug: "coiling-dragon",
    translator: "RWX",
    translatorId: "rwx",
    volumes: [
      { name: "Volume 1: The Ring Awakens", chapters: [1, 2, 3, 4, 5] },
      { name: "Volume 2: Coiling Dragon Ring", chapters: [6, 7, 8, 9, 10] },
      { name: "Volume 3: Mountain Range", chapters: [11, 12, 13, 14, 15] }
    ]
  };

  const chapter = {
    number: parseInt(chapterNumber),
    title: "The Dragonblood Warrior Clan",
    content: `<p data-paragraph="1">On the Yulan continent, the empires of the north and south have been at war for countless years<sup><a href="#footnote-1" class="footnote-link">1</a></sup>. In the eastern regions of the Yulan continent, there was a small, unremarkable town called Wushan town.</p>

    <p data-paragraph="2">Although Wushan town was unremarkable, it was extremely ancient. The town's population was roughly fifty thousand people, and it possessed a history of roughly five thousand years. In the back mountains of Wushan town, there was an extremely ancient clan – the Baruch clan<sup><a href="#footnote-2" class="footnote-link">2</a></sup>.</p>

    <p data-paragraph="3">The Baruch clan possessed a history of roughly five thousand years as well, the same as Wushan town. What's more, the history of the Baruch clan was inextricably linked with that of Wushan town. But now, the Baruch clan was in dire straits.</p>

    <p data-paragraph="4">Within the Baruch clan's manor, in the main hall.</p>

    <p data-paragraph="5">"Father, our clan's situation is becoming more and more dire. We only have three or four hundred gold coins left. I'm afraid that in just two more years, we won't even be able to afford to hire those servants." A middle-aged man said respectfully to an old man with a head full of white hair.</p>`,
    footnotes: [
      { id: 1, text: "The Yulan continent has been in a state of perpetual warfare between the Holy Union in the north and the Dark Alliance in the south." },
      { id: 2, text: "The Baruch clan was once known as the Dragonblood Warrior clan, famous throughout the continent." }
    ],
    isLocked: false,
    publishedAt: new Date(),
    nextChapter: 2,
    prevChapter: null
  };

  const allChapters = novel.volumes.flatMap(volume => 
    volume.chapters.map(num => ({
      number: num,
      title: `Chapter ${num}: ${num === 1 ? 'The Dragonblood Warrior Clan' : 
        num === 6 ? 'The Ernst Institute' : 
        `Chapter Title ${num}`}`,
      volume: volume.name,
      isLocked: num > 10
    }))
  );

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

  const handleParagraphComment = (paragraphId, commentText) => {
    if (!commentText.trim()) return;
    
    setParagraphComments(prev => ({
      ...prev,
      [paragraphId]: [...(prev[paragraphId] || []), {
        id: Date.now(),
        user: user.username,
        text: commentText,
        timestamp: new Date()
      }]
    }));
    setShowCommentForm(null);
  };

  const renderContentWithComments = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const paragraphs = doc.querySelectorAll('p[data-paragraph]');
    
    return Array.from(paragraphs).map((p, index) => {
      const paragraphId = p.getAttribute('data-paragraph');
      const comments = paragraphComments[paragraphId] || [];
      
      return (
        <div key={index} className="relative group mb-6">
          <div 
            className="paragraph-content"
            dangerouslySetInnerHTML={{ __html: p.outerHTML }}
          />
          
          {/* Paragraph comment button */}
          {user && (
            <button
              onClick={() => setShowCommentForm(showCommentForm === paragraphId ? null : paragraphId)}
              className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200 rounded-full p-1"
            >
              <FontAwesomeIcon icon={faComment} size="sm" />
            </button>
          )}
          
          {/* Comment form */}
          {showCommentForm === paragraphId && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <textarea
                placeholder="Add a comment to this paragraph..."
                className="w-full p-2 border border-gray-300 rounded text-sm"
                rows={2}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleParagraphComment(paragraphId, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
          )}
          
          {/* Existing comments */}
          {comments.length > 0 && (
            <div className="mt-2 space-y-2">
              {comments.map(comment => (
                <div key={comment.id} className="bg-blue-50 p-2 rounded text-sm">
                  <div className="font-medium text-blue-800">{comment.user}</div>
                  <div className="text-gray-700">{comment.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
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
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg border border-gray-300 ${
                  isBookmarked ? 'text-yellow-500' : 'text-gray-600 hover:text-black'
                }`}
              >
                <FontAwesomeIcon icon={faBookmark} size="lg" />
              </button>
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
            <div>
              {renderContentWithComments(chapter.content)}
              
              {/* Footnotes */}
              {showFootnotes && chapter.footnotes && chapter.footnotes.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Footnotes</h3>
                    <button
                      onClick={() => setShowFootnotes(!showFootnotes)}
                      className="text-sm text-gray-600 hover:text-black"
                    >
                      <FontAwesomeIcon icon={showFootnotes ? faMinus : faPlus} className="mr-1" />
                      {showFootnotes ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {chapter.footnotes.map(footnote => (
                      <div key={footnote.id} id={`footnote-${footnote.id}`} className="text-sm">
                        <span className="font-medium">{footnote.id}.</span> {footnote.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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

      {/* Chapter List Sidebar with Volumes */}
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
                {novel.volumes.map((volume, volumeIndex) => (
                  <div key={volumeIndex} className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2 px-2">{volume.name}</h4>
                    <div className="space-y-1">
                      {volume.chapters.map((chapterNum) => {
                        const chapterData = allChapters.find(c => c.number === chapterNum);
                        return (
                          <Link
                            key={chapterNum}
                            to={`/novel/${novelSlug}/chapter-${chapterNum}`}
                            className={`block p-3 rounded-lg transition-colors ${
                              chapterNum === chapter.number
                                ? 'bg-black text-white'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => setShowChapterList(false)}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{chapterData?.title}</span>
                              {chapterData?.isLocked && <FontAwesomeIcon icon={faLock} size="sm" />}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
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