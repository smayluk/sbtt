var containerElem = document.getElementById('container');
var zindex = 0;

document.onmousedown = function(e) {
	var rectangleElem = e.target;

	if (!rectangleElem.classList.contains('draggable')) return;
	rectangleElem.style.zIndex = ++zindex;

	var rectangleCoords = getCoords(rectangleElem);
	var shiftX = e.pageX - rectangleCoords.left;
	var shiftY = e.pageY - rectangleCoords.top;

	var containerCoords = getCoords(containerElem);

	function moveAt(e) {
		rectangleElem.style.left = e.pageX - shiftX + 'px';
		rectangleElem.style.top = e.pageY - shiftY + 'px';
	}

	document.onmousemove = function(e) {
		var newLeft = e.pageX - shiftX - containerCoords.left;
		var newTop = e.pageY - shiftY - containerCoords.top;

		if (newLeft < 0) {
			newLeft = 0;
		}

		var rightEdge = containerElem.offsetWidth - rectangleElem.offsetWidth;
		if (newLeft > rightEdge) {
			newLeft = rightEdge;
		}

		if (newTop < 0) {
			newTop = 0;
		}

		var topEdge = containerElem.offsetHeight - rectangleElem.offsetHeight;
		if (newTop > topEdge) {
			newTop = topEdge;
		}

		rectangleElem.style.left = newLeft + 'px';
		rectangleElem.style.top = newTop + 'px';
	};

	document.onmouseup = function() {
		document.onmousemove = document.onmouseup = null;
	};
	return false;
}



function getCoords(elem) {
	var box = elem.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}