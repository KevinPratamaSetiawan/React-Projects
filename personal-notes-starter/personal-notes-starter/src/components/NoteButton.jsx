import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const NoteButton = ({ onArchive, onDelete }) => {

    const handleNoteArchived = () => {
        if (onArchive) onArchive();
    }

    const handleNoteDeleted = () => {
        if (onDelete) onDelete();
    }

    return (
        <div>
            <button onClick={handleNoteArchived}>
                <FontAwesomeIcon icon={faBoxArchive} size="2xl" />
            </button>
            <button onClick={handleNoteDeleted}>
                <FontAwesomeIcon icon={faTrashCan} size="2xl" />
            </button>
        </div>
    )
};

export default NoteButton;