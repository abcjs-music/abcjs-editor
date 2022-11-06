export function CursorControl(selector) {
	this.selector = selector + " svg";
	this.lastSvg = null;

	this.onStart = function() {
		// There is one svg per line so we need a cursor for each
		var svgs = document.querySelectorAll(this.selector);
		svgs.forEach(svg => {
			if (!svg.querySelector(".abcjs-cursor")) {
				var cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
				cursor.setAttribute("class", "abcjs-cursor");
				cursor.setAttributeNS(null, 'x1', 0);
				cursor.setAttributeNS(null, 'y1', 0);
				cursor.setAttributeNS(null, 'x2', 0);
				cursor.setAttributeNS(null, 'y2', 0);
				svg.appendChild(cursor);
			}
		})
		this.lastSvg = null;
	};
	this.onEvent = function(ev) {
		if (ev.measureStart && ev.left === null)
			return; // this was the second part of a tie across a measure line. Just ignore it.

		var lastSelection = document.querySelectorAll(this.selector + " .highlight");
		for (var k = 0; k < lastSelection.length; k++)
			lastSelection[k].classList.remove("highlight");

		for (var i = 0; i < ev.elements.length; i++ ) {
			var note = ev.elements[i];
			for (var j = 0; j < note.length; j++) {
				note[j].classList.add("highlight");
			}
		}

		if (ev.elements && ev.elements.length > 0 && ev.elements[0].length > 0) {
			var svg = ev.elements[0][0].closest("svg")
			if (this.lastSvg === null)
				this.lastSvg = svg
			else {
				if (this.lastSvg.parentElement && this.lastSvg.parentElement.offsetTop !== svg.parentElement.offsetTop) {
					positionCursor(this.lastSvg.querySelector(".abcjs-cursor"), 0, 0, 0, 0)
					this.lastSvg = svg;
				}
			}

			var cursor = svg.querySelector(".abcjs-cursor")
			positionCursor(cursor, ev.left - 2,ev.left - 2, ev.top, ev.top + ev.height)
		}
	};
	this.onFinished = function() {
		var els = document.querySelectorAll(this.selector + " .highlight");
		for (var i = 0; i < els.length; i++ ) {
			els[i].classList.remove("highlight");
		}
		var cursor = document.querySelector(this.selector + " .abcjs-cursor");
		positionCursor(cursor, 0,0,0, 0)
	};
}

function positionCursor(cursor, x1, x2, y1, y2) {
	if (cursor) {
		cursor.setAttribute("x1", x1);
		cursor.setAttribute("x2", x2);
		cursor.setAttribute("y1", y1);
		cursor.setAttribute("y2", y2);
	}
}
