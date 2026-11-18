/* Custom macros: <<ru>>, <<note>>, <<clue>>…<</clue>>, <<returnlink>> (browser only). */
(function () {
	'use strict';

	function pushOnce(list, id) {
		if (list.indexOf(id) === -1) { list.push(id); }
	}

	function toast(text) {
		var el = $('<div class="toast" role="status"></div>').text(text).appendTo('body');
		setTimeout(function () { el.addClass('toast--out'); }, 1800);
		setTimeout(function () { el.remove(); }, 2400);
	}
	setup.toast = toast;

	/* <<ru "id" ["display text"]>> — Russian term with tooltip; records it in the Dictionary. */
	Macro.add('ru', {
		handler: function () {
			var id = this.args[0];
			var g = setup.glossary[id];
			if (!g) { return this.error('unknown glossary id "' + id + '"'); }
			pushOnce(State.variables.glossary, id);
			var tip = g.ru + ' · ' + g.translit + ' · ' + g.en;
			$('<span class="ru" tabindex="0"></span>')
				.attr({ 'data-tip': tip, 'aria-label': (this.args[1] || g.ru) + ' (' + g.translit + ': ' + g.en + ')' })
				.text(this.args[1] || g.ru)
				.appendTo(this.output);
		}
	});

	/* <<note "id">> — historical-note stamp; opens the note with its citations. */
	setup.openNote = function (id) {
		var n = setup.notes[id];
		pushOnce(State.variables.notesSeen, id);
		var html = '<p class="note-date">' + n.date + '</p><p>' + n.body + '</p>';
		if (n.reconstruction) {
			html += '<p class="note-flag">Reconstruction — not a documented historical object.</p>';
		} else {
			html += '<h3>Sources</h3><ul class="note-sources">' + n.sources.map(function (key) {
				return '<li>' + setup.sources[key].chicago + '</li>';
			}).join('') + '</ul>';
			if (!n.pagesChecked) {
				html += '<p class="note-flag">Page-level citations pending verification.</p>';
			}
		}
		Dialog.setup('ИСТОРИЧЕСКАЯ СПРАВКА · ' + n.title, 'note-dialog');
		Dialog.append(html);
		Dialog.open();
	};

	Macro.add('note', {
		handler: function () {
			var id = this.args[0];
			if (!setup.notes[id]) { return this.error('unknown note id "' + id + '"'); }
			$('<button type="button" class="note-stamp"></button>')
				.attr('title', 'Historical note: ' + $('<span>').html(setup.notes[id].title).text())
				.html('<span lang="ru">ИСТОРИЧЕСКАЯ СПРАВКА</span><small>historical note</small>')
				.on('click', function () { setup.openNote(id); })
				.appendTo(this.output);
		}
	});

	/* <<clue "id">>text<</clue>> — a key phrase the player can mark into the notebook. */
	Macro.add('clue', {
		tags: null,
		handler: function () {
			var id = this.args[0];
			if (!setup.clues[id]) { return this.error('unknown clue id "' + id + '"'); }
			var btn = $('<button type="button" class="clue"></button>')
				.attr('aria-label', 'Mark clue: ' + setup.clues[id].label)
				.wiki(this.payload[0].contents)
				.appendTo(this.output);
			if (State.variables.clues.indexOf(id) !== -1) { btn.addClass('marked').attr('aria-pressed', 'true'); }
			btn.on('click', function () {
				if (setup.markClue(State.variables, id)) {
					toast('Записано · Recorded in notebook');
				}
				btn.addClass('marked').attr('aria-pressed', 'true');
			});
		}
	});

	/* <<returnlink ["label"]>> — back to the last main-line scene. */
	Macro.add('returnlink', {
		handler: function () {
			var target = State.variables.returnTo || 'Start';
			$('<button type="button" class="return-link"></button>')
				.text(this.args[0] || '← Return to desk')
				.on('click', function () { Engine.play(target); })
				.appendTo(this.output);
		}
	});
}());
