import React from 'react';
import PropTypes from 'prop-types';

import { encodeImageURL } from './helpers';


function Mosaic(props) {
	if (props.elm) {
		encodeImageURL(props.elm);
	}

	return (
		<div className="main">
			<div className="wrap">
				<div className="w-user-images">
					<div className="title">Uploaded images</div>
					<div className="img-list" />
				</div>
				<div className="w-user-mosaic">
					<div className="spinner" />
					<canvas id="mosaic" height={400} width={600} />
				</div>
			</div>
		</div>
	);
}


Mosaic.propTypes = {
	elm: PropTypes.object,
};

export default Mosaic;
