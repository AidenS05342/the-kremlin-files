/* SugarCube configuration and passage bookkeeping (browser only). */
(function () {
	'use strict';

	/* One history state: the browser Back button cannot undo a decision. */
	Config.history.maxStates = 1;
	Config.history.controls = false;
	/* Autosave every story passage, but never the title screen or academic pages,
	   so returning to the title does not overwrite progress. */
	Config.saves.autosave = ['scene', 'document', 'conversation', 'phone', 'terminal', 'bulletin', 'side', 'stub', 'ending'];
	Config.saves.slots = 6;
	/* Blank lines become paragraphs; layout passages use the `nobr` tag. */
	Config.cleanupWikifierOutput = true;

	$(document).on(':passagestart', function (ev) {
		var v = State.variables;
		var tags = ev.passage.tags;
		$('html').attr('data-kind', tags.join(' '));
		if (tags.indexOf('academic') === -1) {
			v.backTo = ev.passage.title;
		}
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
}());
