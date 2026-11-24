import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SessionProvider } from './context/SessionContext';
import { PresentationStyleProvider } from './context/PresentationStyleContext';

createRoot(document.getElementById('root')!).render(
  <SessionProvider>
    <PresentationStyleProvider>
      <App />
    </PresentationStyleProvider>
  </SessionProvider>
);
