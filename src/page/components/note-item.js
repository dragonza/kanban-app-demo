// @flow

import React, { Component } from 'react';
import Editable from './editable';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { updateNote } from "../action/note-action";
import type { Note } from '../types';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from '../types';


type Props = {
	note: Note,
	onDeleteNote: Function,
	updateNote: Function,
}

type State = {
	editing: boolean,
}

const noteSource = {
	beginDrag(props) {
		return {
			id: props.id,
		}
	},

	isDragging(props, monitor) {
		return props.id === monitor.getItem().id;
	}
}

const noteTarget = {
	hover(props, monitor) {
		const sourceProps = monitor.getItem(); // current item that is being dragged
		const targetId = props.id;// props here is the props of target element that is being dragged on
		const sourceId = sourceProps.id;
		if (sourceId !== targetId) {
			console.log('called: ');
			props.onMoveNote({
				sourceId,
				targetId,
			})
		}

	}
}

function collectDrop(connect) {
	return {
		connectDropTarget: connect.dropTarget(),
	}
}

function collectDrag(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}
}

class NoteItem extends Component<Props, State> {
	state = {
		editing: false,
	}


	handleOnEdit = () => {
		this.setState({ editing: true });
	}

	handleSave = (text: string) => {
		if (!text.length) {
			this.props.onDeleteNote([this.props.note.id]);
		}

		this.props.updateNote(this.props.note.id, text);
		this.setState({ editing: false });
	}

	renderComponent = (props: Props, state: State) => {
		const { note, connectDragSource, isDragging, connectDropTarget } = props;
		if (!note) return null;
		const dragSource = state.editing ? a => a : connectDragSource;
		return (
			dragSource(connectDropTarget	(
				<div className='note-item'  style={{
					opacity: isDragging ? 0.5 : 1,
					cursor: 'move'
				}}>
					<Editable
						value={note.task}
						editing={state.editing}
						onEdit={this.handleOnEdit}
						onSave={(text) => this.handleSave(text)}
					/>
					<button className='delete-note' onClick={() => props.onDeleteNote([note.id])}>x</button>
				</div>
			))

		);
	}

	render() {
		return this.renderComponent(this.props, this.state);
	}
}

export default compose(
	connect(
		() => ({}),
		(dispatch) => {
			return bindActionCreators({
				updateNote
			}, dispatch)
		}
	),
	DragSource(ItemTypes.NOTE, noteSource, collectDrag),
	DropTarget(ItemTypes.NOTE, noteTarget, collectDrop)
)(NoteItem);
