// utils/localStorage.js

export const setUserData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getUserData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const removeUserData = (key) => {
  localStorage.removeItem(key);
};

export const clearUserData = () => {
  localStorage.clear();
};
