class Dragger {
	constructor(selector) {
		this.$container = document.querySelector(selector);
		this.items = [];
		window.addEventListener('resize', this);
	}

	handleEvent() {
		const height = this.$container.offsetHeight;
		const width = this.$container.offsetWidth;
		for (const item of this.items) {
			item.setParentWidth(width);
			item.setParentWidth(height);
		}
	}

	addItem({left, top, width, height}) {
		const item = new DragElement({
			left, top, width, height,
			parentWidth: this.$container.offsetWidth,
			parentHeight: this.$container.offsetHeight,
		});

		this.items.push(item);
		this.$container.appendChild(item.$element);
	}
}


class DragElement {
	constructor(
		{left, top, width, height, parentWidth, parentHeight}
	) {
		this._left = left;
		this._top = top;
		this._width = width;
		this._height = height;
		this.setParentWidth(parentWidth);
		this.setParentHeight(parentHeight);
		this.$element = document.createElement('div');
		this.$element.className = 'draggable';
		this.$element.style.top = `${top}px`;
		this.$element.style.left = `${left}px`;
		this.$element.style.width = `${width}px`;
		this.$element.style.height = `${height}px`;
		this.$element.addEventListener('mousedown', this);
	}

	handleEvent(e) {
		switch(e.type) {
			case 'mousedown':
				this.handleMouseDown(e);
				break;

			case 'mouseup':
				this.handleMouseUp();
				break;

			case 'mousemove':
				this.handleMouseMove(e);
				break;
		}
	}

	handleMouseDown(e) {
		this._clientX= e.clientX;
		this._clientY= e.clientY;
		this._startLeft = this._left;
		this._startTop = this._top;
		this.$element.style.zIndex = zIndex++;
		document.addEventListener('mousemove', this);
		document.addEventListener('mouseup', this);
	}

	handleMouseUp() {
		document.removeEventListener('mousemove', this);
		document.removeEventListener('mouseup', this);
	}

	handleMouseMove(e) {
		this.setLeft(this._startLeft + (e.clientX - this._clientX));
		this.setTop(this._startTop + (e.clientY - this._clientY));
	}

	setParentWidth(parentWidth) {
		this._parentWidth = parentWidth;
	}

	setParentHeight(parentHeight) {
		this._parentHeight = parentHeight;
	}

	setLeft(left) {
		if (left < 0) {
			this._left = 0;
		} else if (left > this._parentWidth - this._width) {
			this._left = this._parentWidth - this._width;
		} else {
			this._left = left;
		}

		this.$element.style.left = `${this._left}px`;
	}

	setTop(top) {
		if (top < 0) {
			this._top = 0;
		} else if (top > this._parentHeight - this._height) {
			this._top = this._parentHeight - this._height;
		} else {
			this._top = top;
		}
		this.$element.style.top = `${this._top}px`;
	}
}


const dragger = new Dragger('#container');
let zIndex = 0;

for (let i = 0; i < 10; i++) {
	dragger.addItem({
		left: 20 + i * 5,
		top: 40 + i * 5,
		width: 60,
		height: 40,
		zIndex: zIndex++
	});
}
