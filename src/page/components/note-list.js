import React from 'react';
import NoteItem from './note-item';

export default ({ className, noteList, onDeleteNote }) => {
	return (
		<div className={className}>
			{
				noteList.map(note => <NoteItem note={note} key={note.id} onDeleteNote={onDeleteNote}/>)
			}
		</div>
	)
}
