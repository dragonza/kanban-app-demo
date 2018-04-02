// @flow
import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux';
import NoteList from "./note-list";
import { noteListByLane } from '../selectors/selectors';
import Editable from "./editable";
import { updateLane, attachNoteToLane, moveNote,
	detachFromLane, arrangeNote } from '../action/lane-action';
import { addNote, deleteNote } from '../action/note-action';
import type { Lane, Note } from '../types';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../types';

type Props = {
	lane: Lane,
	noteListByLane: Array<Note>,
	addNote: Function,
	deleteNote: Function,
	detachFromLane: Function,
	attachNoteToLane: Function,
	updateLane: Function,
	onDeleteLane: Function,
	moveNote: Function,
}

type State = {
	editing: boolean,
}

const laneTarget = {
	hover(props, monitor) {
		const sourceProps = monitor.getItem();// note being dragged
		if (!props.lane.notes.length) {
			props.moveNote({
				sourceId: sourceProps.id,
				targetLaneId: props.lane.id,
			});
		}
	}
}

function collectDrop(connect) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

class LaneItem extends Component<Props, State> {
	state = {
		editing: false,
	}

	handleOnEdit = () => {
		this.setState({ editing: true });
	}

	handleSave = (text) => {
		if (!text.length) return null;
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

	deleteLane = (props: Props) => {
		const { lane } = props;
		props.onDeleteLane(lane.id);
		lane.notes.forEach(note => props.deleteNote([note]));
	}

	handleMoveNote = (payload) => {
		console.log('payload: ', payload);
		const { sourceId, targetId } = payload;
		this.props.moveNote({
			sourceId,
			targetId,
		});
	}

	renderComponent = (props, state) => {
		const { lane, noteListByLane, connectDropTarget } = props;
		if (!lane) return null;
		return (connectDropTarget(
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
					<button className='delete-note lane-header-item' onClick={() => this.deleteLane(props)}>x</button>
				</div>

				<NoteList
					onMoveNote={(payload) => this.handleMoveNote(payload)}
					noteList={noteListByLane}
					className='notes-list lane-header-item'
					onDeleteNote={(id) => this.handleDeleteNote(id, props)}
				/>
			</div>
			)

		);
	}

	render() {
		console.log('render: ');
		return this.renderComponent(this.props, this.state);
	}
}

export default compose(connect(
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
			arrangeNote,
			moveNote,
		}, dispatch)
	}),
	DropTarget(ItemTypes.NOTE, laneTarget, collectDrop),

)(LaneItem);
