import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faBook, 
  faComments, 
  faChartLine, 
  faCheck, 
  faTimes,
  faUserShield,
  faServer,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/UserContext';

const AdminDashboard = () => {
  const { user, isAdmin } = useUser();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Access Denied</h1>
          <p className="text-gray-600">You need administrator privileges to access this page.</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalUsers: 1247,
    totalNovels: 156,
    totalChapters: 12456,
    pendingApplications: 8,
    serverStatus: 'Online',
    systemLoad: '23%'
  };

  const pendingApplications = [
    {
      id: 1,
      username: 'translator_wannabe',
      email: 'translator@example.com',
      novelType: 'Chinese',
      novelTitle: 'Battle Through the Heavens',
      submittedAt: new Date('2024-01-15'),
      status: 'pending'
    },
    {
      id: 2,
      username: 'jpn_translator',
      email: 'jpn@example.com',
      novelType: 'Japanese',
      novelTitle: 'Sword Art Online Progressive',
      submittedAt: new Date('2024-01-14'),
      status: 'pending'
    }
  ];

  const recentUsers = [
    {
      id: 1,
      username: 'reader123',
      email: 'reader@example.com',
      role: 'reader',
      joinedAt: new Date('2024-01-16')
    },
    {
      id: 2,
      username: 'bookworm',
      email: 'bookworm@example.com',
      role: 'reader',
      joinedAt: new Date('2024-01-15')
    }
  ];

  const systemLogs = [
    { time: '2024-01-16 14:30', level: 'INFO', message: 'New user registered: bookworm' },
    { time: '2024-01-16 14:25', level: 'INFO', message: 'Chapter published: Coiling Dragon Ch. 21' },
    { time: '2024-01-16 14:20', level: 'WARN', message: 'High memory usage detected' },
    { time: '2024-01-16 14:15', level: 'INFO', message: 'Translator application submitted' }
  ];

  const handleApplicationAction = (applicationId, action) => {
    console.log(`${action} application ${applicationId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your TranX platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-black">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FontAwesomeIcon icon={faBook} className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Novels</p>
                <p className="text-2xl font-bold text-black">{stats.totalNovels.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FontAwesomeIcon icon={faComments} className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Chapters</p>
                <p className="text-2xl font-bold text-black">{stats.totalChapters.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FontAwesomeIcon icon={faChartLine} className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold text-black">{stats.pendingApplications}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'applications'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Translator Applications
                {stats.pendingApplications > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {stats.pendingApplications}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'system'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                System
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-black mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm text-gray-700">New chapter published: Coiling Dragon Ch. 21</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm text-gray-700">New user registered: bookworm</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <p className="text-sm text-gray-700">Translator application submitted</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-black mb-4">System Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Server Status</span>
                    <span className="text-sm font-medium text-green-600">{stats.serverStatus}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">System Load</span>
                    <span className="text-sm font-medium text-black">{stats.systemLoad}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Database</span>
                    <span className="text-sm font-medium text-green-600">Healthy</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-black">Translator Applications</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Novel Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingApplications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-black">{application.username}</div>
                            <div className="text-sm text-gray-500">{application.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-black">{application.novelTitle}</div>
                            <div className="text-sm text-gray-500">{application.novelType}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.submittedAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApplicationAction(application.id, 'approve')}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full text-white bg-green-600 hover:bg-green-700"
                            >
                              <FontAwesomeIcon icon={faCheck} className="mr-1" size="xs" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleApplicationAction(application.id, 'reject')}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full text-white bg-red-600 hover:bg-red-700"
                            >
                              <FontAwesomeIcon icon={faTimes} className="mr-1" size="xs" />
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-black">Recent Users</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-black">{user.username}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'translator' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.joinedAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-black hover:underline">
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-black mb-4">System Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faServer} size="2x" className="text-blue-600 mb-2" />
                    <p className="text-sm text-gray-500">Server Status</p>
                    <p className="font-semibold text-green-600">Online</p>
                  </div>
                  <div className="text-center">
                    <FontAwesomeIcon icon={faDatabase} size="2x" className="text-green-600 mb-2" />
                    <p className="text-sm text-gray-500">Database</p>
                    <p className="font-semibold text-green-600">Healthy</p>
                  </div>
                  <div className="text-center">
                    <FontAwesomeIcon icon={faUserShield} size="2x" className="text-purple-600 mb-2" />
                    <p className="text-sm text-gray-500">Security</p>
                    <p className="font-semibold text-green-600">Active</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-black mb-4">System Logs</h3>
                <div className="space-y-3">
                  {systemLogs.map((log, index) => (
                    <div key={index} className="flex items-center space-x-3 py-2 border-b border-gray-100">
                      <span className="text-xs text-gray-500 w-32">{log.time}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        log.level === 'INFO' ? 'bg-blue-100 text-blue-800' :
                        log.level === 'WARN' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {log.level}
                      </span>
                      <span className="text-sm text-gray-700">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;