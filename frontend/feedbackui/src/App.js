import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FeedbackManager from './FeedbackManager';
import EditFeedback from './EditFeedback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/feedback-manager" />} />
        <Route path="/feedback-manager" element={<FeedbackManager />} />
        <Route path="/edit-feedback" element={<EditFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;
