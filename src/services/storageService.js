const STORAGE_KEYS = {
  USER: 'forum_current_user',
  THREADS: 'forum_threads',
  REPLIES: 'forum_replies',
  USERS: 'forum_users'
};

export const storageService = {
  // User Management
  getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  clearCurrentUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Threads
  getThreads() {
    const threads = localStorage.getItem(STORAGE_KEYS.THREADS);
    return threads ? JSON.parse(threads) : null;
  },

  setThreads(threads) {
    localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(threads));
  },

  // Replies
  getReplies() {
    const replies = localStorage.getItem(STORAGE_KEYS.REPLIES);
    return replies ? JSON.parse(replies) : null;
  },

  setReplies(replies) {
    localStorage.setItem(STORAGE_KEYS.REPLIES, JSON.stringify(replies));
  },

  // Users
  getUsers() {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : null;
  },

  setUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
};
