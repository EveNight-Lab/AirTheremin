import { useEffect } from 'react';
import AppRouter from './router';
import { trackVisitor } from './utils/visitorTracker';

function App() {
  useEffect(() => {
    void trackVisitor();
  }, []);

  return <AppRouter />;
}

export default App;
