import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simple but secure password hashing function
  const hashPassword = (password) => {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  };

  function signup(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        // Validate input
        if (!email || !password) {
          throw new Error('Please fill in all fields');
        }

        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error('Please enter a valid email address');
        }

        // Check password length
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }

        // Get existing users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.some(user => user.email === email)) {
          throw new Error('Email already in use');
        }
        
        // Hash password
        const hashedPassword = hashPassword(password);
        
        // Create new user
        const newUser = { 
          email, 
          password: hashedPassword,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        
        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Set current user
        const user = { email, id: newUser.id };
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        
        resolve();
      } catch (error) {
        console.error('Signup error:', error);
        reject(error.message || 'Failed to create account. Please try again.');
      }
    });
  }

  function login(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        // Validate input
        if (!email || !password) {
          throw new Error('Please fill in all fields');
        }

        // Get users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
          throw new Error('Invalid email or password');
        }
        
        // Verify password
        const hashedPassword = hashPassword(password);
        if (user.password !== hashedPassword) {
          throw new Error('Invalid email or password');
        }
        
        // Set current user
        const currentUser = { email, id: user.id };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        setCurrentUser(currentUser);
        
        resolve();
      } catch (error) {
        console.error('Login error:', error);
        reject(error.message || 'Failed to login. Please try again.');
      }
    });
  }

  function logout() {
    try {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      return Promise.resolve();
    } catch (error) {
      console.error('Logout error:', error);
      return Promise.reject('Failed to logout. Please try again.');
    }
  }

  useEffect(() => {
    // Check if user is already logged in
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error('Error checking current user:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 