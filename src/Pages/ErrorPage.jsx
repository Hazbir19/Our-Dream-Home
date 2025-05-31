import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen text-center px-6 bg-gray-50">
        <AlertTriangle className="text-accent w-16 h-16 mb-4" />
        <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-secondary mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-accent text-white rounded hover:bg-opacity-90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
