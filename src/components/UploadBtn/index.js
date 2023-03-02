import React from 'react';
import PropTypes from 'prop-types';

function UploadBtn({ setSelectedImage }) {
	return (
		<div className="w-upload">
			<label htmlFor="img-upload" className="upload-label">
				<div className="hover-label">
					Upload your image <br />
					Choose image
				</div>
			</label>
			<input
				id="img-upload"
				className="upload-btn"
				data-testid="upload-btn"
				type="file"
				name="myImage"
				onChange={event => {
					setSelectedImage(event.target.files[0]);
				}}
			/>
		</div>
	);
}

UploadBtn.propTypes = {
	setSelectedImage: PropTypes.func,
};

export default UploadBtn;
