import { storageService } from './storageService';
import { mockUsers } from './mockData';

export const authService = {
  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = storageService.getUsers();
        if (!users) {
          users = mockUsers;
          storageService.setUsers(users);
        }

        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password: _password, ...userWithoutPassword } = user;
          resolve({ user: userWithoutPassword, token: 'mock-token-' + user.id });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  },

  signup(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = storageService.getUsers() || mockUsers;
        
        if (users.find(u => u.email === userData.email)) {
          reject(new Error('Email already exists'));
          return;
        }

        const newUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          password: userData.password,
          avatar: userData.name.split(' ').map(n => n[0]).join('').toUpperCase()
        };

        users.push(newUser);
        storageService.setUsers(users);

        const { password: _, ...userWithoutPassword } = newUser;
        resolve({ user: userWithoutPassword, token: 'mock-token-' + newUser.id });
      }, 500);
    });
  },

  validateToken() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = storageService.getCurrentUser();
        resolve(user);
      }, 300);
    });
  }
};
