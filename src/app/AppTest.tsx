import React from "react";

export default function AppTest() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: '#fff',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#0ea5e9' }}>
        ✓ React is Working!
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>
        If you see this, the basic React setup is functional.
      </p>
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#1e293b', borderRadius: '0.5rem' }}>
        <p style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
          Timestamp: {new Date().toISOString()}
        </p>
      </div>
    </div>
  );
}
