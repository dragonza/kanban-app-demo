import { laneListSelector } from "./selectors/selectors";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import LaneList from './components/lane-list';
import { addLane, deleteLane } from './action/lane-action';

class KanbanApp extends Component {
	handleAddLane = () => {
		this.props.addLane('New Lane');
	}

	handleDeleteLane = (id) => {
		this.props.deleteLane([id]);
	}

	renderComponent = (props) => {
		const { laneList } = props;
		return (
			<div className="kanban-app">
				<button className='add-lane' onClick={this.handleAddLane}>+</button>
				<LaneList
					className='lane-list'
					laneList={laneList}
					onDeleteLane={(id) => this.handleDeleteLane(id)}
				/>
			</div>
		);
	}

	render() {
		return this.renderComponent(this.props, this.state);
	}
}

export default connect(
	(state, props) => {
		return {
			laneList: laneListSelector(state, props)
		}
	},
	(dispatch) => {
		return bindActionCreators({
			addLane,
			deleteLane,
		}, dispatch)
	}
)(KanbanApp);
