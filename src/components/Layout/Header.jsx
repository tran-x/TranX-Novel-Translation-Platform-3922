import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faBell, faUser, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../contexts/UserContext';
import { useNotifications } from '../../contexts/NotificationContext';
import NotificationDropdown from '../Notifications/NotificationDropdown';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout, isTranslator } = useUser();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-black">TranX</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-black transition-colors">
              Home
            </Link>
            <Link to="/archive" className="text-gray-700 hover:text-black transition-colors">
              Archive
            </Link>
            {isTranslator && (
              <>
                <Link to="/create-novel" className="text-gray-700 hover:text-black transition-colors">
                  Add Novel
                </Link>
                <Link to="/translator-tools" className="text-gray-700 hover:text-black transition-colors">
                  Tools
                </Link>
              </>
            )}
            {!user && (
              <Link to="/become-translator" className="text-gray-700 hover:text-black transition-colors">
                Become Translator
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <FontAwesomeIcon icon={faBell} size="lg" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <NotificationDropdown onClose={() => setShowNotifications(false)} />
                  )}
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/profile/${user.username}`}
                    className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <FontAwesomeIcon icon={faUser} size="lg" />
                    <span className="hidden sm:inline">{user.username}</span>
                  </Link>
                  <Link
                    to="/account"
                    className="p-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <FontAwesomeIcon icon={faCog} size="lg" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-black transition-colors"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/archive"
                className="text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Archive
              </Link>
              {isTranslator && (
                <>
                  <Link
                    to="/create-novel"
                    className="text-gray-700 hover:text-black transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Novel
                  </Link>
                  <Link
                    to="/translator-tools"
                    className="text-gray-700 hover:text-black transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tools
                  </Link>
                </>
              )}
              {!user && (
                <Link
                  to="/become-translator"
                  className="text-gray-700 hover:text-black transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Become Translator
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;