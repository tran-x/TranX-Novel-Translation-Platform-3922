import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faSort,
  faBook,
  faLanguage
} from '@fortawesome/free-solid-svg-icons';

const NovelArchivePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  // Mock novels data
  const novels = [
    {
      id: 1,
      title: "Coiling Dragon",
      originalTitle: "盘龙",
      author: "I Eat Tomatoes",
      translator: "RWX",
      type: "Chinese",
      status: "Completed",
      chapters: 806,
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
      description: "Empires rise and fall on the Yulan Continent...",
      slug: "coiling-dragon",
      updatedAt: new Date('2024-01-15')
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
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=300&fit=crop",
      description: "What do you do when you wake up and find yourself inside the very game that you love?",
      slug: "legendary-mechanic",
      updatedAt: new Date('2024-01-14')
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
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop",
      description: "The final hour of the popular virtual reality game Yggdrasil has come...",
      slug: "overlord",
      updatedAt: new Date('2024-01-13')
    }
  ];

  const filteredNovels = novels.filter(novel => {
    const matchesSearch = novel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         novel.originalTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         novel.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || novel.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || novel.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'chapters':
        return b.chapters - a.chapters;
      case 'latest':
      default:
        return b.updatedAt - a.updatedAt;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Novel Archive</h1>
          <p className="text-gray-600">Browse all available translated novels</p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                placeholder="Search novels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <FontAwesomeIcon 
                icon={faLanguage} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent appearance-none"
              >
                <option value="all">All Types</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="Korean">Korean</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <FontAwesomeIcon 
                icon={faFilter} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent appearance-none"
              >
                <option value="all">All Status</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Hiatus">Hiatus</option>
                <option value="Dropped">Dropped</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSort} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent appearance-none"
              >
                <option value="latest">Latest Updated</option>
                <option value="title">Title A-Z</option>
                <option value="chapters">Most Chapters</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found {filteredNovels.length} novel{filteredNovels.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Novel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNovels.map((novel) => (
            <div key={novel.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/novel/${novel.slug}`}>
                <img
                  src={novel.cover}
                  alt={novel.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    novel.type === 'Chinese' ? 'bg-red-100 text-red-800' :
                    novel.type === 'Japanese' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {novel.type}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    novel.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    novel.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {novel.status}
                  </span>
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
                  <span>
                    <FontAwesomeIcon icon={faBook} className="mr-1" />
                    {novel.chapters} chapters
                  </span>
                  <span>by {novel.translator}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNovels.length === 0 && (
          <div className="text-center py-12">
            <FontAwesomeIcon icon={faBook} size="3x" className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No novels found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NovelArchivePage;