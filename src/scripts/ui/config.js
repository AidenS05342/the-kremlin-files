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

/* Favicon: a red star, drawn inline (no image file needed). */
(function () {
	'use strict';
	var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon fill="%23a3201a" points="50,4 61,38 97,38 68,59 79,94 50,72 21,94 32,59 3,38 39,38"/></svg>';
	$('<link rel="icon" type="image/svg+xml">').attr('href', 'data:image/svg+xml,' + svg).appendTo('head');
}());
