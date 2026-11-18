/*
 * Game-state rules. Node-safe: references only the global `setup` at load time.
 * Every helper takes SugarCube's variables object (State.variables) as `v`.
 */
(function () {
	'use strict';

	setup.TRUST_MIN = -3;
	setup.TRUST_MAX = 3;
	setup.EXPOSURE_THRESHOLD = 5;

	var PULLS = ['loyalty', 'reform', 'survival'];
	var DOC_FIELDS = ['seen', 'held', 'copied', 'destroyed', 'handed'];

	setup.newGame = function () {
		return {
			trust: { rudin: 0, belova: 0, zaitsev: 0, markova: 0 },
			pulls: { loyalty: 0, reform: 0, survival: 0 },
			exposure: 0,
			flags: {},
			docs: {},
			clues: [],
			glossary: [],
			notesSeen: [],
			tray: [],
			kept: [],
			phone: null,
			act: 'prologue',
			date: '12 АВГ 1991',
			time: '09:00',
			returnTo: 'Start'
		};
	};

	setup.adjustTrust = function (v, who, delta) {
		if (!Object.prototype.hasOwnProperty.call(v.trust, who)) {
			throw new Error('adjustTrust: unknown character "' + who + '"');
		}
		var next = v.trust[who] + delta;
		v.trust[who] = Math.max(setup.TRUST_MIN, Math.min(setup.TRUST_MAX, next));
		return v.trust[who];
	};

	setup.addPull = function (v, which, n) {
		if (PULLS.indexOf(which) === -1) {
			throw new Error('addPull: unknown pull "' + which + '"');
		}
		v.pulls[which] += n;
	};

	setup.addExposure = function (v, n) {
		v.exposure += n;
		return v.exposure;
	};

	setup.markClue = function (v, id) {
		if (v.clues.indexOf(id) !== -1) { return false; }
		v.clues.push(id);
		return true;
	};

	setup.setDoc = function (v, id, field, value) {
		if (DOC_FIELDS.indexOf(field) === -1) {
			throw new Error('setDoc: unknown field "' + field + '"');
		}
		if (!v.docs[id]) {
			v.docs[id] = { seen: false, held: false, copied: false, destroyed: false, handed: false };
		}
		v.docs[id][field] = value === undefined ? true : value;
	};

	/* Exposure overrides everything; otherwise the final decision about the files decides.
	   A player who never acts on the files is carried along by the institution. */
	setup.resolveEnding = function (v) {
		if (v.exposure >= setup.EXPOSURE_THRESHOLD) { return 'scapegoat'; }
		switch (v.flags.finalDecision) {
			case 'kept': return 'survivor';
			case 'handed': return 'witness';
			default: return 'loyalist';
		}
	};
}());
