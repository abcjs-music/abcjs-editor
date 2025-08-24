import type {NoteTimingEvent} from "abcjs";

export class CursorControl {
	selector: string
	lastSvg: SVGElement|null

	constructor(selector:string)
	{
		this.selector = selector + " svg";
		this.lastSvg = null;
	}
	onStart() {
		// There is one svg per line so we need a cursor for each
		const svgs = document.querySelectorAll(this.selector);
		svgs.forEach((svg) => {
			if (!svg.querySelector(".abcjs-cursor")) {
				const cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
				cursor.setAttribute("class", "abcjs-cursor");
				cursor.setAttributeNS(null, "x1", '0');
				cursor.setAttributeNS(null, "y1", '0');
				cursor.setAttributeNS(null, "x2", '0');
				cursor.setAttributeNS(null, "y2", '0');
				svg.appendChild(cursor);
			}
		});
		this.lastSvg = null;
	}
	onEvent(ev: NoteTimingEvent) {
		if (ev.measureStart && ev.left === null)
			return; // this was the second part of a tie across a measure line. Just ignore it.

		const lastSelection = document.querySelectorAll(this.selector + " .highlight");
		for (let k = 0; k < lastSelection.length; k++) {
			const el = lastSelection[k]
			if (el)
				el.classList.remove("highlight");
		}

		if (ev.elements) {
			for (let i = 0; i < ev.elements.length; i++) {
				const note = ev.elements[i];
				if (note) {
					for (let j = 0; j < note.length; j++) {
						const n = note[j]
						if (n)
							n.classList.add("highlight");
					}
				}
			}
		}

		if (ev.elements && ev.elements.length > 0 && ev.elements[0] && ev.elements[0].length > 0) {
			const el = ev.elements[0][0]
			if (el) {
				const svg = el.closest("svg");
				if (this.lastSvg === null)
					this.lastSvg = svg;
				else {
					//@ts-expect-error - svg definitely exists
					const parent: HTMLElement = svg.parentElement
					if (this.lastSvg.parentElement && this.lastSvg.parentElement.offsetTop !== parent.offsetTop) {
						positionCursor(this.lastSvg.querySelector(".abcjs-cursor"), 0, 0, 0, 0);
						this.lastSvg = svg;
					}
				}


				if (svg && ev.left !== undefined && ev.top !== undefined && ev.height !== undefined) {
					const cursor = svg.querySelector(".abcjs-cursor");
					positionCursor(cursor, ev.left - 2, ev.left - 2, ev.top, ev.top + ev.height);
				}
			}
		}
	}
	onFinished() {
		const els = document.querySelectorAll(this.selector + " .highlight");
		for (let i = 0; i < els.length; i++) {
			const el = els[i]
			if (el)
				el.classList.remove("highlight");
		}
		const cursor = document.querySelector(this.selector + " .abcjs-cursor");
		positionCursor(cursor, 0, 0, 0, 0);
	};
}

function positionCursor(cursor:Element|null, x1:number, x2:number, y1:number, y2:number) {
	if (cursor) {
		cursor.setAttribute("x1", ''+x1);
		cursor.setAttribute("x2", ''+x2);
		cursor.setAttribute("y1", ''+y1);
		cursor.setAttribute("y2", ''+y2);
	}
}
