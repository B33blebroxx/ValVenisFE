import Router from 'next/router';
import client from './client';

client.defaults.withCredentials = true;

const registerUser = async (userInfo) => {
  try {
    const response = await client.post('/auth/register', userInfo);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error;
  }
};

const checkUser = async () => {
  try {
    const response = await client.get('/auth/check', {
    });

    return response.data;
  } catch (error) {
    console.error('Error checking login status:', error.message);
    return { isLoggedIn: false };
  }
};

const signIn = async (email, password) => {
  try {
    const response = await client.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error during sign-in:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const signOut = async () => {
  try {
    await client.post('/auth/logout', {}, {
    });
    Router.push('/');
  } catch (error) {
    console.error('Error during sign-out:', error.response ? error.response.data : error.message);
  }
};

export {
  signIn, signOut, checkUser, registerUser,
};
