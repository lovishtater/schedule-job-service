import React from 'react';
import JobList from './components/JobList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <JobList />
    </div>
  );
};

export default App;
