import { SET_DATA, REMOVE_DATA, MERGE_DATA } from '../../store/data-action';
const path = 'noteList';
import uuid from 'uuid';

export const updateNote = (id, text) => {
	return SET_DATA({
		_path: `${path}.${id}.task`,
		_value: text,
	})
};

export const addNote = (text) => {
	const id = uuid.v4();
	return MERGE_DATA({
		_path: `${path}.${id}`,
		_value: {
			id,
			task: text,
		},
	})
};

export const deleteNote = (ids) => {
	return REMOVE_DATA({
		_path: path,
		_value: ids,
	})
};

