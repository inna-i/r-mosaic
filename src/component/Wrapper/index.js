import React from 'react';
import PropTypes from 'prop-types';
import Mosaic from '../Mosaic';
import UploadBtn from '../UploadBtn';
import Logo from './Logo';

class Wrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			elm: null,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		this.setState({ elm: event.target });
	}

	render() {
		return (
			<React.Fragment>
				<div className="header">
					<div className="wrap">
						<div className="nav">
							<Logo />
							<div className="w-name">Mosaic generator</div>
						</div>
						<h2 className="title">Easy way to get all colors of your image - is color mosaic. Let's try! </h2>

						<UploadBtn onChange={this.handleInputChange} />

					</div>
				</div>
				<Mosaic elm={this.state.elm} />
			</React.Fragment>
		);
	}
}

Wrapper.propTypes = {
	children: PropTypes.element,
};

export default Wrapper;
