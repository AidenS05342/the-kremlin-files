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
		gkchpResolution2: {
			type: 'primary', verified: true,
			chicago: 'State Committee on the State of Emergency in the USSR (GKChP). Resolution No. 2, “On Limiting the List of Central, Moscow City and Regional Socio-Political Publications” [Об ограничении перечня выпускаемых центральных, московских городских и областных общественно-политических изданий], 19 August 1991. Discussed in “Dokumenty GKChP gotovilis’ v KGB,” <em>Novaya gazeta</em>, 15 August 2011. https://novayagazeta.ru/articles/2011/08/15/45468-dokumenty-gkchp-gotovilis-v-kgb-2.'
		},
		moscowCurfew1991: {
			type: 'primary', verified: true,
			chicago: 'Order introducing a curfew in Moscow from 23:00 to 05:00, effective 20 August 1991. Reproduced in <em>Kommersant</em>’s archive of August 1991 documents. https://www.kommersant.ru/doc/597.'
		},
		decree79: {
			type: 'primary', verified: true,
			chicago: 'Decree of the President of the RSFSR No. 79, “On the Suspension of the Activity of the Communist Party of the RSFSR” [О приостановлении деятельности Коммунистической партии РСФСР], 23 August 1991. Text at Russian Wikisource: https://ru.wikisource.org/wiki/Указ_Президента_РСФСР_от_23.08.1991_№_79.'
		},
		decree169: {
			type: 'primary', verified: true,
			chicago: 'Decree of the President of the RSFSR No. 169, “On the Activity of the CPSU and the CP RSFSR” [О деятельности КПСС и КП РСФСР], 6 November 1991. <em>Vedomosti S’’ezda narodnykh deputatov i Verkhovnogo Soveta RSFSR</em>, 1991, no. 45, art. 1537.'
		},
		gorbachevStatement1991: {
			type: 'primary', verified: true,
			chicago: 'Gorbachev, Mikhail. Statement on resigning as General Secretary of the CPSU, 24 August 1991. <em>Krasnaia zvezda</em>, 27 August 1991. English translation in <em>Seventeen Moments in Soviet History</em>, “Gorbachev Resigns from the Communist Party.” https://soviethistory.msu.edu/1991/august-coup/august-coup-texts/gorbachev-resigns-from-the-communist-party/.'
		},
		kommersantFuneral1991: {
			type: 'primary', verified: true,
			chicago: '“Kak ikh khoronili” [How They Were Buried]. <em>Kommersant</em>, August 1991. https://www.kommersant.ru/doc/590.'
		},
		sheninInterview: {
			type: 'primary', verified: true,
			chicago: 'Shenin, Oleg. Interview on the events of August 1991. <em>Kommersant</em>. https://www.kommersant.ru/doc/71453.'
		},
		forosAccount: {
			type: 'primary', verified: true,
			chicago: '“Three Days in Foros.” <em>Foreign Policy</em>, 20 June 2011. https://foreignpolicy.com/2011/06/20/three-days-in-foros/.'
		},
		puchenkov2019: {
			type: 'scholarly', verified: false,
			chicago: 'Puchenkov, Aleksandr S. “The August Coup in 1991: A View from the Central Committee Building and Eyewitness Accounts.” <em>Modern History of Russia</em> (<em>Noveishaia istoriia Rossii</em>), 2019, 454–84. https://dspace.spbu.ru/handle/11701/15745.'
		},
		britannicaCoup: {
			type: 'reference', verified: true,
			chicago: '“1991 Soviet Coup Attempt.” <em>Encyclopaedia Britannica</em>. https://www.britannica.com/topic/Soviet-Coup-of-1991. Accessed 19 November 2026.'
		},
		bigencGkchp: {
			type: 'reference', verified: true,
			chicago: '“Gosudarstvennyi komitet po chrezvychainomu polozheniiu” [State Committee on the State of Emergency]. <em>Bol’shaia rossiiskaia entsiklopediia</em> (electronic version). https://bigenc.ru/c/gosudarstvennyi-komitet-po-chrezvychainomu-polozheniiu-5f32f7. Accessed 19 November 2026.'
		},
		encRusHist: {
			type: 'reference', verified: true,
			chicago: 'Millar, James R., ed. <em>Encyclopedia of Russian History</em>. New York: Macmillan Reference USA, 2004. Entries “Union Treaty” and “August 1991 Putsch,” via Encyclopedia.com. Accessed 19 November 2026.'
		},
		npr2021: {
			type: 'reference', verified: true,
			chicago: '“In 1991, Soviet Citizens Saw Swans on the TV and Knew It Meant Turmoil.” NPR, 19 August 2021. https://www.npr.org/2021/08/19/1029437787/in-1991-soviet-citizens-saw-swans-on-the-tv-and-knew-it-meant-turmoil.'
		},
		nation2021: {
			type: 'reference', verified: true,
			chicago: '“30 Years Ago, the Tanks Rolled Into Moscow—but We Refused to Be Silent.” <em>The Nation</em>, August 2021. https://www.thenation.com/article/world/soviet-coup-attempt/.'
		},
		tassMemorial: {
			type: 'reference', verified: true,
			chicago: '“Gorbachev Sends Wreath to Memorial to Democracy Defenders in August 1991 ‘Putsch.’” TASS. https://tass.com/society/895350.'
		},
		nsarchive: {
			type: 'primary', verified: true,
			chicago: 'Savranskaya, Svetlana, ed. “The August 1991 Coup in Moscow, 20 Years Later.” National Security Archive Electronic Briefing Book No. 357. Washington, DC: National Security Archive, George Washington University, 2011. https://nsarchive2.gwu.edu/NSAEBB/NSAEBB357/.'
		}
	};
}());
