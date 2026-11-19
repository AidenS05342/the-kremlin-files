/* Small presentation helpers. Node-safe: references only `setup`. */
(function () {
	'use strict';

	var MINDS = {
		loyalty: 'You keep telling yourself the Party will hold.',
		reform: 'You keep thinking about the people outside.',
		survival: 'You keep thinking about your family.'
	};

	setup.stateOfMind = function (v) {
		var best = null;
		var top = 0;
		['loyalty', 'reform', 'survival'].forEach(function (k) {
			if (v.pulls[k] > top) { top = v.pulls[k]; best = k; }
		});
		return best ? MINDS[best] : 'You keep your head down and do your work.';
	};

	setup.sortedGlossary = function (v) {
		return v.glossary.slice().sort(function (a, b) {
			return setup.glossary[a].ru.localeCompare(setup.glossary[b].ru, 'ru');
		});
	};

	setup.sourcesByType = function (type) {
		var plain = function (k) { return setup.sources[k].chicago.replace(/<[^>]+>/g, ''); };
		return Object.keys(setup.sources)
			.filter(function (k) { return setup.sources[k].type === type; })
			.sort(function (a, b) { return plain(a).localeCompare(plain(b)); });
	};

	setup.plainTitle = function (noteId) {
		return setup.notes[noteId].title.replace(/<[^>]+>/g, '');
	};
}());
