import React from 'react';
import LaneItem from "./lane-item";

export default ({ laneList, className, onDeleteLane }) => {
	if (!laneList) return null;
	return (
		<ul className={className}>
			{
				laneList.map(lane => {
					return <LaneItem key={lane.id} lane={lane} onDeleteLane={onDeleteLane} />
				})
			}
		</ul>
	)
}
