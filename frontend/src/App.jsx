import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewMeeting from './pages/NewMeeting';
import TranscriptDetail from './pages/TranscriptDetail';
import Status from './pages/Status';
import { Activity } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewMeeting />} />
          <Route path="/transcript/:id" element={<TranscriptDetail />} />
          <Route path="/status" element={<Status />} />
        </Routes>
        
        {/* Floating Status Button */}
        <Link
          to="/status"
          className="fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow group"
          title="System Status"
        >
          <Activity className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700" />
        </Link>
      </div>
    </BrowserRouter>
  );
}

export default App;
