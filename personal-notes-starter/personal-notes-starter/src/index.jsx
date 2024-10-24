import React from 'react';
import { createRoot } from 'react-dom/client';
import NoteApp from './components/NoteApp';
import { getInitialData } from './utils/index'

// import style
import './styles/style.css';

localStorage.setItem('notesData', JSON.stringify(getInitialData()))

const root = createRoot(document.getElementById('root'));
root.render(<NoteApp />);