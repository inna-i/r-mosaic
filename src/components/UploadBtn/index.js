import React from 'react';
import PropTypes from 'prop-types';

function UploadBtn (props) {
	const { onChange } = props;

	return (
		<div className="w-upload">
			<label htmlFor="img-upload" className="upload-label">
				<div className="hover-label">
					Upload your image <br />
					Choose image
				</div>
			</label>
			<input id="img-upload" type="file" className="upload-btn" onChange={e => onChange(e)} />
		</div>
	);
}

UploadBtn.propTypes = {
	onChange: PropTypes.func
};

export default UploadBtn;
