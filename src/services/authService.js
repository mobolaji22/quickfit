// services/authService.js

// Register a new user with additional fitness data
export const registerUser = (userData) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((user) => user.username === userData.username);

  if (userExists) {
    return { success: false, message: "User already exists" };
  }

  // Add the new user with their fitness data
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true, message: "Registration successful" };
};

// Log in an existing user
export const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // Store the logged-in user's data in localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, message: "Login successful" };
  }

  return { success: false, message: "Invalid username or password" };
};

// Log out the current user
export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};

// Get the currently logged-in user's data
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

// Update the current user's data
export const updateUserData = (updatedData) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const updatedUsers = users.map((user) =>
    user.username === currentUser.username ? updatedData : user
  );

  // Update local storage with the updated user data
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("currentUser", JSON.stringify(updatedData));
};
