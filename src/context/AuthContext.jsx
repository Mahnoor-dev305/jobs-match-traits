import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for an already logged-in user
  useEffect(() => {
    const savedUser = localStorage.getItem("jobsMatchUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid saved user:", error);
        localStorage.removeItem("jobsMatchUser");
      }
    }

    setLoading(false);
  }, []);

  // SIGNUP
  const signup = (userData) => {
    const existingUser = localStorage.getItem(
      "jobsMatchRegisteredUser"
    );

    if (existingUser) {
      const parsedUser = JSON.parse(existingUser);

      if (
        parsedUser.email.toLowerCase() ===
        userData.email.toLowerCase()
      ) {
        return {
          success: false,
          message: "An account with this email already exists.",
        };
      }
    }

    const newUser = {
      id: Date.now(),
      fullName: userData.fullName,
      email: userData.email,
      profileImage: null,
    };

    // Save account
    localStorage.setItem(
      "jobsMatchRegisteredUser",
      JSON.stringify({
        ...newUser,
        password: userData.password,
      })
    );

    // Automatically log the user in
    localStorage.setItem(
      "jobsMatchUser",
      JSON.stringify(newUser)
    );

    setUser(newUser);

    return {
      success: true,
      user: newUser,
    };
  };

  // LOGIN
  const login = (email, password) => {
    const savedAccount = localStorage.getItem(
      "jobsMatchRegisteredUser"
    );

    if (!savedAccount) {
      return {
        success: false,
        message:
          "No account found. Please create an account first.",
      };
    }

    const account = JSON.parse(savedAccount);

    if (
      account.email.toLowerCase() !== email.toLowerCase() ||
      account.password !== password
    ) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const loggedInUser = {
      id: account.id,
      fullName: account.fullName,
      email: account.email,
      profileImage: account.profileImage || null,
    };

    localStorage.setItem(
      "jobsMatchUser",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return {
      success: true,
      user: loggedInUser,
    };
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("jobsMatchUser");
    setUser(null);
  };

  // UPDATE PROFILE
  const updateUser = (updatedData) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...updatedData,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "jobsMatchUser",
      JSON.stringify(updatedUser)
    );

    const registeredUser = localStorage.getItem(
      "jobsMatchRegisteredUser"
    );

    if (registeredUser) {
      const account = JSON.parse(registeredUser);

      localStorage.setItem(
        "jobsMatchRegisteredUser",
        JSON.stringify({
          ...account,
          ...updatedData,
        })
      );
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateUser,
    isAuthenticated: Boolean(user),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// CUSTOM HOOK
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}