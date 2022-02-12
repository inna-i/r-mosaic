const MS_TILE_W1 = 16;
const MS_TILE_H1 = 16;

const CONST = {
	MS_TILE_W: MS_TILE_W1 !== 0 ? MS_TILE_W1 : 16,
	MS_TILE_H: MS_TILE_H1 !== 0 ? MS_TILE_H1 : 16,
	IMG_THUMBNAIL: 'image-thumbnail',
	IMG_LIST: 'img-list',
	UPLOAD_INPUT: 'img-upload',
	SPINNER: 'spinner',
};

export function drawImageMosaic(imageElement) {
	const canvas = document.getElementById('mosaic');
	const context = canvas.getContext('2d');
	const horizontalRatio = canvas.width / imageElement.width;
	const verticalRatio = canvas.height / imageElement.height;
	const middleRatio = Math.min(horizontalRatio, verticalRatio);
	const ratio = middleRatio > 0.6 || middleRatio < 0.2 ? 0.4 : middleRatio;
	const imageX = 0;
	const imageY = 0;
	const imageWidth = imageElement.naturalWidth;
	const imageHeight = imageElement.naturalHeight;
	const scaledImageWidth = parseInt((imageWidth * ratio * CONST.MS_TILE_W) / CONST.MS_TILE_W, 16);
	const scaledImageHeight = parseInt((imageHeight * ratio * CONST.MS_TILE_H) / CONST.MS_TILE_H, 16);

	console.info('middleRatio is ', middleRatio);

	context.clearRect(0, 0, canvas.width, canvas.height);
	canvas.height = scaledImageHeight;
	canvas.width = scaledImageWidth;
	context.drawImage(
		imageElement,
		0,
		0,
		imageWidth,
		imageHeight,
		0,
		0,
		scaledImageWidth,
		scaledImageHeight,
	);

	const imageData = context.getImageData(imageX, imageY, scaledImageWidth, scaledImageHeight);
	const data = imageData.data;

	function toHex(int) {
		if (int === undefined) return 0;
		const hex = int.toString(16);

		return hex.length === 1 ? `0${hex}` : hex;
	}

	// iterate over all pixels based on x and y coordinates
	for (let y = 0; y < scaledImageHeight / CONST.MS_TILE_H; y += 1) {
		// loop through each row
		for (let x = 0; x < scaledImageWidth / CONST.MS_TILE_W; x += 1) {
			const scaleY = scaledImageWidth * y * CONST.MS_TILE_H;
			const scaleX = x * CONST.MS_TILE_W;

			const red = toHex(data[(scaleY + scaleX) * 4]);
			const green = toHex(data[(scaleY + scaleX) * 4 + 1]);
			const blue = toHex(data[(scaleY + scaleX) * 4 + 2]);

			context.fillStyle = `#${red}${green}${blue}`;
			context.fillRect(x * CONST.MS_TILE_W, y * CONST.MS_TILE_H, CONST.MS_TILE_W, CONST.MS_TILE_H);
		}
	}
}

export function drawCanvasImage(url) {
	const imageElement = new Image();
	imageElement.onload = () => {
		drawImageMosaic(imageElement);
		document.querySelector(`.${CONST.SPINNER}`).style.display = 'none';
	};
	imageElement.src = url;
}

export function appendImageThumbnail(url) {
	const imgThumbnail = document.createElement('img');
	imgThumbnail.src = url;
	imgThumbnail.classNameName = CONST.IMG_THUMBNAIL;
	document.querySelector(`.${CONST.IMG_LIST}`).appendChild(imgThumbnail);

	imgThumbnail.addEventListener('click', e => drawCanvasImage(e.srcElement.currentSrc));
}

export function encodeImageURL(element) {
	const img = element.files[0];
	const fileReader = new FileReader();
	fileReader.onloadend = () => {
		drawCanvasImage(fileReader.result);
		appendImageThumbnail(fileReader.result);
	};
	fileReader.readAsDataURL(img);
}
