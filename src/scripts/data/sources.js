/*
 * Bibliography (Chicago notes-bibliography style). `verified: true` means the
 * author, title, publisher/venue and year were checked against library catalog,
 * publisher or archive records (19 November 2026). `verified: false` entries are
 * marked visibly on the Bibliography page.
 */
(function () {
	'use strict';
	setup.sources = {
		/* ---- Scholarly ---- */
		plokhy2014: {
			type: 'scholarly', verified: true,
			chicago: 'Plokhy, Serhii. <em>The Last Empire: The Final Days of the Soviet Union.</em> New York: Basic Books, 2014.'
		},
		kotkin2001: {
			type: 'scholarly', verified: true,
			chicago: 'Kotkin, Stephen. <em>Armageddon Averted: The Soviet Collapse, 1970–2000.</em> Oxford: Oxford University Press, 2001.'
		},
		brown1996: {
			type: 'scholarly', verified: true,
			chicago: 'Brown, Archie. <em>The Gorbachev Factor.</em> Oxford: Oxford University Press, 1996.'
		},
		dunlop1993: {
			type: 'scholarly', verified: true,
			chicago: 'Dunlop, John B. <em>The Rise of Russia and the Fall of the Soviet Empire.</em> Princeton, NJ: Princeton University Press, 1993.'
		},
		solnick1998: {
			type: 'scholarly', verified: true,
			chicago: 'Solnick, Steven L. <em>Stealing the State: Control and Collapse in Soviet Institutions.</em> Russian Research Center Studies 89. Cambridge, MA: Harvard University Press, 1998.'
		},
		beissinger2002: {
			type: 'scholarly', verified: true,
			chicago: 'Beissinger, Mark R. <em>Nationalist Mobilization and the Collapse of the Soviet State.</em> Cambridge Studies in Comparative Politics. Cambridge: Cambridge University Press, 2002.'
		},
		linzstepan1996: {
			type: 'scholarly', verified: true,
			chicago: 'Linz, Juan J., and Alfred Stepan. <em>Problems of Democratic Transition and Consolidation: Southern Europe, South America, and Post-Communist Europe.</em> Baltimore: Johns Hopkins University Press, 1996.'
		},
		kryshtanovskaya1996: {
			type: 'scholarly', verified: true,
			chicago: 'Kryshtanovskaya, Olga, and Stephen White. “From Soviet <em>Nomenklatura</em> to Russian Elite.” <em>Europe-Asia Studies</em> 48, no. 5 (1996): 711–33. https://doi.org/10.1080/09668139608412377.'
		},
		remnick1993: {
			type: 'scholarly', verified: true,
			chicago: 'Remnick, David. <em>Lenin’s Tomb: The Last Days of the Soviet Empire.</em> New York: Random House, 1993. (Journalistic account.)'
		},

		/* ---- Primary ---- */
		gkchpAppeal1991: {
			type: 'primary', verified: true,
			chicago: 'State Committee on the State of Emergency in the USSR (GKChP). “Appeal to the Soviet People” [Обращение к советскому народу] and accompanying statements, dated 18 August 1991. Broadcast by Soviet state media on 19 August 1991.'
		},
		yeltsinAppeal1991: {
			type: 'primary', verified: true,
			chicago: 'Yeltsin, Boris, Ivan Silayev, and Ruslan Khasbulatov. “To the Citizens of Russia” [К гражданам России]. Moscow, 19 August 1991. Reprinted in <em>Materialy Samizdata</em> 9 (1991).'
		},
		belovezha1991: {
			type: 'primary', verified: true,
			chicago: 'Agreement on the Establishment of the Commonwealth of Independent States [Belovezha Accords]. Viskuli, Belarus, 8 December 1991.'
		},
		gorbachevResignation1991: {
			type: 'primary', verified: true,
			chicago: 'Gorbachev, Mikhail. Televised address announcing his resignation as President of the USSR. Moscow, 25 December 1991.'
		},
		nsarchive: {
			type: 'primary', verified: true,
			chicago: 'Savranskaya, Svetlana, ed. “The August 1991 Coup in Moscow, 20 Years Later.” National Security Archive Electronic Briefing Book No. 357. Washington, DC: National Security Archive, George Washington University, 2011. https://nsarchive2.gwu.edu/NSAEBB/NSAEBB357/.'
		}
	};
}());
