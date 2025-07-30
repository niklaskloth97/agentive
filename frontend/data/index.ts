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
							pdfUrl: "/activities/story1/PC/Story_1_ELS_2_E.pdf",
							title: "Creating symobls",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/PC/Story_1_ELS_2_F.pdf",
							title: "CRÉER DES SYMBOLES",
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
		stories: [{
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
						}
						},
					}
					]
				],
				}],
	},
	LA: {
		stories: [{
			id: "1", // Match the ID from stories.json
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
								title: "Comparing names",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_1_LA_1_F.pdf",
								title: "COMPARER LES NOMS",
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
								pdfUrl: "/activities/story1/LA/Story_1_LA_2_E.pdf",
								title: "What's your name?",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus",
								pdfUrl: "/activities/story1/LA/Story_1_LA_2_F.pdf",
								title: "COMMENT T’APPELLES-TU?",
							}
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
							}
						},
					}
				],
			],
			title: ""
		}],
	},
};
