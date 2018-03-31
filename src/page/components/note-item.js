// @flow

import React, { Component } from 'react';
import Editable from './editable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateNote } from "../action/note-action";
import type { Note } from '../types';

type Props = {
	note: Note,
	onDeleteNote: Function,
	updateNote: Function,
}

type State = {
	editing: boolean,
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
		const { note } = props;
		if (!note) return null;
		return (
			<div className='note-item'>
				<Editable
					value={note.task}
					editing={state.editing}
					onEdit={this.handleOnEdit}
					onSave={(text) => this.handleSave(text)}
				/>
				<button className='delete-note' onClick={() => props.onDeleteNote([note.id])}>x</button>
			</div>
		);
	}

	render() {
		return this.renderComponent(this.props, this.state);
	}
}

export default connect(
	(state, props) => {
		return {}
	},
	(dispatch) => {
		return bindActionCreators({
			updateNote
		}, dispatch)
	}
)(NoteItem);
