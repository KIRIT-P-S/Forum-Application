import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card, { CardBody } from '../components/common/Card';
import Button from '../components/common/Button';
import { forumService } from '../services/forumService';

const Thread = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadThreadData();
  }, [id]);

  const loadThreadData = async () => {
    try {
      const [threadData, repliesData] = await Promise.all([
        forumService.getThread(id),
        forumService.getReplies(id)
      ]);
      setThread(threadData);
      setReplies(repliesData);
    } catch (error) {
      console.error('Failed to load thread:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setSubmitting(true);
    try {
      const reply = await forumService.addReply(id, newReply);
      setReplies([...replies, reply]);
      setNewReply('');
      setThread({ ...thread, replies: thread.replies + 1 });
    } catch (error) {
      console.error('Failed to add reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <Card><CardBody><div className="animate-pulse h-32 bg-gray-200 dark:bg-gray-700 rounded"></div></CardBody></Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Thread */}
      <Card>
        <CardBody className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs font-medium rounded-full">
                {thread.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-3">{thread.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {thread.author?.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{thread.author}</span>
            </div>
            <span>•</span>
            <span>{thread.timeAgo}</span>
            <span>•</span>
            <span>{thread.views} views</span>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{thread.content}</p>
          </div>

          {thread.tags && thread.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {thread.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Replies */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
        </h2>

        <div className="space-y-4">
          {replies.map((reply) => (
            <Card key={reply.id}>
              <CardBody>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {reply.author?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{reply.author}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{reply.timeAgo}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{reply.content}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Reply Form */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Your Reply</h3>
          <form onSubmit={handleSubmitReply} className="space-y-4">
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <Button type="submit" variant="primary" loading={submitting}>
              Post Reply
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Thread;
