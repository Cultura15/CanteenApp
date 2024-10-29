import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedbackManager from './FeedbackManager';
import EditFeedback from './EditFeedback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/feedback-manager" element={<FeedbackManager />} />
        <Route path="/edit-feedback" element={<EditFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;
