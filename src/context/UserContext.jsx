import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("userData");
    return savedData
      ? JSON.parse(savedData)
      : {
          username: "User",
          fitnessStage: "Beginner",
          fitnessGoal: "Run 5km",
          caloriesBurned: 0,
          stepsTaken: 0,
          activeHours: 0,
          workoutsCompleted: 0,
          goalProgress: 0,
          startWeight: 0,
          currentWeight: 0,
          startBodyFat: 0,
          currentBodyFat: 0,
          strengthLevel: "Beginner",
        };
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "userData") {
        setUserData(JSON.parse(event.newValue));
      }
    };

    // Listen for storage changes (from other tabs or windows)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateUserData = (newUserData) => {
    setUserData(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData));

    // Dispatch a custom event to notify other components of the change
    const event = new CustomEvent("userDataChanged", {
      detail: newUserData,
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const handleUserDataChange = (event) => {
      setUserData(event.detail);
    };

    // Listen for custom event
    window.addEventListener("userDataChanged", handleUserDataChange);

    return () => {
      window.removeEventListener("userDataChanged", handleUserDataChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};
