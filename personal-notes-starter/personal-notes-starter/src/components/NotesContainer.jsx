import React from 'react';
import NoteForm from './NoteForm';
import NotesList from './NotesList';

const NotesContainer = ({ notesData, onAddNote, onArchiveNote, onDeleteNote }) => {
    return (
        <div>
            <NoteForm onAddNote={onAddNote} />
            <NotesList 
                notesData={notesData} 
                onArchiveNote={onArchiveNote} 
                onDeleteNote={onDeleteNote} 
            />
        </div>
    )
};

export default NotesContainer;