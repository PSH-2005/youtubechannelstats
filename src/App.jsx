import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entry from 'C:/Users/piyus/OneDrive/Desktop/dash/my-project/src/components/Entry.jsx';
import Dashboard from 'C:/Users/piyus/OneDrive/Desktop/dash/my-project/src/components/Dashboard.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Entry Page Route */}
        <Route path="/" element={<Entry />} />
        {/* Dashboard Page Route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
