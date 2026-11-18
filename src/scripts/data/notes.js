/*
 * Historical notes (ИСТОРИЧЕСКАЯ СПРАВКА). Each note states only well-documented
 * facts and cites keys in setup.sources. Page-level citations have not yet been
 * checked; the note dialog says so until `pagesChecked` is set to true.
 * `reconstruction: true` marks a note explaining an in-game invention instead.
 */
(function () {
	'use strict';
	setup.notes = {
		'union-treaty': {
			title: 'The New Union Treaty', date: 'August 1991',
			body: 'Gorbachev negotiated a new treaty to hold the USSR together as a looser “Union of Sovereign States,” transferring substantial powers to the republics. Its signing was scheduled for 20 August 1991. Hardliners in the leadership saw the treaty as the end of the centralized Soviet state; the coup was launched the day before it could be signed.',
			sources: ['plokhy2014', 'dunlop1993']
		},
		'gorbachev-foros': {
			title: 'Gorbachev at Foros', date: '18–21 August 1991',
			body: 'On 18 August a delegation from Moscow visited Gorbachev at his holiday dacha at Foros, in Crimea, and demanded that he endorse emergency rule. He refused. His communications were cut and he was kept isolated there until the coup collapsed on 21 August.',
			sources: ['plokhy2014', 'brown1996']
		},
		'gkchp-announcement': {
			title: 'The State Committee on the State of Emergency (ГКЧП)', date: '19 August 1991',
			body: 'Early on 19 August, Soviet state media announced that Vice President Gennady Yanayev had assumed the president’s duties because Gorbachev was unable to perform them “for health reasons,” and that a State Committee on the State of Emergency had been formed. Its members included KGB chairman Vladimir Kryuchkov, Defense Minister Dmitry Yazov, Interior Minister Boris Pugo, and Prime Minister Valentin Pavlov. A state of emergency was declared in parts of the country, and armored units were ordered into Moscow that morning.',
			sources: ['gkchpAppeal1991', 'dunlop1993']
		},
		'swan-lake': {
			title: '<em>Swan Lake</em> on television', date: '19 August 1991',
			body: 'On the morning of the coup, Soviet state television replaced its normal programming with Tchaikovsky’s ballet <em>Swan Lake</em>, broadcast repeatedly between official announcements. For many Soviet citizens the ballet became the defining image of those days.',
			sources: ['remnick1993', 'plokhy2014']
		},
		'yeltsin-tank': {
			title: 'Yeltsin on the tank', date: '19 August 1991',
			body: 'Boris Yeltsin, elected President of the Russian republic (RSFSR) two months earlier, climbed onto a tank outside the Russian parliament building — the “White House” — and read an appeal “To the Citizens of Russia.” It called the committee’s actions an unconstitutional coup and called for a general strike.',
			sources: ['yeltsinAppeal1991', 'dunlop1993']
		},
		'press-suspended': {
			title: 'Newspapers suspended', date: '19 August 1991',
			body: 'The emergency committee allowed only a short list of loyal central newspapers to appear and suspended the rest, including the reformist weekly <em>Moscow News</em>. Journalists from several banned papers responded by producing a jointly published underground paper, <em>Obshchaya gazeta</em> (“Common Newspaper”).',
			sources: ['dunlop1993', 'remnick1993']
		},
		'secretariat-telegram': {
			title: 'The Party apparatus and the coup', date: '19 August 1991',
			body: 'Documents made public after the coup indicate that on 19 August the Central Committee Secretariat sent coded telegrams to regional Party committees urging them to support the emergency measures. These documents were later used to argue that the Party apparatus, not only individual leaders, had been complicit. The draft telegram in this game is fictional; it is modeled on that real episode.',
			sources: ['dunlop1993', 'nsarchive']
		},
		'white-house-defense': {
			title: 'Defending the White House', date: '19–21 August 1991',
			body: 'Tens of thousands of Muscovites gathered around the Russian parliament building, building barricades from trolleybuses, construction materials, and anything else at hand. The emergency committee declared a curfew in Moscow on 20 August.',
			sources: ['plokhy2014', 'remnick1993']
		},
		'three-deaths': {
			title: 'Three deaths on the Garden Ring', date: 'Night of 20–21 August 1991',
			body: 'In the early hours of 21 August, three young men — Dmitry Komar, Vladimir Usov, and Ilya Krichevsky — were killed in a confrontation with armored vehicles in an underpass on the Garden Ring near the White House. They were the only fatalities in Moscow during the coup and were posthumously named Heroes of the Soviet Union.',
			sources: ['plokhy2014', 'remnick1993']
		},
		'coup-collapse': {
			title: 'The coup collapses', date: '21–22 August 1991',
			body: 'On 21 August the military began withdrawing troops from Moscow and the committee’s resolve collapsed. Gorbachev returned to Moscow in the early hours of 22 August, and several committee members were arrested.',
			sources: ['plokhy2014', 'brown1996']
		},
		'cpsu-suspended': {
			title: 'The Communist Party suspended', date: '23 August 1991',
			body: 'On 23 August Yeltsin signed a decree suspending the activity of the Communist Party on the territory of the Russian republic. In November 1991 a further decree banned it in Russia.',
			sources: ['dunlop1993', 'plokhy2014']
		},
		'old-square-sealed': {
			title: 'Old Square sealed', date: '23 August 1991',
			body: 'On 23 August the Central Committee buildings on Staraya Ploshchad (Old Square) were sealed on the orders of the Moscow city authorities and staff were told to leave, while crowds gathered outside. Contemporary accounts describe Party officials trying to remove or destroy documents before the doors were shut.',
			sources: ['remnick1993', 'dunlop1993']
		},
		'gorbachev-resignation': {
			title: 'The end of the USSR', date: 'August–December 1991',
			body: 'On 24 August Gorbachev resigned as General Secretary and called on the Central Committee to dissolve itself. On 8 December the leaders of Russia, Ukraine, and Belarus declared that the USSR had ceased to exist and founded the Commonwealth of Independent States. On 25 December Gorbachev resigned as Soviet president in a televised address, and the Soviet flag was lowered over the Kremlin that evening.',
			sources: ['gorbachevResignation1991', 'belovezha1991', 'brown1996']
		},
		'nomenklatura': {
			title: 'From nomenklatura to new elite', date: '1990s',
			body: 'The nomenklatura was the Soviet system of appointments to leading posts, and the class of officials who held them. Sociologists Olga Kryshtanovskaya and Stephen White found that a large share of post-Soviet Russia’s political and business elite had come from the old nomenklatura. Their research is a key source for the idea of regime change without elite turnover.',
			sources: ['kryshtanovskaya1996', 'solnick1998']
		},
		'office-computers': {
			title: 'The registry terminal', date: 'Late 1980s',
			reconstruction: true,
			body: 'The registry terminal in this game is a reconstruction, not a documented object. Soviet IBM-compatible personal computers such as the ЕС-1841 (ES-1841) were produced in the late 1980s for state institutions, but whether this particular department used one for its registry is not established. Paper card indexes (картотеки) remained the authoritative record in Soviet offices. This note will be revised if research shows otherwise.'
		}
	};
}());
