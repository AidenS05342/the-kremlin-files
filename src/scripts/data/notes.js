/*
 * Historical notes (ИСТОРИЧЕСКАЯ СПРАВКА).
 *
 * Verification pass of 19 November 2026: every claim below was checked against
 * the sources listed. `locators` gives a document identifier, section or entry
 * where one could be confirmed. NO PAGE NUMBERS in the books have been
 * confirmed; the books remain listed as general scholarly support only.
 *
 * status:
 *   verified        each claim confirmed by at least one listed source
 *   partial         some claims confirmed; `remaining` says what is not
 *   reconstruction  explains an in-game invention, not a documented object
 */
(function () {
	'use strict';
	setup.notes = {
		'union-treaty': {
			title: 'The New Union Treaty', date: 'August 1991',
			body: 'Gorbachev negotiated a new treaty to hold the USSR together as a looser federation of sovereign republics, transferring substantial powers to them. Several republics, including the three Baltic states, Georgia and Moldova, refused to take part in the process. The signing was scheduled for 20 August 1991. Hardliners in the leadership saw the treaty as the end of the centralized Soviet state; the coup was launched the day before it could be signed.',
			sources: ['encRusHist', 'bigencGkchp', 'plokhy2014'],
			locators: { encRusHist: 'entry “Union Treaty”', bigencGkchp: 'motive: to prevent the signing of the new Union Treaty' },
			status: 'verified'
		},
		'gorbachev-foros': {
			title: 'Gorbachev at Foros', date: '18–22 August 1991',
			body: 'On 18 August a group of officials from Moscow arrived at Gorbachev’s holiday dacha at Foros, in Crimea, and demanded that he either declare a state of emergency or resign in favour of Vice President Yanayev. By the account of Gorbachev and his aides, he refused; one of the visitors, General Valentin Varennikov, later disputed this. Gorbachev was kept isolated at Foros until the coup collapsed, and flew back to Moscow in the early hours of 22 August.',
			sources: ['britannicaCoup', 'forosAccount', 'plokhy2014'],
			locators: { britannicaCoup: 'the 18 August visit and its demands', forosAccount: 'eyewitness account of the visit (Baklanov, Boldin, Shenin, Varennikov)' },
			status: 'partial',
			remaining: 'The exact moment and extent of the cut to the dacha’s communications is reported in reference summaries but was not confirmed in a scholarly source during this check.'
		},
		'gkchp-announcement': {
			title: 'The State Committee on the State of Emergency (ГКЧП)', date: '19 August 1991',
			body: 'On the morning of 19 August, Soviet radio and television announced that Vice President Gennady Yanayev had assumed the president’s duties because Gorbachev was unable to perform them for health reasons, and that a State Committee on the State of Emergency had been formed. Its eight members included KGB chairman Vladimir Kryuchkov, Defense Minister Dmitry Yazov, Interior Minister Boris Pugo, and Prime Minister Valentin Pavlov. A state of emergency was declared in parts of the country for six months, and troops and tanks moved into Moscow that morning.',
			sources: ['gkchpAppeal1991', 'bigencGkchp', 'britannicaCoup', 'npr2021'],
			locators: { bigencGkchp: 'announcement by radio and television on the morning of 19 August; “health” justification in the preamble of the GKChP statement', britannicaCoup: 'eight-member committee and its members', npr2021: 'tanks and troops entering Moscow on the morning of 19 August' },
			status: 'verified'
		},
		'swan-lake': {
			title: '<em>Swan Lake</em> on television', date: '19 August 1991',
			body: 'On the morning of the coup, Soviet state television replaced its normal programming with Tchaikovsky’s ballet <em>Swan Lake</em>, shown repeatedly between official announcements. Viewers who remembered the ballet being broadcast after the death of Leonid Brezhnev in 1982 understood it as a sign of political crisis, and it became an enduring symbol of the coup.',
			sources: ['npr2021', 'remnick1993'],
			locators: { npr2021: 'looped broadcast on 19 August; precedent of Brezhnev’s death in 1982' },
			status: 'verified'
		},
		'yeltsin-tank': {
			title: 'Yeltsin on the tank', date: '19 August 1991',
			body: 'Boris Yeltsin, elected President of the Russian republic (RSFSR) two months earlier, climbed onto a tank outside the Russian parliament building, the “White House,” at about midday and read the appeal “To the Citizens of Russia.” It called the committee’s actions a coup and called for a general strike.',
			sources: ['yeltsinAppeal1991', 'britannicaCoup'],
			locators: { yeltsinAppeal1991: 'text of the appeal (signed Yeltsin, Silayev, Khasbulatov)' },
			status: 'verified'
		},
		'press-suspended': {
			title: 'Newspapers suspended', date: '19 August 1991',
			body: 'The emergency committee’s Resolution No. 2 limited the press to a list of nine loyal newspapers and suspended the rest, including the reformist weekly <em>Moscow News</em>. Journalists from banned papers responded by producing a jointly published paper, <em>Obshchaya gazeta</em> (“Common Newspaper”), distributed by hand during the coup.',
			sources: ['gkchpResolution2', 'nation2021', 'dunlop1993'],
			locators: { gkchpResolution2: 'Resolution No. 2 of 19 August 1991 (title and adoption)', nation2021: 'origin of <em>Obshchaya gazeta</em> as a joint publication of banned papers' },
			status: 'partial',
			remaining: 'The figure of nine permitted newspapers comes from contemporary and later press reporting; the full text of Resolution No. 2 and its list was not seen during this check. Sources also disagree on whether <em>Obshchaya gazeta</em> first appeared on 19 or 20 August.'
		},
		'secretariat-telegram': {
			title: 'The Party apparatus and the coup', date: '19 August 1991',
			body: 'On the morning of 19 August a telegram in the name of the Central Committee Secretariat was sent to the Party leaders of the republics, territories and regions, as Central Committee Secretary Oleg Shenin later acknowledged. Contemporary reports also describe the Secretariat sending republican leaders documents in support of the emergency committee. A recent study of the Central Committee building during the coup finds that most of the Secretariat had not known of the plot in advance but did nothing to oppose it. The draft telegram in this game is fictional; it is modeled on this episode.',
			sources: ['sheninInterview', 'puchenkov2019', 'dunlop1993'],
			locators: { sheninInterview: 'Shenin on the telegram sent in the Secretariat’s name on the morning of 19 August', puchenkov2019: 'abstract: Secretariat largely unaware of the plot but passive during it' },
			status: 'partial',
			remaining: 'The exact wording of the 19 August telegram, and how directly it instructed support for the committee, has not been confirmed; check the documents published from the 1992 Constitutional Court case on the CPSU.'
		},
		'white-house-defense': {
			title: 'Defending the White House', date: '19–21 August 1991',
			body: 'Tens of thousands of people gathered around the Russian parliament building, building barricades from trolleybuses, trees, building materials and whatever else was at hand. A curfew was declared in Moscow from 23:00 to 05:00, beginning on 20 August.',
			sources: ['encRusHist', 'moscowCurfew1991', 'plokhy2014'],
			locators: { encRusHist: 'entry “August 1991 Putsch”: crowds and barricades', moscowCurfew1991: 'curfew order, 23:00–05:00 from 20 August' },
			status: 'verified'
		},
		'three-deaths': {
			title: 'Three deaths on the Garden Ring', date: 'Night of 20–21 August 1991',
			body: 'In the early hours of 21 August, three young men, Dmitry Komar, Vladimir Usov and Ilya Krichevsky, were killed in a confrontation with armored vehicles in the underpass where the Garden Ring crosses Novy Arbat, near the White House. They were posthumously made Heroes of the Soviet Union by decree of the Soviet president and were buried at Vagankovo Cemetery on 24 August.',
			sources: ['kommersantFuneral1991', 'tassMemorial', 'plokhy2014'],
			locators: { kommersantFuneral1991: 'funeral at Vagankovo on 24 August; posthumous Hero title', tassMemorial: 'memorial at the junction of Novy Arbat and the Garden Ring' },
			status: 'verified'
		},
		'coup-collapse': {
			title: 'The coup collapses', date: '21–22 August 1991',
			body: 'On 21 August the troops began to be withdrawn from Moscow and the committee fell apart; several of its members flew to Crimea to see Gorbachev. Gorbachev returned to Moscow in the early hours of 22 August, and several committee members were arrested.',
			sources: ['britannicaCoup', 'nsarchive', 'brown1996'],
			locators: { nsarchive: 'documents of 19–21 August 1991, including the Russian Supreme Soviet session of 21 August' },
			status: 'verified'
		},
		'cpsu-suspended': {
			title: 'The Communist Party suspended', date: '23 August 1991',
			body: 'On 23 August Yeltsin signed Decree No. 79 suspending the activity of the Communist Party of the RSFSR, the Russian branch of the Soviet Communist Party, pending an investigation of its role in the coup. On 6 November 1991, Decree No. 169 ended the activity of the CPSU and the Communist Party of the RSFSR on Russian territory.',
			sources: ['decree79', 'decree169', 'bigencGkchp'],
			locators: { decree79: 'Decree No. 79 of 23 August 1991', decree169: 'Decree No. 169 of 6 November 1991; <em>Vedomosti</em> 1991, no. 45, art. 1537' },
			status: 'verified'
		},
		'old-square-sealed': {
			title: 'Old Square sealed', date: '23–24 August 1991',
			body: 'After the coup failed, the Russian authorities ordered Communist Party buildings sealed. The Central Committee complex on Staraya Ploshchad (Old Square) was closed and its archives sealed, ending the Central Committee’s ability to meet there.',
			sources: ['puchenkov2019', 'remnick1993'],
			locators: { puchenkov2019: 'the coup as seen from the Central Committee building' },
			status: 'partial',
			remaining: 'Contemporary press reports confirm the order to seal Party buildings, but the exact date and authority for sealing the Old Square complex, the crowds outside, and reports of officials destroying documents were not confirmed in a citable source during this check. These details appear in the game as fiction.'
		},
		'gorbachev-resignation': {
			title: 'The end of the USSR', date: 'August–December 1991',
			body: 'On 24 August Gorbachev resigned as General Secretary and called on the Central Committee to dissolve itself, saying the Secretariat and Politburo had not spoken out against the coup. On 8 December the leaders of Russia, Ukraine and Belarus declared that the USSR had ceased to exist and founded the Commonwealth of Independent States. On 25 December Gorbachev resigned as Soviet president in a televised address, and shortly afterwards the Soviet flag over the Kremlin was lowered.',
			sources: ['gorbachevStatement1991', 'belovezha1991', 'gorbachevResignation1991', 'brown1996'],
			locators: { gorbachevStatement1991: 'statement of 24 August 1991 (<em>Krasnaia zvezda</em>, 27 August 1991)', belovezha1991: 'agreement signed at Viskuli, 8 December 1991' },
			status: 'verified'
		},
		'nomenklatura': {
			title: 'From nomenklatura to new elite', date: '1990s',
			body: 'The nomenklatura was the Soviet system of appointments to leading posts, and the class of officials who held them. Sociologists Olga Kryshtanovskaya and Stephen White argued that much of post-Soviet Russia’s political and business elite had come from the old nomenklatura. Their research is a key source for the idea of regime change without elite turnover.',
			sources: ['kryshtanovskaya1996', 'solnick1998'],
			locators: { kryshtanovskaya1996: 'article, pp. 711–33 (whole article)' },
			status: 'partial',
			remaining: 'The article’s overall argument is confirmed by later scholarship that cites it, but its specific percentages were not seen; quote figures only after reading the article itself (DOI 10.1080/09668139608412377).'
		},
		'office-computers': {
			title: 'The registry terminal', date: 'Late 1980s',
			reconstruction: true,
			status: 'reconstruction',
			body: 'The registry terminal in this game is a reconstruction, not a documented object. Soviet IBM PC-compatible computers such as the ЕС-1841 (ES-1841) were manufactured in Minsk from 1987, but whether this particular department used one for its registry is not established. Paper card indexes (картотеки) remained the authoritative record in Soviet offices.',
			remaining: 'The ES-1841 production details come from computing-history sources, not a scholarly publication; the use of computers in the Central Committee apparatus has not been researched.'
		}
	};
}());
