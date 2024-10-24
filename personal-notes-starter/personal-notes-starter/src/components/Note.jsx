import React from 'react';
import NoteButton from './NoteButton';

const Note = ({title, description, createdAt, onArchive, onDelete}) => {
    return (
        <li>
            <h3>{title}</h3>
            <p>{createdAt}</p>
            <p>{description}</p>

            <NoteButton 
                onArchive={onArchive}
                onDelete={onDelete}
            />
        </li>
    )
};

export default Note;