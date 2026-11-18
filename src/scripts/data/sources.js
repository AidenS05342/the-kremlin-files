/*
 * Bibliography (Chicago notes-bibliography style). `verified: false` means the
 * entry has not yet been checked against a library catalog or publisher record;
 * the Bibliography passage marks those entries visibly.
 */
(function () {
	'use strict';
	setup.sources = {
		/* ---- Scholarly ---- */
		plokhy2014: {
			type: 'scholarly', verified: false,
			chicago: 'Plokhy, Serhii. <em>The Last Empire: The Final Days of the Soviet Union.</em> New York: Basic Books, 2014.'
		},
		kotkin2001: {
			type: 'scholarly', verified: false,
			chicago: 'Kotkin, Stephen. <em>Armageddon Averted: The Soviet Collapse, 1970–2000.</em> Oxford: Oxford University Press, 2001.'
		},
		brown1996: {
			type: 'scholarly', verified: false,
			chicago: 'Brown, Archie. <em>The Gorbachev Factor.</em> Oxford: Oxford University Press, 1996.'
		},
		dunlop1993: {
			type: 'scholarly', verified: false,
			chicago: 'Dunlop, John B. <em>The Rise of Russia and the Fall of the Soviet Empire.</em> Princeton, NJ: Princeton University Press, 1993.'
		},
		solnick1998: {
			type: 'scholarly', verified: false,
			chicago: 'Solnick, Steven L. <em>Stealing the State: Control and Collapse in Soviet Institutions.</em> Cambridge, MA: Harvard University Press, 1998.'
		},
		beissinger2002: {
			type: 'scholarly', verified: false,
			chicago: 'Beissinger, Mark R. <em>Nationalist Mobilization and the Collapse of the Soviet State.</em> Cambridge: Cambridge University Press, 2002.'
		},
		linzstepan1996: {
			type: 'scholarly', verified: false,
			chicago: 'Linz, Juan J., and Alfred Stepan. <em>Problems of Democratic Transition and Consolidation: Southern Europe, South America, and Post-Communist Europe.</em> Baltimore: Johns Hopkins University Press, 1996.'
		},
		kryshtanovskaya1996: {
			type: 'scholarly', verified: false,
			chicago: 'Kryshtanovskaya, Olga, and Stephen White. “From Soviet <em>Nomenklatura</em> to Russian Elite.” <em>Europe-Asia Studies</em> 48, no. 5 (1996).'
		},
		remnick1993: {
			type: 'scholarly', verified: false,
			chicago: 'Remnick, David. <em>Lenin’s Tomb: The Last Days of the Soviet Empire.</em> New York: Random House, 1993.'
		},

		/* ---- Primary ---- */
		gkchpAppeal1991: {
			type: 'primary', verified: false,
			chicago: 'State Committee on the State of Emergency in the USSR (GKChP). “Appeal to the Soviet People” [Обращение к советскому народу] and accompanying statements, 18–19 August 1991. Published in <em>Pravda</em> and broadcast by Soviet state media, 19 August 1991.'
		},
		yeltsinAppeal1991: {
			type: 'primary', verified: false,
			chicago: 'Yeltsin, Boris, Ivan Silayev, and Ruslan Khasbulatov. “To the Citizens of Russia” [К гражданам России]. Moscow, 19 August 1991.'
		},
		belovezha1991: {
			type: 'primary', verified: false,
			chicago: 'Agreement on the Establishment of the Commonwealth of Independent States [Belovezha Accords]. Viskuli, Belarus, 8 December 1991.'
		},
		gorbachevResignation1991: {
			type: 'primary', verified: false,
			chicago: 'Gorbachev, Mikhail. Televised address announcing his resignation as President of the USSR. Moscow, 25 December 1991.'
		},
		nsarchive: {
			type: 'primary', verified: false,
			chicago: 'National Security Archive, George Washington University. Electronic Briefing Books on the August 1991 coup and the end of the Soviet Union. https://nsarchive.gwu.edu.'
		}
	};
}());
