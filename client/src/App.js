import React, { useState } from 'react';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setShortUrl('');

    try {
      const response = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl, customAlias }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>🔗 TinyLink URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Custom alias (optional)"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
        />
        <button type="submit">Shorten URL</button>
      </form>

      {shortUrl && (
        <div>
          <p>
            Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </p>
          <button onClick={() => {
            navigator.clipboard.writeText(shortUrl);
            alert("🔗 Copied to clipboard!");
          }}>
            Copy
          </button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
    </div>
  );
}

export default App;
