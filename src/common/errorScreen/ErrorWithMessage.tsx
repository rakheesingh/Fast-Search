import React from 'react';

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen" data-testId= "error-state" >
      <div className="bg-red-100 border border-red-400 bg-brand- rounded shadow p-4 w-full max-w-lg h-[200px] flex items-center justify-center">
        <span className="text-center text-xl font-medium">{message}</span>
      </div>
    </div>
  );
};

export default ErrorComponent;
