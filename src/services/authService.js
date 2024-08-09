// services/authService.js
export const registerUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    return { success: false, message: "User already exists" };
  }

  const newUser = { username, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true, message: "Registration successful" };
};

export const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, message: "Login successful" };
  }

  return { success: false, message: "Invalid username or password" };
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};
