import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_novel',
      title: 'New Novel Published',
      message: 'The Legendary Mechanic has been published',
      timestamp: new Date(),
      read: false
    },
    {
      id: 2,
      type: 'new_chapter',
      title: 'New Chapter Available',
      message: 'Chapter 45 of Coiling Dragon is now available',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const addNotification = (notification) => {
    setNotifications(prev => [
      { ...notification, id: Date.now(), read: false, timestamp: new Date() },
      ...prev
    ]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};