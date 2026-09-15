import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import AppTest from './app/AppTest';
import './styles/index.css';

// Set to true to test if React is working at all (bypasses CSS and full app)
const USE_TEST_APP = false;

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0f172a',
          color: '#fff',
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h1 style={{ color: '#ef4444', marginBottom: '1rem' }}>Application Error</h1>
          <pre style={{
            background: '#1e293b',
            padding: '1rem',
            borderRadius: '0.5rem',
            overflow: 'auto',
            fontSize: '0.875rem'
          }}>
            {this.state.error?.toString()}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#0ea5e9',
              border: 'none',
              borderRadius: '0.375rem',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML = `
    <div style="min-height: 100vh; background: #0f172a; color: #fff; padding: 2rem; font-family: system-ui, sans-serif;">
      <h1 style="color: #ef4444;">Fatal Error</h1>
      <p>Root element with id="root" not found in the DOM.</p>
      <p>Check your index.html file.</p>
    </div>
  `;
  throw new Error('Root element not found');
}

try {
  const AppComponent = USE_TEST_APP ? AppTest : App;
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <AppComponent />
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('[main.tsx] App mounted successfully');
} catch (error) {
  console.error('[main.tsx] Failed to mount app:', error);
  rootElement.innerHTML = `
    <div style="min-height: 100vh; background: #0f172a; color: #fff; padding: 2rem; font-family: system-ui, sans-serif;">
      <h1 style="color: #ef4444;">Mount Error</h1>
      <pre style="background: #1e293b; padding: 1rem; border-radius: 0.5rem; overflow: auto;">${error}</pre>
    </div>
  `;
}