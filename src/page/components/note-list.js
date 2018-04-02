import React from 'react';
import NoteItem from './note-item';

export default ({ className, noteList, onDeleteNote, onMoveNote }) => {
	return (
		<div className={className}>
			{
				noteList.map(note =>
					<NoteItem
						onMoveNote={onMoveNote}
						note={note}
						id={note.id}
						key={note.id}
						onDeleteNote={onDeleteNote}
					/>
				)
			}
		</div>
	)
}
