/* SugarCube configuration and passage bookkeeping (browser only). */
(function () {
	'use strict';

	/* One history state: the browser Back button cannot undo a decision. */
	Config.history.maxStates = 1;
	Config.history.controls = false;
	Config.saves.autosave = true;
	Config.saves.slots = 6;

	$(document).on(':passagestart', function (ev) {
		var v = State.variables;
		var tags = ev.passage.tags;
		if (tags.indexOf('scene') !== -1) {
			v.returnTo = ev.passage.title;
		}
		if (tags.indexOf('document') !== -1) {
			Object.keys(setup.documents).forEach(function (id) {
				if (setup.documents[id].passage === ev.passage.title) {
					setup.setDoc(v, id, 'seen');
				}
			});
		}
	});

	/* Expose passage tags to CSS for full-screen passages (title, bulletin, academic). */
	$(document).on(':passagerender', function (ev) {
		$('html').attr('data-kind', ev.passage.tags.join(' '));
	});
}());
