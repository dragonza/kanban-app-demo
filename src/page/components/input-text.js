import React, {Component} from 'react';

export default class inputText extends Component {
	state = {
		text: this.props.text || ''
	}

	handleOnChange = (e) =>{
		this.setState({
			text: e.target.value,
		});
	}

	handleBlur = (e) => {
		this.props.onSave(e.target.value.trim());
	}

	handleSubmit =(e) => {
		const text = e.target.value.trim();
		if (e.which === 13) {
			this.props.onSave(text);
		}
	}

	renderComponent = (props, state) => {
		return (
			<div className='input-text'>
				<input
					type="text"
					autoFocus={true}
					onChange={this.handleOnChange}
					onBlur={this.handleBlur}
					onKeyDown={this.handleSubmit}
					value={state.text}
				/>
			</div>
		);
	}

	render() {
		return this.renderComponent(this.props, this.state);
	}
}
