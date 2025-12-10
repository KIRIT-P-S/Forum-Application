import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardBody, CardHeader } from '../components/common/Card';
import { useAuth } from '../context/AuthContext';
import { forumService } from '../services/forumService';

const Dashboard = () => {
  const { user } = useAuth();
  const [myThreads, setMyThreads] = useState([]);
  const [stats, setStats] = useState({ totalThreads: 0, totalReplies: 0, totalViews: 0 });

  const loadUserData = async () => {
    const threads = await forumService.getThreads();
    const userThreads = threads.filter(t => t.author === user.name);
    setMyThreads(userThreads);

    const totalViews = userThreads.reduce((sum, t) => sum + t.views, 0);
    const totalReplies = userThreads.reduce((sum, t) => sum + t.replies, 0);

    setStats({
      totalThreads: userThreads.length,
      totalReplies,
      totalViews
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadUserData();
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, {user.name}!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.totalThreads}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Total Posts</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.totalReplies}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Replies Received</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{stats.totalViews}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Total Views</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* My Threads */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Discussions</h2>
        </CardHeader>
        <CardBody>
          {myThreads.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              You haven't created any discussions yet.
            </p>
          ) : (
            <div className="space-y-3">
              {myThreads.map((thread) => (
                <Link
                  key={thread.id}
                  to={`/thread/${thread.id}`}
                  className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white">{thread.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{thread.replies} replies</span>
                    <span>•</span>
                    <span>{thread.views} views</span>
                    <span>•</span>
                    <span>{thread.timeAgo}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
