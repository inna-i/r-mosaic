import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { drawCanvasImage } from './helpers';

import './Mosaic.scss';

function Mosaic({ imgUrl }) {
	useEffect(() => {
		drawCanvasImage(imgUrl);
	}, [imgUrl, drawCanvasImage]);

	return (
		<div>
			<div className="main">
				<div className="wrap">
					<div className="w-user-images">
						<div className="title">Uploaded image</div>
						<img src={imgUrl} className="user-img" alt="mosaic image" />
					</div>
					<div className="w-user-mosaic">
						<div className="spinner" />
						<canvas id="mosaic" height={400} width={600} />
					</div>
				</div>
			</div>
		</div>
	);
}

Mosaic.propTypes = {
	imgUrl: PropTypes.string,
};

export default Mosaic;
