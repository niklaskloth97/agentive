import { Book, Globe, Languages, LucideIcon } from "lucide-react";

export type ActivityGroupKey = "PC" | "ELS" | "ICAU" | "LA";

type ActivityGroupMeta = {
	label: string;
	slug: string;
	description: string;
	icon: LucideIcon;
	colors: {
		primary: string;
		secondary: string;
		text: string;
		focus: string;
	};
};

type ActivityGroup = {
	stories: Story[];
};

type Story = {
	id: string;
	title: string;
	slug: string;
	description?: string;
	sets: Array<Array<Activity>>;
};

type Activity = {
	id: string;
	type?: "song" | "game" | "worksheet";
	title?: string;
	description?: string;
	languages: Partial<
		Record<
			Language["id"],
			{
				label: string;
				title: string;
				audioUrl?: string;
				pdfUrl: string;
			}
		>
	>;
};

type Language = {
	id: "en" | "de" | "it" | "fr" | "sv" | "lux" | "gr";
	label: string;
	code: string;
};

export const ACTIVITY_GROUPS_META: Record<ActivityGroupKey, ActivityGroupMeta> =
	{
		PC: {
			label: "Plurilingual Competence",
			slug: "plurilingual-competence",
			description:
				"Activities to help children develop their plurilingual competence",
			icon: Languages,
			colors: {
				primary: "#d00000",
				secondary: "#d53b3b",
				text: "white",
				focus: "#ffd166",
			},
		},
				LA: {
			label: "Language Awareness",
			slug: "language-awareness",
			description: "Activities to help children develop language awareness",
			icon: Book,
			colors: {
				primary: "#9d4edd",
				secondary: "#c77dff",
				text: "white",
				focus: "#9d4edd",
			},
		},
		ELS: {
			label: "Early Literacy Skills",
			slug: "early-literacy-skills",
			description: "Activities to help children develop early literacy skills",
			icon: Book,
			colors: {
				primary: "#006d77",
				secondary: "#83c5be",
				text: "white",
				focus: "#83c5be",
			},
		},
		

		ICAU: {
			label: "InterCultural Awareness and Understanding",
			slug: "intercultural-awareness-and-understanding",
			description:
				"Activities to help children develop intercultural awareness and understanding",
			icon: Globe,
			colors: {
				primary: "#ffd166",
				secondary: "#ffd166",
				text: "#1D1D1D",
				focus: "#ffd166",
			},
		},
	};

export const ACTIVITY_GROUPS: Record<
	ActivityGroupKey,
	Omit<ActivityGroup, "id">
