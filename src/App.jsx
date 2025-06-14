import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import NovelPage from './pages/NovelPage';
import ChapterPage from './pages/ChapterPage';
import CreateNovelPage from './pages/CreateNovelPage';
import EditNovelPage from './pages/EditNovelPage';
import CreateChapterPage from './pages/CreateChapterPage';
import EditChapterPage from './pages/EditChapterPage';
import TranslatorApplicationPage from './pages/TranslatorApplicationPage';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import TranslatorTools from './pages/TranslatorTools';
import './App.css';

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/novel/:novelSlug" element={<NovelPage />} />
              <Route path="/novel/:novelSlug/chapter-:chapterNumber" element={<ChapterPage />} />
              <Route path="/create-novel" element={<CreateNovelPage />} />
              <Route path="/edit-novel/:novelSlug" element={<EditNovelPage />} />
              <Route path="/create-chapter/:novelSlug" element={<CreateChapterPage />} />
              <Route path="/edit-chapter/:novelSlug/:chapterNumber" element={<EditChapterPage />} />
              <Route path="/become-translator" element={<TranslatorApplicationPage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/translator-tools" element={<TranslatorTools />} />
            </Routes>
          </Layout>
        </Router>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;