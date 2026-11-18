/* Registry terminal rendering: typed output, search, chips (browser only). */
(function () {
	'use strict';

	var reduced = function () {
		return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	};
	var queue = Promise.resolve();

	function typeLine(out, text, cls) {
		queue = queue.then(function () {
			return new Promise(function (resolve) {
				var line = $('<div class="term-line"></div>').addClass(cls || '').appendTo(out);
				out.scrollTop(out.prop('scrollHeight'));
				if (reduced()) { line.text(text); resolve(); return; }
				var i = 0;
				(function step() {
					i += 2;
					line.text(text.slice(0, i));
					if (i < text.length) { setTimeout(step, 14); } else { resolve(); }
				}());
			});
		});
		return queue;
	}

	function stripCommand(q) {
		return String(q).replace(/^\s*(поиск|search)\s+/i, '');
	}

	setup.terminal = {
		run: function (raw) {
			var out = $('#term-output');
			var query = stripCommand(raw).trim();
			if (!query) { return; }
			var v = State.variables;
			var result = setup.searchRegistry(query, v);
			typeLine(out, '> ПОИСК ' + query.toUpperCase(), 'term-echo');
			result.lines.forEach(function (l) {
				typeLine(out, l, result.status === 'found' ? '' : 'term-warn');
			});
			if (result.status === 'found' && result.docId) {
				var doc = setup.documents[result.docId];
				if (v.tray.indexOf(result.docId) === -1 && v.kept.indexOf(result.docId) === -1) {
					v.tray.push(result.docId);
				}
				queue = queue.then(function () {
					$('<button type="button" class="term-open"></button>')
						.text('ОТКРЫТЬ · open “' + doc.title + '”')
						.on('click', function () { Engine.play(doc.passage); })
						.appendTo($('<div class="term-line"></div>').appendTo(out));
					out.scrollTop(out.prop('scrollHeight'));
				});
			}
		}
	};

	$(document).on(':passagedisplay', function (ev) {
		if (ev.passage.tags.indexOf('terminal') === -1) { return; }
		queue = Promise.resolve();
		var input = $('#term-input');
		$('#term-form').on('submit', function (e) {
			e.preventDefault();
			setup.terminal.run(input.val());
			input.val('');
		});
		$('.term-chip').on('click', function () {
			input.val($(this).attr('data-key')).trigger('focus');
		});
		input.trigger('focus');
	});
}());
