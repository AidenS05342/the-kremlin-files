/*
 * Registry terminal search. Node-safe: references only `setup`.
 * Data lives in setup.registry (src/scripts/data/registry.js).
 */
(function () {
	'use strict';

	// Latin letters that look identical to Cyrillic ones on a 1991 keyboard layout.
	var LOOKALIKE = { a: 'а', c: 'с', e: 'е', o: 'о', p: 'р', x: 'х', k: 'к', m: 'м', t: 'т', b: 'в', h: 'н', y: 'у' };
	var NEEDS_MAP = /[0-9Ѐ-ӿ]/;

	function mapToken(token) {
		if (!NEEDS_MAP.test(token)) { return token; }
		return token.replace(/[a-z]/g, function (ch) { return LOOKALIKE[ch] || ch; });
	}

	setup.normalizeQuery = function (q) {
		return String(q || '').trim().toLowerCase().split(/\s+/).map(mapToken).join(' ');
	};

	function hasAccess(entry, v) {
		var clues = entry.requiresClues || [];
		var allClues = clues.every(function (id) { return v.clues.indexOf(id) !== -1; });
		if (allClues) { return true; }
		var t = entry.unlockTrust;
		return !!(t && v.trust[t.who] >= t.min);
	}

	setup.searchRegistry = function (query, v) {
		var q = setup.normalizeQuery(query);
		var entries = setup.registry || [];
		for (var i = 0; i < entries.length; i++) {
			var e = entries[i];
			var match = e.keys.some(function (k) { return setup.normalizeQuery(k) === q; });
			if (!match) { continue; }
			if (hasAccess(e, v)) {
				var found = { status: 'found', lines: e.foundLines.slice() };
				if (e.docId) { found.docId = e.docId; }
				return found;
			}
			return { status: 'restricted', lines: e.restrictedLines.slice() };
		}
		return { status: 'notfound', lines: ['ЗАПИСЬ НЕ НАЙДЕНА', 'RECORD NOT FOUND'] };
	};
}());
