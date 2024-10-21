import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entry from 'C:/Users/piyus/OneDrive/Desktop/dash/my-project/src/components/Entry.jsx';
import Dashboard from 'C:/Users/piyus/OneDrive/Desktop/dash/my-project/src/components/Dashboard.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Entry />} />
        {}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
