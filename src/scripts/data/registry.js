/*
 * Registry terminal records. Searching a key prints the record; access depends on
 * the player's clues (requiresClues) or a colleague's trust (unlockTrust).
 * Record numbers and routing are fictional.
 */
(function () {
	'use strict';
	setup.registry = [
		{
			id: 'r-7s',
			keys: ['7/с', 'пакет 7/с', 'packet 7/с'],
			requiresClues: ['packet-7s', 'reg-date-14'],
			docId: 'd4',
			foundLines: [
				'ПАКЕТ 7/С · РЕГ. № 0417/с',
				'ЗАРЕГИСТРИРОВАН: 14.08.91 · НАРОЧНЫМ',
				'СОДЕРЖАНИЕ: ПЕРЕЧЕНЬ МЕРОПРИЯТИЙ',
				'(contents: list of measures)',
				'МЕСТО ХРАНЕНИЯ: КАРТОТЕКА, ЯЩИК 12',
				'КОПИЯ ВЫДАНА В ЛОТОК / copy sent to your tray'
			],
			restrictedLines: [
				'ПАКЕТ 7/С',
				'ДОСТУП ОГРАНИЧЕН',
				'ACCESS RESTRICTED — registration date required'
			]
		},
		{
			id: 'r-telegram',
			keys: ['шифротелеграмма', 'cipher telegram', 'telegram'],
			docId: 'd3',
			foundLines: [
				'ШИФРОТЕЛЕГРАММА · ПРОЕКТ',
				'АДРЕСАТ: ОБКОМЫ, КРАЙКОМЫ (regional Party committees)',
				'СТАТУС: ОЖИДАЕТ ОТПРАВКИ / awaiting dispatch',
				'КОПИЯ ВЫДАНА В ЛОТОК / copy sent to your tray'
			],
			restrictedLines: []
		},
		{
			id: 'r-union',
			keys: ['союзный договор', 'union treaty'],
			foundLines: [
				'ДОГОВОР О СОЮЗЕ СУВЕРЕННЫХ ГОСУДАРСТВ · ПРОЕКТ',
				'(Treaty of the Union of Sovereign States · draft)',
				'ПОДПИСАНИЕ: 20.08.91',
				'ДОКУМЕНТ НЕ ВЫДАЁТСЯ / not issued to this terminal'
			],
			restrictedLines: []
		},
		{
			id: 'r-by-hand',
			keys: ['нарочным', 'by hand', 'by courier'],
			foundLines: [
				'НАРОЧНЫМ = доставка курьером, минуя регистрацию',
				'(by courier — delivered outside the registry)',
				'ЗА АВГУСТ 1991: 1 ЗАПИСЬ → ПАКЕТ 7/С'
			],
			restrictedLines: []
		}
	];
}());
