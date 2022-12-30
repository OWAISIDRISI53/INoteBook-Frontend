import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NoteState from './context/note/NoteState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NoteState>
    <App />
  </NoteState>
);
