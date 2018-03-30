import {SET_DATA, REMOVE_DATA, MERGE_DATA} from '../../store/data-action';

const path = 'laneList';

export const updateLane = (id, text) => {
	return SET_DATA({
		_path: `${path}.${id}.name`,
		_value: text,
	})
}
export const attachNoteToLane = (laneId, noteId) => {
	return MERGE_DATA({
		_path: `${path}.${laneId}.notes`,
		_value: noteId,
	})
};

export const detachFromLane = (laneId, noteId) => {
	console.log('laneId: ', laneId);
	console.log('noteId: ', noteId);
	return REMOVE_DATA({
		_path: `${path}.${laneId}.notes`,
		_value: noteId
	})
}
