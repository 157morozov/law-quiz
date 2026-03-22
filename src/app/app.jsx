import { Route, Routes } from 'react-router-dom';
import AppShell from '../components/app-shell/component.jsx';
import ProtectedRoute from '../components/protected-route/component.jsx';
import AuthPage from '../pages/auth/page.jsx';
import BlockPage from '../pages/block/page.jsx';
import DepartmentsPage from '../pages/departments/page.jsx';
import HomePage from '../pages/home/page.jsx';
import LeaderboardPage from '../pages/leaderboard/page.jsx';
import PrivacyPage from '../pages/privacy/page.jsx';
import ConsentPage from '../pages/consent/page.jsx';
import ResultsPage from '../pages/results/page.jsx';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/consent" element={<ConsentPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route
          path="/departments"
          element={(
            <ProtectedRoute>
              <DepartmentsPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/departments/:blockId"
          element={(
            <ProtectedRoute>
              <BlockPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/results/:blockId"
          element={(
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          )}
        />
      </Route>
    </Routes>
  );
}

export default App;
