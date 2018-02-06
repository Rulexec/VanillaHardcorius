let fs = require('fs'),
    path = require('path');

let data = require('./data');

function doBuildToStdout() {
	let templateHtml = fs.readFileSync(path.join(__dirname, 'templates', 'index.html')).toString('utf-8');

	let parts = [];

	data.data.forEach(function(name) {
		let part = fs.readFileSync(path.join(__dirname, 'data', name + '.html')).toString('utf-8');

		let pos = part.indexOf('\n');

		let title = part.slice(0, pos).trim(),
		    contentHtml = part.slice(pos + 1);

		parts.push('<h1>' + title + '</h1>' + contentHtml);
	});

	let html = templateHtml.replace('%BODY_CONTENT%', parts.join('\n'));

	process.stdout.write(html);
	process.stdout.write('\n');
}

if (require.main === module) {
	doBuildToStdout();
}