> = {
	PC: {
		stories: [
			
			{
				id: "1", // Match the ID from stories.json
				title: "Bobba's first trip to Earth", // Match title from stories.json
				slug: "bobbas-first-trip", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-1-1",
						languages: {
							en: {
								label: "English",
								title: "My favourite story part",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/PC/Story_1_PL_1_E.pdf",
							},
							fr: {
								label: "French",
								title: "MA PARTIE PRÉFÉRÉE DE L'HISTOIRE",
								pdfUrl: "/activities/story1/PC/Story_1_PL_1_F.pdf",
							}
						},
					},
					{
						id: "activity-1-2",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/activities/story1/PC/Story_1_PL_1_E.pdf",
							title: "Understanding details",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_1_PL_2_F.pdf",
							title: "COMPRENDRE LES DÉTAILS",
						}
						},
					},
					{
						id: "activity-1-3",
						type: "worksheet",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story1/PC/Story_1_PL_3_E.pdf",
							title: "Retelling the story",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_1_PL_3_F.pdf",
							title: "RACONTER L'HISTOIRE À NOUVEAU",
						}
						},
					}
					]
				],
				},
			{
				id: "2", // Match the ID from stories.json
				title: "At the kindergarten", // Match title from stories.json
				slug: "at-the-kindergarten", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-2-1",
						languages: {
							en: {
								label: "English",
								title: "Dialogic reading",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/PC/Story_2_PL_1_E.pdf",
							},
							fr: {
								label: "French",
								title: "LECTURE DIALOGIQUE",
								pdfUrl: "/activities/story1/PC/Story_2_PL_1_F.pdf",
							}
						},
					},
					{
						id: "activity-2-2",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/activities/story1/PC/Story_2_PL_1_E.pdf",
							title: "Plurilingual theater",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_2_PL_2_F.pdf",
							title: "THÉÂTRE PLURILINGUE",
						}
						},
					},
					{
						id: "activity-2-3",
						type: "worksheet",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story1/PC/Story_2_PL_3_E.pdf",
							title: "Counting and hide and seek",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_2_PL_3_F.pdf",
							title: "COMPTER et JOUER À CACHE-CACHE",
						}
						},
					}
					]
				],
				},
			{
				id: "3", // Match the ID from stories.json
				title: "Bobba at the beach", // Match title from stories.json
				slug: "at-the-beach", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-3-1",
						languages: {
							en: {
								label: "English",
								title: "Dialogic reading",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/PC/Story_3_PL_1_E.pdf",
							},
							fr: {
								label: "French",
								title: " LECTURE DIALOGIQUE",
								pdfUrl: "/activities/story1/PC/Story_3_PL_1_F.pdf",
							}
						},
					},
					{
						id: "activity-3-2",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/activities/story1/PC/Story_3_PL_1_E.pdf",
							title: "Action story",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_3_PL_2_F.pdf",
							title: "HISTOIRE À MIMER",
						}
						},
					},
					{
						id: "activity-3-3",
						type: "worksheet",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story1/PC/Story_3_PL_3_E.pdf",
							title: "Feelings",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_3_PL_3_F.pdf",
							title: "MISSING",
						}
						},
					},
					{
						id: "activity-4-3",
						type: "worksheet",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story1/PC/Story_3_PL_4_E.pdf",
							title: "What can we see in the sea?",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_3_PL_4_F.pdf",
							title: "QU'EST-CE QU'IL Y A DANS LA MER ?",
						}
						},
					}
					]
				],
				},
			{
				id: "4", // Match the ID from stories.json
				title: "Sleeping at a friend's", // Match title from stories.json
				slug: "at-a-friend", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-1-1",
						languages: {
							en: {
								label: "English",
								title: "Understand and create stories",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/PC/Story_4_PL_1_E.pdf",
							},
							fr: {
								label: "French",
								title: "COMPRENDRE ET CRÉER DES HISTOIRES",
								pdfUrl: "/activities/story1/PC/Story_4_PL_1_F.pdf",
							}
						},
					},
					{
						id: "activity-4-2",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/activities/story1/PC/Story_4_PL_1_E.pdf",
							title: "Bon appetit",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_4_PL_2_F.pdf",
							title: "BON APPÉTIT",
						}
						},
					},
					{
						id: "activity-4-3",
						type: "worksheet",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story1/PC/Story_4_PL_3_E.pdf",
							title: "Move and speak along",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_4_PL_3_F.pdf",
							title: "MIME ET RÉPÈTE APRÈS MOI",
						}
						},
					}
					]
				],
				}			
		],
	},
	ELS: {
		stories: [
			{
				id: "1", // Match the ID from stories.json
				title: "Bobba's first trip to Earth", // Match title from stories.json
				slug: "bobbas-first-trip", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-1-1",
						description: "A fun song about space travel in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_1_ELS_1_E.pdf",
							title: "Writing Bobba",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_1_ELS_1_F.pdf",
							title: "ÉCRIRE LE MOT BOBBA",
						},
						de: {
								label: "German",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/ELS/Story_1_ELS_1_G.pdf",
								title: "Bobba schreiben",
						}
					}, 
				},//ich glaube hier fehlt eine Klammer zu }, bin mir aber nicht sicher (Mara)
					{
						id: "activity-1-2",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/activities/story1/PC/Story_1_ELS_2_E.pdf",
							title: "Creating symobls",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_1_ELS_2_F.pdf",
							title: "CRÉER DES SYMBOLES",
						},
						de: {
								label: "German",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/ELS/Story_1_ELS_2_G.pdf",
								title: "Symbole erstellen",
						}
						},
					},
					{
						id: "activity-1-3",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story1/PC/Story_1_ELS_3_E.pdf",
							title: "Symbols and names",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_1_ELS_3_F.pdf",
							title: "SYMBOLES ET NOMS",
						},
						de: {
								label: "German",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/ELS/Story_1_ELS_3_G.pdf",
								title: "Symbol und Name",
						}
						},
					}
					]
					// Second set with different activities
					
				],
				},
			{
				id: "2", // Match the ID from stories.json
				title: "At the kindergarten", // Match title from stories.json
				slug: "at-the-kindergarten", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-2-1",
						description: "A fun song about space travel in different languages",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_2_ELS_1_F.pdf",
							title: "CHASSE AU TRÉSOR PAR ÉCRIT",
						}
					}, 
				},//ich glaube hier fehlt eine Klammer zu }, bin mir aber nicht sicher (Mara)
					{
						id: "activity-2-2",
						description: "Match planet names in different languages",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_2_ELS_2_F.pdf",
							title: "TÂCHES PENDANT LA CHASSE AU TRÉSOR ET DÉCODAGE D'UN MESSAGE CACHÉ",
						}
						},
					},
					{
						id: "activity-2-3",
						description: "Learn words related to space in different languages",
						languages: {
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_3_ELS_3_F.pdf",
							title: "CHASSE AU TRÉSOR À LA MAISON",
						}
						},
					}
					]
					// Second set with different activities
					
				],
				},
			{
				id: "3", // Match the ID from stories.json
				title: "Bobba at the beach", // Match title from stories.json
				slug: "at-the-beach", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-3-1",
						description: "A fun song about space travel in different languages",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_3_ELS_1_F-1.pdf",
							title: "ÉCRIRE DANS LE SABLE À L'INTÉRIEUR",
						}
					}, 
				},//ich glaube hier fehlt eine Klammer zu }, bin mir aber nicht sicher (Mara)
					{
						id: "activity-3-2",
						description: "Match planet names in different languages",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_3_ELS_2_F.pdf",
							title: "ÉCRIRE DANS LE SABLE À L'EXTÉRIEUR",
						}
						},
					},
					{
						id: "activity-3-3",
						description: "Learn words related to space in different languages",
						languages: {
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_3_ELS_3_F.pdf",
							title: "DES MOTS COMME DÉCORATIONS",
						}
						},
					}
					]
					// Second set with different activities
					
				],
				},
			{
				id: "4", // Match the ID from stories.json
				title: "Sleeping at a friends's", // Match title from stories.json
				slug: "at-a-friend", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-4-1",
						description: "A fun song about space travel in different languages",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_4_ELS_1_F.pdf",
							title: "SOIRÉE",
						}
					}, 
				 }, //ich glaube hier fehlt eine Klammer zu, bin mir aber nicht sicher (Mara)
					{
						id: "activity-4-2",
						description: "Match planet names in different languages",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_4_ELS_2_F.pdf",
							title: "VITÉ 2 : LUMIÈRE SUR LES LETTRES",
						}
						},
					},
					{
						id: "activity-4-3",
						description: "Learn words related to space in different languages",
						languages: {
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_4_ELS_3_F.pdf",
							title: "VOS HISTOIRES DU SOIR PRÉFÉRÉES",
						}
						},
					}
					]
					// Second set with different activities
					
				],
				}	
		],
	},
	ICAU: {
		stories: [
			{
				id: "1", // Match the ID from stories.json
				title: "Bobba's first trip to Earth", // Match title from stories.json
				slug: "bobbas-first-trip", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-1-1",			
						description: "A fun song about space travel in different languages",
						languages: {
						en: {
							label: "English",
							title: "Greetings",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_1_ICAU_1_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_1_ICAU_1_F.pdf",
							title: "SE SALUER",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_1_S.pdf",
							title: "POZDRAVI",
						}
						},
					},
					{
						id: "activity-1-2",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/activities/story1/PC/Story_1_ICAU_2_E.pdf",
							title: "Meanings of names",
												},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_1_ICAU_2_F.pdf",
							title: "EXPLORER LE SENS DES PRÉNOMS",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_2_S.pdf",
							title: "POMENI IMEN",
						}
						},
					},
					{
						id: "activity-1-3",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story1/PC/Story_1_ICAU_3_E.pdf",
							title: "ESPERANTO",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_1_ICAU_3_F.pdf",
							title: "PARLER L’ESPÉRANTO",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_3_S.pdf",
							title: "ESPERANTO",
						}
						},
					}
					]
				],
				},
				{
				id: "2", // Match the ID from stories.json
				title: "At the kindergarten", // Match title from stories.json
				slug: "bobbas-first-trip", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-2-1",			
						description: "A fun song about space travel in different languages",
						languages: {
						en: {
							label: "English",
							title: "Sharing flavours",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_2_ICAU_1_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_2_ICAU_1_F.pdf",
							title: "PARTAGE DE SAVEURS",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_2_ICAU_1_S.pdf",
							title: "DELIMO SI OKUSE",
						}
						},
					},
					{
						id: "activity-2-2",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/activities/story1/PC/Story_2_ICAU_2_E.pdf",
							title: "Building bridges: Connecting the new with the familiar",
												},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_2_ICAU_2_F.pdf",
							title: "UN PONT ENTRE NOUS : TROUVER LE LIEN ENTRE NOUVEAUTÉ ET FAMILIARITÉ",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_2_ICAU_2_S.pdf",
							title: "NOST 2: GRADIMO MOSTOVE – POVEZUJEMO NOVO Z ZNANIM",
						}
						},
					},
					{
						id: "activity-3-3",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story1/PC/Story_2_ICAU_3_E.pdf",
							title: "Number detectives",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_2_ICAU_3_F.pdf",
							title: "L'AFFAIRE DES CHIFFRES",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_2_ICAU_3_S.pdf",
							title: "ŠTEVLIČNI DETEKTIVI",
						}
						},
					}
					]
				],
				},
				{
				id: "3", // Match the ID from stories.json
				title: "Bobba at the beach", // Match title from stories.json
				slug: "at-the-beach", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-3-1",			
						description: "A fun song about space travel in different languages",
						languages: {
						en: {
							label: "English",
							title: "Emotions around the world",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_3_ICAU_1_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_3_ICAU_1_F.pdf",
							title: "TOUR DU MONDE DES ÉMOTIONS",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_3_ICAU_1_S.pdf",
							title: "ČUSTVA PO SVETU",
						}
						},
					},
					{
						id: "activity-3-2",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/activities/story1/PC/Story_3_ICAU_2_E.pdf",
							title: "Let's go to the beach",
												},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_3_ICAU_2_F.pdf",
							title: "ALLONS À LA PLAGE",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_3_ICAU_2_S.pdf",
							title: "GREMO NA PLAZO",
						}
						},
					},
					{
						id: "activity-3-3",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story1/PC/Story_3_ICAU_3_E.pdf",
							title: "Five friends at the beach",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_1_ICAU_3_F.pdf",
							title: "CINQ AMI ES À LA PLAGE",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_3_S.pdf",
							title: "PET PRIJATELJEV NA PLAZI",
						}
						},
					}
					]
				],
				},
				{
				id: "3", // Match the ID from stories.json
				title: "Sleeping at a friend's", // Match title from stories.json
				slug: "at-a-friend", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-4-1",			
						description: "A fun song about space travel in different languages",
						languages: {
						en: {
							label: "English",
							title: "Food travels",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_4_ICAU_1_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/PC/Story_4_ICAU_1_F.pdf",
							title: "JOUONS COMME MOI OU COMME TOI",
						}
						},
					},
					{
						id: "activity-4-2",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/activities/story1/PC/Story_4_ICAU_2_E.pdf",
							title: "Play like me, play like you",
												},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_4_ICAU_2_F-1.pdf",
							title: "JOUONS COMME MOI OU COMME TOI",
						}
						},
					},
					{
						id: "activity-4-3",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story1/PC/Story_4_ICAU_3_E.pdf",
							title: "Games from here and there",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/PC/Story_4_ICAU_3_F.pdf",
							title: "TOUR DU MONDE DES JEUX",
						}
						},
					}
					]
				],
				}
			],
	},
	LA: {
		stories: [
			{
			id: "1", // Match the ID from stories.json
			title: "Bobbas first trip to earth",
			slug: "bobbas-first-trip", // URL-friendly slug
			description: "Follow Bobba the alien as he discovers Earth for the first time.",
			sets: [
				[
					{
						id: "activity-1-1",
						description: "A fun song about space travel in different languages",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_1_LA_1_E.pdf",
								title: "What's your name?",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_1_LA_1_F.pdf",
								title: "COMMENT T’APPELLES-TU?",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_1_LA_1_S.pdf",
								title: "PRIMERJAJMO IMENA",
							},
						},
					},
					{
						id: "activity-1-2",
						description: "Match planet names in different languages",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus",
								pdfUrl: "/activities/story1/LA/Story_2_LA_2_E.pdf",
								title: "Initial sound hunt",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus",
								pdfUrl: "/activities/story1/LA/Story_1_LA_2_F.pdf",
								title: "À LA RECHERCHE DU SON INITIAL",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_1_LA_2_S.pdf",
								title: "KAKO TI JE IME?",
							},
						},
					},
					{
						id: "activity-1-3",
						title: "Space Vocabulary Worksheet",
						description: "Learn words related to space in different languages",
						languages: {
							en: {
								label: "English",
								pdfUrl: "/activities/story1/LA/Story_1_LA_3_E.pdf",
								title: "Name Bobba's planet",
							},
							fr: {
								label: "French",
								pdfUrl: "/activities/story1/LA/Story_1_LA_3_F.pdf",
								title: "NOMMER LA PLANETE DE BOBBA",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_1_LA_3_S.pdf",
								title: "POIMENUJ BOBBOV PLANET",
							}
						},
					}
				],
			],
		},
		{
			id: "2", // Match the ID from stories.json
			title: "At the kindergarten",
			slug: "at-the-kindergarten", // URL-friendly slug
			description: "Follow Bobba the alien as he discovers Earth for the first time.",
			sets: [
				[
					{
						id: "activity-2-1",
						description: "A fun song about space travel in different languages",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_2_LA_1_E.pdf",
								title: "Initial sound hunt",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_2_LA_1_F.pdf",
								title: "À LA RECHERCHE DU SON INITIAL",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_2_LA_1_S.pdf",
								title: "LOV NA ZAČETNI GLAS",
							},
						},
					},
					{
						id: "activity-2-2",
						description: "Match planet names in different languages",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus",
								pdfUrl: "/activities/story1/LA/Story_2_LA_2_E.pdf",
								title: "Hello around the world",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus",
								pdfUrl: "/activities/story1/LA/Story_2_LA_2_F.pdf",
								title: "TOUR DU MONDE DES BONJOURS",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_2_LA_2_S.pdf",
								title: "ŽIVJO! V JEZIKIH SVETA",
							},
						},
					},
					{
						id: "activity-2-3",
						title: "Space Vocabulary Worksheet",
						description: "Learn words related to space in different languages",
						languages: {
							en: {
								label: "English",
								pdfUrl: "/activities/story1/LA/Story_2_LA_3_E.pdf",
								title: "Which language is it?",
							},
							fr: {
								label: "French",
								pdfUrl: "/activities/story1/LA/Story_2_LA_3_F-1.pdf",
								title: "COMPTER et JOUER À CACHE-CACHE",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_2_LA_2_S.pdf",
								title: " KATERI JEZIK JE TO?",
							}
						},
					}
				],
			],
		},
		{
			id: "3", // Match the ID from stories.json
			title: "Bobba at the beach",
			slug: "at-the-beach", // URL-friendly slug
			description: "Follow Bobba the alien as he discovers Earth for the first time.",
			sets: [
				[
					{
						id: "activity-3-1",
						description: "A fun song about space travel in different languages",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_3_LA_1_E.pdf",
								title: "Dididi song",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_3_LA_1_F.pdf",
								title: "LA CHANSON DID",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_3_LA_1_S.pdf",
								title: "PESMICA DIDIDI",
							},
						},
					},
					{
						id: "activity-3-2",
						description: "Match planet names in different languages",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus",
								pdfUrl: "/activities/story1/LA/Story_3_LA_2_E.pdf",
								title: "Rhyme memory",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus",
								pdfUrl: "/activities/story1/LA/Story_3_LA_2_F.pdf",
								title: "JEU DE MÉMOIRE : LES RIMES",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_3_LA_2_S.pdf",
								title: "SPOMIN Z RIMAMI",
							},
						},
					},
					{
						id: "activity-3-3",
						title: "Space Vocabulary Worksheet",
						description: "Learn words related to space in different languages",
						languages: {
							en: {
								label: "English",
								pdfUrl: "/activities/story1/LA/Story_3_LA_3_E.pdf",
								title: "Sounds of different languages",
							},
							fr: {
								label: "French",
								pdfUrl: "/activities/story1/LA/Story_3_LA_3_F.pdf",
								title: "LES SONS DES DIFFÉRENTES LANGUES",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_3_LA_3_S.pdf",
								title: "ZVEN RAZLIČNIH JEZIKOV",
							}
						},
					}
				],
			],
		},
		{
			id: "4", // Match the ID from stories.json
			title: "Sleeping at a friend's",
			slug: "at-a-friend", // URL-friendly slug
			description: "Follow Bobba the alien as he discovers Earth for the first time.",
			sets: [
				[
					{
						id: "activity-4-1",
						description: "A fun song about space travel in different languages",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_4_LA_1_E.pdf",
								title: "The biggest sandwich in the world",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_4_LA_1_F.pdf",
								title: "LE PLUS GRAND SANDWICH AU MONDE",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_4_LA_1_S.pdf",
								title: "NAJVEČJI SENDVIČ NA SVETU",
							},
						},
					},
					{
						id: "activity-4-2",
						description: "Match planet names in different languages",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus",
								pdfUrl: "/activities/story1/LA/Story_4_LA_2_E.pdf",
								title: "I spy with my little eye",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus",
								pdfUrl: "/activities/story1/LA/Story_4_LA_2_F.pdf",
								title: "MON PETIT ŒIL VOIT",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_4_LA_2_S.pdf",
								title: "VIDIM NEKAJ, KAR SE ZAČNE NA",
							},
						},
					},
					{
						id: "activity-4-3",
						title: "Space Vocabulary Worksheet",
						description: "Learn words related to space in different languages",
						languages: {
							en: {
								label: "English",
								pdfUrl: "/activities/story1/LA/Story_4_LA_3_E.pdf",
								title: "What's this story about?",
							},
							fr: {
								label: "French",
								pdfUrl: "/activities/story1/LA/Story_4_LA_3_F.pdf",
								title: "QUE RACONTE CETTE HISTOIRE?",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_4_LA_3_S.pdf",
								title: "O ČEM GOVORI TA ZGODBA?",
							}
						},
					}
				],
			],
		}
	],
	},
};
