var doc;
var artboardRect = [];
var center;
var offset = 35;
var model = {
		lines: {
			horizontal: [],
			vertical: [],
			center: true,
		},
		offset: '',
		amount: 0,
		ellipse: {
			top: 0,
			left: 0,
			diameter: 0,
		}
	};
var grid = [];
var value = {
	size: 35,
};

function startGridScript(param) {

	alert('PARAM' + param);

	var paramArray = param.split(',');
	var type = paramArray[0];
	var property = paramArray[1];

	model.amount = parseInt(paramArray[2], 10);
	doc = app.activeDocument;
	doc.defaultStroked = true;
	doc.defaultFilled = true;
	doc.defaultStrokeWidth = 0.25;

	artboardRect = doc.artboards[0].artboardRect;
	center = {
		x: (artboardRect[2] + artboardRect[0]) / 2,
		y: (artboardRect[3] + artboardRect[1]) / 2,
	};

	preparePrimitives(type, property);
}

function drawCenterCross(x0, y0, offset, color) {
	doc = app.activeDocument;
	var horLine = doc.pathItems.add();
	var vertLine = doc.pathItems.add();

	horLine.strokeColor = returnColor(color[0], color[1], color[2]);
	vertLine.strokeColor = returnColor(color[0], color[1], color[2]);
	horLine.filled = false;
	vertLine.filled = false;
	horLine.setEntirePath(Array(Array(x0 - offset, y0), Array(x0 + offset, y0)));
	vertLine.setEntirePath(Array(Array(x0, y0 - offset), Array(x0, y0 + offset)));
}

function preparePrimitives(type, property) {
	property = 'fromCenter';

	switch (property) {
		case 'fromCenter':
			model.lines = {
					horizontal: [[artboardRect[0], center.y], [artboardRect[2], center.y]],
					vertical: [[center.x, artboardRect[1]], [center.x, artboardRect[3]]],
					center: true,
				};
			break;
		case 'alignObject':
			break;
		case 'fill':
			break;
		default:
			alert( "Нет таких значений" );
	}

	switch (type) {
		case 'rectGrid':
			drawRectGrid();
			break;
		case 'ellipseGrid':
			drawCircleGrid();
			break;
		default:
			alert( "Нет таких значений" );
	}
}

function drawRectGrid(start) {
		if (start) {
			var doc = app.activeDocument;

			artboardRect = doc.artboards[0].artboardRect;
			center = {
				x: (artboardRect[2] + artboardRect[0]) / 2,
				y: (artboardRect[3] + artboardRect[1]) / 2,
			};
			model.lines = {
				horizontal: [[artboardRect[0], center.y], [artboardRect[2], center.y]],
				vertical: [[center.x, artboardRect[1]], [center.x, artboardRect[3]]],
				center: true,
			};
		}

		var horCoords = model.lines.horizontal;
		var vertCoords = model.lines.vertical;
		var horLine = doc.pathItems.add();
		var vertLine = doc.pathItems.add();
		var x = 0;
		var y = 0;

		horLine.setEntirePath(Array(Array(horCoords[0][0], horCoords[0][1]), Array(horCoords[1][0], horCoords[1][1])));
		vertLine.setEntirePath(Array(Array(vertCoords[0][0], vertCoords[0][1]), Array(vertCoords[1][0], vertCoords[1][1])));

		horLine.strokeColor = returnColor(9, 77, 123);
		vertLine.strokeColor = returnColor(9, 77, 123);
		horLine.filled = false;
		vertLine.filled = false;

		grid.push(horLine);
		grid.push(vertLine);

	if (!start) {
		for (var i = 0; i < model.amount / 2; i++) {
			x = offset + offset * i;
			y = offset + offset * i;

			duplicateEl(horLine, 0, y);
			duplicateEl(horLine, 0, -y);
			duplicateEl(vertLine, x, 0);
			duplicateEl(vertLine, -x, 0);
		}
	}
	createGroup();
}

function drawCircleGrid() {

	alert('circleCrid');

	var circleOffset = offset * 2;

	for (var i = 0; i < model.amount; i++) {
		var circle = doc.pathItems.ellipse(
			center.y + offset + offset * i,
			center.x - offset - offset * i,
			circleOffset + circleOffset * i,
			circleOffset + circleOffset * i
		);

		circle.strokeColor = returnColor(9, 77, 123);
		circle.filled = false;

		grid.push(circle);
	}
}

function returnColor(r, g, b) {
	var color = new RGBColor();
	color.red   = r;
	color.green = g;
	color.blue  = b;
	return color;
}

function duplicateEl(el, x, y) {
	var elCopy = el.duplicate(el, ElementPlacement.PLACEAFTER);

	elCopy.translate(x, y);
	grid.push(elCopy);
}

function createGroup() {
	var gridGroup = activeDocument.groupItems.add();

	for (i = 0; i < grid.length; i++) {
		grid[i].moveToEnd(gridGroup);
	}
}
