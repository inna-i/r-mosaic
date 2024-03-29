import React, { useState } from 'react';
import Mosaic from './components/Mosaic';
import UploadBtn from './components/UploadBtn';
import Logo from './components/Logo';

import './App.scss';

function App() {
	const [selectedImage, setSelectedImage] = useState(null);

	return (
		<React.Fragment>
			<div className="header">
				<div className="wrap">
					<div className="nav">
						<Logo />
						<div className="w-name">Mosaic generator</div>
					</div>
					<h2 className="title">
						Upload your image and you will get mosaic version of it. Let&apos;s try!{' '}
					</h2>
					<UploadBtn setSelectedImage={setSelectedImage} />
				</div>
			</div>
			{selectedImage && <Mosaic imgUrl={URL.createObjectURL(selectedImage)} />}
		</React.Fragment>
	);
}

export default App;
