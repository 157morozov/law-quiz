import { Outlet } from 'react-router-dom';
import Header from '../header/component.jsx';
import '../header/style.css';
import '../protected-route/style.css';
import './style.css';

function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-shell__main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppShell;
