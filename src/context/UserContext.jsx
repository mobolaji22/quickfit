import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("userData");
    return savedData
      ? JSON.parse(savedData)
      : {
          username: "User", // Ensure this gets replaced with the actual username
          fitnessStage: "Beginner",
          fitnessGoal: "Run 5km",
          caloriesBurned: 0,
          caloriesGained: 0,
          stepsTaken: 0,
          activeHours: 0,
          workoutsCompleted: 0,
          goalProgress: 0,
          startWeight: 70, // Default or initial weight
          currentWeight: 70, // Default or initial weight
          startBodyFat: 20, // Default or initial body fat percentage
          currentBodyFat: 20, // Default or initial body fat percentage
          strengthLevel: "Beginner",
        };
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "userData") {
        setUserData(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateUserData = (newUserData) => {
    // Update goal progress based on a defined fitness goal
    const goalProgress = calculateGoalProgress(newUserData);

    // Update active minutes (already handled in workout tracking)
    const updatedUserData = {
      ...newUserData,
      goalProgress,
      weightProgress: calculateWeightProgress(
        newUserData.startWeight,
        newUserData.currentWeight
      ),
      bodyFatProgress: calculateBodyFatProgress(
        newUserData.startBodyFat,
        newUserData.currentBodyFat
      ),
    };

    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    const event = new CustomEvent("userDataChanged", {
      detail: updatedUserData,
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const handleUserDataChange = (event) => {
      setUserData(event.detail);
    };

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

// Utility functions to calculate progress

const calculateGoalProgress = (userData) => {
  // Example: If the fitness goal is "Run 5km", you could calculate progress based on distance run so far
  const goal = 5000; // assuming 5000 meters for a 5km run goal
  const currentProgress = userData.stepsTaken * 0.8; // assuming 1 step = 0.8 meters
  return Math.min((currentProgress / goal) * 100, 100);
};

const calculateWeightProgress = (startWeight, currentWeight) => {
  return ((startWeight - currentWeight) / startWeight) * 100;
};

const calculateBodyFatProgress = (startBodyFat, currentBodyFat) => {
  return ((startBodyFat - currentBodyFat) / startBodyFat) * 100;
};
