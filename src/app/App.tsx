import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

// Force rebuild — announcement routes added to server
export default function App() {
  console.log('[App.tsx] App component rendering');
  
  try {
    return <RouterProvider router={router} />;
  } catch (error) {
    console.error('[App.tsx] Error in RouterProvider:', error);
    throw error;
  }
}