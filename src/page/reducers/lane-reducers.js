import initialState from '../../store/default-state';

export function laneList(state = initialState.laneList, action) {
	console.log('action in lanlist reducer: ', action);
	console.log('state: ', state);
	switch (action.type) {
		case 'MOVE_NOTE1':
		{
			const sourceId = action.sourceId;
			const targetId = action.targetId;
			const laneList = Object.values(state);
			const sourceLane = laneList.find(lane => lane.notes.includes(sourceId));
			const targetLane = laneList.find(lane => lane.notes.includes(targetId));
			const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
			const targetNoteIndex = targetLane.notes.indexOf(targetId);
			if (targetLane.id === sourceLane.id) {
				return laneList;
			} else {
				return laneList.map(lane => {
					if (lane.id === sourceLane.id) {
						return {
							...lane,
							notes: lane.notes.filter(note => note !== sourceId)
						}
					}

					if (lane.id === targetLane.id) {
						return {
							...lane,
							notes: lane.notes
							.slice(0, targetNoteIndex)
							.concat([sourceId])
							.concat(lane.notes.slice(targetNoteIndex))
						}
					}

					return lane;
				});
			}
		}


		default:
			return state;
	}
}
