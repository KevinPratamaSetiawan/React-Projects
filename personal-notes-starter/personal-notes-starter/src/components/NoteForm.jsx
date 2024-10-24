import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { showFormattedDate, generateNoteID } from '../utils/index'

const NoteForm = ({ onAddNote }) => {
    const [titleText, setTitleText] = React.useState('');
    const [descText, setDescText] = React.useState('');

    const maxTitleLength = 50;

    const onTitleTextChangeEventHandler = (event) => {
        if (event.target.value.length <= maxTitleLength) {
            setTitleText(event.target.value);
        }
    };

    const onDescTextChangeEventHandler = (event) => {
        setDescText(event.target.value);
    };

    const onAddNoteEventHandler = (event) => {
        if (titleText.trim()) {
            event.preventDefault();
            const notesData = JSON.parse(localStorage.getItem('notesData')) || [];

            const newNote ={ 
                id: generateNoteID(),
                title: titleText, 
                description: descText, 
                createdAt: showFormattedDate(), 
                archived: false
            };

            notesData.push(newNote);
            localStorage.setItem('notesData', JSON.stringify(notesData));

            onAddNote(newNote);

            setTitleText('');
            setDescText('');
        }
    }

    return (
        <div>
            <h2>Buat Catatan</h2>
            <form onSubmit={onAddNoteEventHandler}>
                <p>{maxTitleLength - titleText.length} karakter tersisa</p>
                <input
                    id="title-bar"
                    type="text"
                    value={titleText}
                    onChange={onTitleTextChangeEventHandler}
                    placeholder='Judul Catatan'
                />
                <input
                    id="desc-bar"
                    type="text"
                    value={descText}
                    onChange={onDescTextChangeEventHandler}
                    placeholder='Deskripsi Catatan'
                />
                <button type='submit'>
                    <FontAwesomeIcon icon={faPlus} size="2xl" />
                </button>
            </form>
        </div>
    )
};

export default NoteForm;