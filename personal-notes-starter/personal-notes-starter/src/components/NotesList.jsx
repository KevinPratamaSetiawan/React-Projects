import React from 'react';
import Note from './Note';

const NotesList = ({ notesData, onArchiveNote, onDeleteNote }) => {
    const activeNotes = notesData.filter(note => note.archived === false);
    const archivedNotes = notesData.filter(note => note.archived === true);

    const handleNoteArchived = (id) => {
        onArchiveNote(id);
    };

    const handleNoteDeleted = (id) => {
        onDeleteNote(id);
    };

    return (
        <div>
            <h3>Catatan Aktif</h3>
            <ul>
                {   
                    activeNotes.length > 0 ?
                    activeNotes.map((note) => (
                        <Note 
                            key={note.id}
                            title={note.title}
                            description={note.description}
                            createdAt={note.createdAt}
                            archiveStatus={note.archived}
                            onArchive={() => handleNoteArchived(note.id)}
                            onDelete={() => handleNoteDeleted(note.id)}
                        />
                    )) : (
                        <li><p>Tidak ada catatan</p></li>
                    )
                }
            </ul>
            <h3>Arsip</h3>
            <ul>
                {
                    archivedNotes.length > 0 ?
                    archivedNotes.map((note) => (
                        <Note 
                            key={note.id}
                            title={note.title}
                            description={note.description}
                            createdAt={note.createdAt}
                            archiveStatus={note.archived}
                            onArchive={() => handleNoteArchived(note.id)}
                            onDelete={() => handleNoteDeleted(note.id)}
                        />
                    )) : (
                        <li><p>Tidak ada catatan</p></li>
                    )
                }
            </ul>
        </div>
    )
};

export default NotesList;