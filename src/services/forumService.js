import { storageService } from './storageService';
import { mockThreads, mockReplies } from './mockData';

const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return 'Just now';
};

export const forumService = {
  getThreads(filter = 'recent') {
    return new Promise((resolve) => {
      setTimeout(() => {
        let threads = storageService.getThreads();
        if (!threads) {
          threads = mockThreads;
          storageService.setThreads(threads);
        }

        // Add timeAgo to each thread
        threads = threads.map(t => ({
          ...t,
          timeAgo: getTimeAgo(t.createdAt)
        }));

        // Apply filters
        switch (filter) {
          case 'popular':
            threads.sort((a, b) => b.likes - a.likes);
            break;
          case 'trending':
            threads.sort((a, b) => b.views - a.views);
            break;
          case 'unanswered':
            threads = threads.filter(t => t.replies === 0);
            break;
          default: // recent
            threads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        resolve(threads);
      }, 300);
    });
  },

  getThread(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const threads = storageService.getThreads() || mockThreads;
        const thread = threads.find(t => t.id === parseInt(id));
        
        if (thread) {
          resolve({
            ...thread,
            timeAgo: getTimeAgo(thread.createdAt)
          });
        } else {
          reject(new Error('Thread not found'));
        }
      }, 300);
    });
  },

  createThread(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const threads = storageService.getThreads() || mockThreads;
        const currentUser = storageService.getCurrentUser();

        const newThread = {
          id: Date.now(),
          ...data,
          author: currentUser.name,
          authorId: currentUser.id,
          replies: 0,
          views: 0,
          likes: 0,
          status: 'open',
          createdAt: new Date(),
          timeAgo: 'Just now'
        };

        threads.unshift(newThread);
        storageService.setThreads(threads);

        resolve(newThread);
      }, 500);
    });
  },

  getReplies(threadId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let allReplies = storageService.getReplies();
        if (!allReplies) {
          allReplies = mockReplies;
          storageService.setReplies(allReplies);
        }

        const replies = allReplies[threadId] || [];
        const repliesWithTime = replies.map(r => ({
          ...r,
          timeAgo: getTimeAgo(r.createdAt)
        }));

        resolve(repliesWithTime);
      }, 300);
    });
  },

  addReply(threadId, content) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = storageService.getCurrentUser();
        let allReplies = storageService.getReplies() || mockReplies;

        const newReply = {
          id: Date.now(),
          threadId: parseInt(threadId),
          content,
          author: currentUser.name,
          authorId: currentUser.id,
          likes: 0,
          createdAt: new Date(),
          timeAgo: 'Just now'
        };

        if (!allReplies[threadId]) {
          allReplies[threadId] = [];
        }
        allReplies[threadId].push(newReply);
        storageService.setReplies(allReplies);

        // Update thread reply count
        const threads = storageService.getThreads() || mockThreads;
        const thread = threads.find(t => t.id === parseInt(threadId));
        if (thread) {
          thread.replies += 1;
          storageService.setThreads(threads);
        }

        resolve(newReply);
      }, 500);
    });
  },

  deleteThread(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let threads = storageService.getThreads() || mockThreads;
        threads = threads.filter(t => t.id !== id);
        storageService.setThreads(threads);
        resolve();
      }, 300);
    });
  }
};
