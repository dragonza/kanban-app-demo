import { laneListSelector } from "./selectors/selectors";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import LaneList from './components/lane-list';

class KanbanApp extends Component {
	addLane = () => {

	}

	renderComponent = (props) => {
		const { laneList } = props;
		return (
			<div className="kanban-app">
				<button className='add-lane' onClick={this.addLane}>+</button>
				<LaneList
					className='lane-list'
					laneList={laneList}
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
		return bindActionCreators({}, dispatch)
	}
)(KanbanApp);
