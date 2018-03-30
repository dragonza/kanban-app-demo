import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import NoteList from "./note-list";
import { noteListByLane } from '../selectors/selectors';
import Editable from "./editable";
import { updateLane, attachNoteToLane, detachFromLane } from '../action/lane-action';
import { addNote, deleteNote } from '../action/note-action';

class LaneItem extends Component {
	state = {
		editing: false,
	}

	handleOnEdit = () => {
		this.setState({ editing: true });
	}

	handleSave = (text) => {
		const { lane } = this.props;
		this.props.updateLane(lane.id, text);
		this.setState({ editing: false });
	}

	addNote = (props) => {
		const newTask = props.addNote('New Task');
		props.attachNoteToLane(props.lane.id, newTask.payload.id);
	}

	handleDeleteNote = (id, props) => {
		const { lane } = props;
		props.deleteNote(id);
		props.detachFromLane(lane.id, id);
	}

	renderComponent = (props, state) => {
		const { lane, noteListByLane } = props;
		if (!lane) return null
		console.log('lane: ', lane);
		return (
			<div className='lane-item'>
				<div className="lane-header">
					<button className='add-note lane-header-item' onClick={() => this.addNote(props)}>+</button>
					<Editable
						value={lane.name}
						editing={state.editing}
						onEdit={this.handleOnEdit}
						className='lane-header-item lane-editable'
						onSave={(text) => this.handleSave(text)}
					/>
					<button className='delete-note lane-header-item'>x</button>
				</div>

				<NoteList
					noteList={noteListByLane}
					className='notes-list lane-header-item'
					onDeleteNote={(id) => this.handleDeleteNote(id, props)}
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
			noteListByLane: noteListByLane(state, props),
		}
	},
	(dispatch) => {
		return bindActionCreators({
			updateLane,
			addNote,
			deleteNote,
			attachNoteToLane,
			detachFromLane,
		}, dispatch)
	}
)(LaneItem);
