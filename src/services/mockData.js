export const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password123', avatar: 'JS' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', password: 'password123', avatar: 'MJ' },
];

export const mockThreads = [
  {
    id: 1,
    title: 'How to integrate AI chatbot in React?',
    content: 'I am trying to add an AI-powered chatbot to my React application. What are the best practices and libraries you recommend?',
    author: 'John Doe',
    authorId: 1,
    category: 'Technical Support',
    status: 'open',
    replies: 12,
    views: 245,
    likes: 8,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    tags: ['AI', 'Chatbot', 'React']
  },
  {
    id: 2,
    title: 'Best practices for state management',
    content: 'What is the recommended approach for managing complex state in large React applications? Context API vs Redux?',
    author: 'Jane Smith',
    authorId: 2,
    category: 'General Discussion',
    status: 'solved',
    replies: 8,
    views: 189,
    likes: 15,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    tags: ['State Management', 'Redux', 'Context API']
  },
  {
    id: 3,
    title: 'Dark mode implementation guide',
    content: 'Looking for help implementing a theme switcher with dark mode support using Tailwind CSS.',
    author: 'Mike Johnson',
    authorId: 3,
    category: 'Feature Requests',
    status: 'open',
    replies: 15,
    views: 312,
    likes: 22,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    tags: ['Dark Mode', 'Tailwind', 'CSS']
  },
  {
    id: 4,
    title: 'Performance optimization tips',
    content: 'Share your best tips for optimizing React app performance. Lazy loading, code splitting, etc.',
    author: 'John Doe',
    authorId: 1,
    category: 'General Discussion',
    status: 'open',
    replies: 6,
    views: 156,
    likes: 11,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tags: ['Performance', 'Optimization']
  },
];

export const mockReplies = {
  1: [
    {
      id: 101,
      threadId: 1,
      content: 'I recommend using the OpenAI API with a custom React component. Works great!',
      author: 'Jane Smith',
      authorId: 2,
      likes: 5,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: 102,
      threadId: 1,
      content: 'Check out libraries like react-chatbot-kit or build your own with WebSocket connections.',
      author: 'Mike Johnson',
      authorId: 3,
      likes: 3,
      createdAt: new Date(Date.now() - 30 * 60 * 1000)
    }
  ],
  2: [
    {
      id: 201,
      threadId: 2,
      content: 'For large apps, I prefer Redux Toolkit. It has great DevTools and middleware support.',
      author: 'John Doe',
      authorId: 1,
      likes: 7,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ],
  3: [
    {
      id: 301,
      threadId: 3,
      content: 'Use CSS variables and toggle a class on the root element. Super simple with Tailwind dark mode.',
      author: 'Jane Smith',
      authorId: 2,
      likes: 12,
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000)
    }
  ]
};
