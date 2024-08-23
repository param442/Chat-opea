import React from "react";

const WelcomeScreen = () => {
  return (
    <div className="flex items-center justify-center h-full bg-EerieBlack  text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Chat!</h1>
        <p className="mt-4">Select a user to start chatting.</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
