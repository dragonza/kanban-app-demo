import React from 'react';
import LaneItem from "./lane-item";

export default ({ laneList, className }) => {
	if (!laneList) return null;
	return (
		<ul className={className}>
			{
				laneList.map(lane => {
					return <LaneItem key={lane.id} lane={lane} />
				})
			}
		</ul>
	)
}
