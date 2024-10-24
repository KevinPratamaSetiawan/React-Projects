import React from 'react';
import NoteNav from './NoteNav';
import NotesContainer from './NotesContainer';

const NoteApp = () => {
    const [notesData, setNotesData] = React.useState(JSON.parse(localStorage.getItem('notesData')) || []);
    const [filteredNotes, setFilteredNotes] = React.useState(notesData);

    const addNote = (newNote) => {
        const updatedNotes = [...notesData, newNote];
        setNotesData(updatedNotes);
        setFilteredNotes(updatedNotes);
        localStorage.setItem('notesData', JSON.stringify(updatedNotes));
    };

    const archiveNote = (id) => {
        const updatedNotes = notesData.map(note => 
            note.id === id ? { ...note, archived: !note.archived } : note
        );
        setNotesData(updatedNotes);
        setFilteredNotes(updatedNotes);
        localStorage.setItem('notesData', JSON.stringify(updatedNotes));
    };

    const deleteNote = (id) => {
        const updatedNotes = notesData.filter(note => note.id !== id);
        setNotesData(updatedNotes);
        setFilteredNotes(updatedNotes);
        localStorage.setItem('notesData', JSON.stringify(updatedNotes));
    };

    const searchNote = (searchText) => {
        if (searchText.trim()) {
            const notesFound = notesData.filter(note =>
                note.title.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredNotes(notesFound);
        } else {
            setFilteredNotes(notesData);
        }
    };

    return (
        <div>
            <NoteNav 
                searchNote={searchNote}
            />
            <NotesContainer 
                notesData={filteredNotes}
                onAddNote={addNote}
                onArchiveNote={archiveNote} 
                onDeleteNote={deleteNote} 
            />
        </div>
    );
};

export default NoteApp;