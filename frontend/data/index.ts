import { Book, Globe, Languages, LucideIcon } from "lucide-react";

export type ActivityGroupKey = "PC" | "ELS" | "ICAU" | "LA";
export type GuideKey = 
  | "dialogic" 
  | "story-1-reading"
  | "story-2-reading"
  | "story-3-reading"
  | "story-4-reading"
  | "story-5-reading"
  | "story-6-reading"
  | "story-7-reading"
  | "story-8-reading";

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
type Guide = {
	id: string;
	translations: Partial<Record<LanguageGuide["id"], 
		{ 
			url: string }>>;
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
	id: "en" | "de" | "it" | "fr" | "sv" | "lux" | "gr"| "ld";
	label: string;
	code: string;
};

type LanguageGuide = {
	id: "en" | "de" | "fr" | "sv" | "gr";
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
								pdfUrl: "/activities/story1/PC/Story_1_PL_1_E.pdf",
							},
							fr: {
								label: "French",
								title: "Ma partie préférée de l’histoire",
								pdfUrl: "/activities/story1/PC/Story_1_PL_1_F.pdf",
							}, 
							it: {
								label: "Italienisch",
								title: "",
								pdfUrl: "",
							}, 
							ld: {
								label: "Ladisch",
								title: "",
								pdfUrl: "",
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
							title: "Comprendre les détails",
						}, 
						it: {
							label: "Italian",
							audioUrl: "",
							pdfUrl: "",
							title: "",
						},
						ld: {
							label: "Ladisch",
							audioUrl: "",
							pdfUrl: "",
							title: "",
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
							title: "Raconter l’histoire à nouveau",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
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
								pdfUrl: "/activities/story2/PC/Story_2_PL_1_E.pdf",
							},
							fr: {
								label: "French",
								title: "Lecture dialogique",
								pdfUrl: "/activities/story2/PC/Story_2_PL_1_F.pdf",
							}, 
							it: {
								label: "Italian",
								title: "",
								pdfUrl: "",
							}, 
							ld: {
								label: "Ladisch",
								title: "",
								pdfUrl: "",
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
							pdfUrl: "/activities/story2/PC/Story_2_PL_1_E.pdf",
							title: "Plurilingual theater",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story2/PC/Story_2_PL_2_F.pdf",
							title: "Théâtre plurilingue",
						}, 
						it: {
							label: "Italian",
							audioUrl: "",
							pdfUrl: "",
							title: "",
						},
						ld: {
							label: "Ladisch",
							audioUrl: "",
							pdfUrl: "",
							title: "",
							}
						}
						},
					{
						id: "activity-2-3",
						type: "worksheet",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story2/PC/Story_2_PL_3_E.pdf",
							title: "Counting and hide and seek",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story2/PC/Story_2_PL_3_F.pdf",
							title: "Compter et jouer à cache-cache",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
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
								pdfUrl: "/activities/story3/PC/Story_3_PL_1_E.pdf",
							},
							fr: {
								label: "French",
								title: "Lecture dialogique",
								pdfUrl: "/activities/story3/PC/Story 3_PL_1_F.pdf",
							},
							de: {
								label: "German",
								title: "Dialogisches Lesen",
								pdfUrl: "/activities/story3/PC/Story_3_PL_G/Story3_PL_1_G.pdf",
							}, 
							it: {
								label: "Italian",
								title: "",
								pdfUrl: "",
							}, 
							ld: {
								label: "Ladisch",
								title: "",
								pdfUrl: "",
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
							pdfUrl: "/activities/story3/PC/Story_3_PL_2_E.pdf",
							title: "Action story",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-fr.opus",
							pdfUrl: "/activities/story3/PC/Story 3_PL_2_F.pdf",
							title: "Histoire à mimer",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story3/PC/Story_3_PL_G/Story3_PL_2_G.pdf",
							title: "Bewegungsgeschichte",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
							pdfUrl: "/activities/story3/PC/Story_3_PL_3_E.pdf",
							title: "Feelings",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story3/PC/Story 3_PL_3_F.pdf",
							title: "Les émotions",
						},
						de: {
							label: "German",
							pdfUrl: "/activities/story3/PC/Story_3_PL_G/Story3_PL_3_G.pdf",
							title: "Gefühle",
						},
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
						}
						},
					},
					{
						id: "activity-3-4",
						type: "worksheet",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story3/PC/Story_3_PL_4_E.pdf",
							title: "What can we see in the sea?",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story3/PC/Story 3_PL_4_F.pdf",
							title: "Qu'est-ce qu'il y a dans la mer",
						},
						de: {
							label: "German",
							pdfUrl: "/activities/story3/PC/Story_3_PL_G/Story3_PL_4_G.pdf",
							title: "Was können wir im Meer sehen?",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
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
						id: "activity-4-1",
						languages: {
							en: {
								label: "English",
								title: "Understand and create stories",
								pdfUrl: "/activities/story4/PC/Story_4_PL_1_E.pdf",
							},
							fr: {
								label: "French",
								title: "Comprendre et créer des histoires",
								pdfUrl: "/activities/story4/PC/Story 4_PL_1_F.pdf",
							},
							de: {
								label: "German",
								title: "Geschichten verstehen und erzählen",
								pdfUrl: "/activities/story4/PC/Story 4_PL_G/Story4_PL_1_G.pdf",
							}, 
							it: {
								label: "Italian",
								title: "",
								pdfUrl: "",
							}, 
							ld: {
								label: "Ladisch",
								title: "",
								pdfUrl: "",
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
							pdfUrl: "/activities/story4/PC/Story_4_PL_1_E.pdf",
							title: "Bon appetit",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story4/PC/Story 4_PL_2_F.pdf",
							title: "Bon appétit",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story4/PC/Story 4_PL_G/Story4_PL_2_G.pdf",
							title: "Guten Appetit!",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
							pdfUrl: "/activities/story4/PC/Story_4_PL_3_E.pdf",
							title: "Move and speak along",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story4/PC/Story 4_PL_3_F.pdf",
							title: "Mime et répète après moi",
						}, 
						de: {
							label: "German",
							pdfUrl: "/activities/story4/PC/Story 4_PL_G/Story4_PL_3_G.pdf",
							title: "Mach mit, sprich mit!",
						},
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
						}
					},
					}
					]
				],
				}, 
				{
				id: "5", // Match the ID from stories.json
				title: "Bobba in the library", // Match title from stories.json
				slug: "", // URL-friendly slug
				description: "",
				sets: [
					[
					{
						id: "activity-5-1",
						languages: {
							de: {
								label: "German",
								title: "Bibliotheken in verschiedenen Sprachen",
								pdfUrl: "/activities/story5/PC/Story 5_PL_G/Story5_PL_1_G.pdf",
							},
							fr: {
								label: "French",
								title: "Tour du monde des bibliothèques",
								pdfUrl: "/activities/story5/PC/Story 5_PL_F/Story5_PL_1_F.pdf",
							}, 
							it: {
								label: "Italian",
								title: "",
								pdfUrl: "",
							}, 
							ld: {
								label: "Ladisch",
								title: "",
								pdfUrl: "",
							}
						},
					},
					{
						id: "activity-5-2",
						description: "",
						languages: {
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story5/PC/Story 5_PL_G/Story5_PL_2_G.pdf",
							title: "Telefonspiel",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-fr.opus",
							pdfUrl: "/activities/story5/PC/Story 5_PL_F/Story5_PL_2_F.pdf",
							title: "Le jeu du téléphone sans fil",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
						}
						},
					},
					{
						id: "activity-5-3",
						type: "worksheet",
						description: "",
						languages: {
						de: {
							label: "German",
							pdfUrl: "/activities/story5/PC/Story 5_PL_G/Story5_PL_3_G.pdf",
							title: "Ratespiel",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story5/PC/Story 5_PL_F/Story5_PL_3_F.pdf",
							title: "Les devinettes",
						},
						 it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
						}
						},
					}
					]
				],
				},{
				id: "6", // Match the ID from stories.json
				title: "The Monster castle", // Match title from stories.json
				slug: "", // URL-friendly slug
				description: "",
				sets: [
					[
					{
						id: "activity-6-1",
						languages: {
							fr: {
								label: "French",
								title: "Laurentia. Liebe Laurentia mein",
								pdfUrl: "/activities/story6/PC/Story 6_PL_1_F.pdf",
							}, 
							it: {
								label: "Italian",
								title: "",
								pdfUrl: "",
							}, 
							ld: {
								label: "Ladisch",
								title: "",
								pdfUrl: "",
							}
						},
					},
					{
						id: "activity-6-2",
						description: "",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-fr.opus",
							pdfUrl: "/activities/story6/PC/Story 6_PL_2_F.pdf",
							title: "Dialogues plurilingues de monstres",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-6-3",
						type: "worksheet",
						description: "",
						languages: {
						fr: {
							label: "French",
							pdfUrl: "/activities/story6/PC/Story 6_PL_3_F.pdf",
							title: "Le jour de la fête plurilingue des monstres",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
						}
						},
					}
					]
				],
				},{
				id: "7", // Match the ID from stories.json
				title: "Celebrating Olivia's birthday", // Match title from stories.json
				slug: "", // URL-friendly slug
				description: "",
				sets: [
					[
					{
						id: "activity-7-1",
						languages: {
							en: {
								label: "English",
								title: "Your last Birthday",
								pdfUrl: "/activities/story7/PC/Story_7_PL_1_E.pdf",
							},
							fr: {
								label: "French",
								title: "Ton dernier anniversaire",
								pdfUrl: "/activities/story7/PC/Story 7_PL_1_F.pdf",
							}, 
							it: {
								label: "Italian",
								title: "",
								pdfUrl: "",
							}, 
							ld: {
								label: "Ladisch",
								title: "",
								pdfUrl: "",
							}
						},
					},
					{
						id: "activity-7-2",
						description: "",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story7/PC/Story_7_PL_2_E.pdf",
							title: "Birthday wishes",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-fr.opus",
							pdfUrl: "/activities/story7/PC/Story 7_PL_2_F.pdf",
							title: "Vœux d’anniversaire",
						},
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
						}
						},
					},
					{
						id: "activity-7-3",
						type: "worksheet",
						description: "",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story7/PC/Story_7_PL_3_E.pdf",
							title: "The Intruder",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story7/PC/Story 7_PL_3_F.pdf",
							title: "L’intrus",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
						}
						},
					}
					]
				],
				},{
				id: "8", // Match the ID from stories.json
				title: "Going home", // Match title from stories.json
				slug: "", // URL-friendly slug
				description: "",
				sets: [
					[
					{
						id: "activity-8-1",
						languages: {
							fr: {
								label: "French",
								title: "Fêtons le départ de Bobba",
								pdfUrl: "/activities/story8/PC/Story 8_PL_1_F.pdf",
							}, 
							it: {
								label: "Italian",
								title: "",
								pdfUrl: "",
							}, 
							ld: {
								label: "Ladisch",
								title: "",
								pdfUrl: "",
							}
						},
					},
					{
						id: "activity-8-2",
						description: "",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-fr.opus",
							pdfUrl: "/activities/story8/PC/Story 8_PL_2_F.pdf",
							title: "L’album de Bobba",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }
						},
					},
					{
						id: "activity-8-3",
						type: "worksheet",
						description: "",
						languages: {
						fr: {
							label: "French",
							pdfUrl: "/activities/story8/PC/Story 8_PL_3_F.pdf",
							title: "Ton mot préféré",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
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
							pdfUrl: "/activities/story1/ELS/Story_1_ELS_1_E.pdf",
							title: "Writing Bobba",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ELS/Story_1_ELS_1_F.pdf",
							title: "Écrire le mot Bobba",
						},
						de: {
								label: "German",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/ELS/Story_1_ELS_1_G.pdf",
								title: "Bobba schreiben",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
							pdfUrl: "/activities/story1/ELS/Story_1_ELS_2_E.pdf",
							title: "Creating symobls",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/ELS/Story_1_ELS_2_F.pdf",
							title: "Créer des symboles",
						},
						de: {
								label: "German",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/ELS/Story_1_ELS_2_G.pdf",
								title: "Symbole erstellen",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-1-3",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story1/ELS/Story_1_ELS_3_E.pdf",
							title: "Symbols and names",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/ELS/Story_1_ELS_3_F.pdf",
							title: "Symboles et noms",
						},
						de: {
								label: "German",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story1/ELS/Story_1_ELS_3_G.pdf",
								title: "Symbol und Name",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
							pdfUrl: "/activities/story2/ELS/Story_2_ELS_1_F.pdf",
							title: "Chasse au trésor par écrit",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story2/ELS/Story_2_ELS_1_G.pdf",
							title: "Schatzsuche mit schriftlichen Hinweisen",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
							pdfUrl: "/activities/story2/ELS/Story_2_ELS_2_F.pdf",
							title: "Tâches pendant la chasse au trésor et décodage",
						}, 
						de: {
							label: "German",
							pdfUrl: "/activities/story2/ELS/Story_2_ELS_2_G.pdf",
							title: "Aufgaben während der Schatzsuche & eine Geheimnachricht entschlüsseln",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
						}
						},
					},
					{
						id: "activity-2-3",
						description: "Learn words related to space in different languages",
						languages: {
						fr: {
							label: "French",
							pdfUrl: "/activities/story2/ELS/Story_2_ELS_3_F.pdf",
							title: "Chasse au trésor à la maison",
						},
						de: {
							label: "German",
							pdfUrl: "/activities/story2/ELS/Story_2_ELS_3_G.pdf",
							title: "Schatzsuche nach schriftlichen Gegenständen zu Hause",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
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
							pdfUrl: "/activities/story3/ELS/Story 3_ELS_1_F-1.pdf",
							title: "Écrire dans le sable à l’intérieur",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
							pdfUrl: "/activities/story3/ELS/Story 3_ELS_2_F.pdf",
							title: "Écrire dans le sable à l’extérieur",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-3-3",
						description: "Learn words related to space in different languages",
						languages: {
						fr: {
							label: "French",
							pdfUrl: "/activities/story3/ELS/Story 3_ELS_3_F.pdf",
							title: "Des mots comme décorations",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
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
							pdfUrl: "/activities/story4/ELS/Story 4_ELS_1_F.pdf",
							title: "Soirée pyjama",
						}, 
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story4/ELS/Story_4_ELS_1_G.pdf",
							title: "Übernachtungsparty – Buchstaben entdecken",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
						},
					}, 
				 }, //ich glaube hier fehlt eine Klammer zu, bin mir aber nicht sicher (Mara)
					{
						id: "activity-4-2",
						description: "Match planet names in different languages",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story4/ELS/Story 4_ELS_2_F.pdf",
							title: "Lumière sur les lettres",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story4/ELS/Story_4_ELS_2_G.pdf",
							title: "Buchstaben mit Seilen, Taschenlampen und reflektierenden Punkten",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-4-3",
						description: "Learn words related to space in different languages",
						languages: {
						fr: {
							label: "French",
							pdfUrl: "/activities/story4/ELS/Story 4_ELS_3_F.pdf",
							title: "Vos histoires du soir préférées",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story4/ELS/Story_4_ELS_3_G.pdf",
							title: "Lieblings-gute-Nacht-Geschichten",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


					
						},
					}
					]
					// Second set with different activities
					
				],
				},
				{
				id: "5", // Match the ID from stories.json
				title: "Bobba in the library", // Match title from stories.json
				slug: "", // URL-friendly slug
				description: "",
				sets: [
					[
					{
						id: "activity-5-1",
						description: "",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ELS/Story 5_ELS_F/Story 5_ELS_1_F.pdf",
							title: "Écrire avec différents matériaux",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ELS/Story 5_ELS_G/Story_5_ELS_1_G.pdf",
							title: "Schreiben mit verschiedenen Materialien",
						},
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


					}, 
				 }, //ich glaube hier fehlt eine Klammer zu, bin mir aber nicht sicher (Mara)
					{
						id: "activity-5-2",
						description: "",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story5/ELS/Story 5_ELS_F/Story 5_ELS_2_F.pdf",
							title: "L’organisation d’une bibliothèque",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ELS/Story 5_ELS_G/Story_5_ELS_2_G.pdf",
							title: "Aufbau einer Bibliothek",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-5-3",
						description: "",
						languages: {
						fr: {
							label: "French",
							pdfUrl: "/activities/story5/ELS/Story 5_ELS_F/Story 5_ELS_3_F.pdf",
							title: "Créer une bibliothèque dans la classe",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ELS/Story 5_ELS_G/Story_5_ELS_3_G.pdf",
							title: "Eine Klassenbibliothek erstellen",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					}
					]
					// Second set with different activities
					
				],
				},
				{
				id: "6", // Match the ID from stories.json
				title: "The Monster castle", // Match title from stories.json
				slug: "", // URL-friendly slug
				description: "",
				sets: [
					[
					{
						id: "activity-6-1",
						description: "",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story6/ELS/Story 6_ELS_1_F.pdf",
							title: "Déchiffrer une invitation",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


					}, 
				 }, //ich glaube hier fehlt eine Klammer zu, bin mir aber nicht sicher (Mara)
					{
						id: "activity-6-2",
						description: "",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story6/ELS/Story 6_ELS_2_F.pdf",
							title: "Écrire une invitation",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-6-3",
						description: "",
						languages: {
						fr: {
							label: "French",
							pdfUrl: "/activities/story6/ELS/Story 6_ELS_3_F.pdf",
							title: "Les mots écrits dans différentes langues",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
						}
						},
					}
					]
					// Second set with different activities
					
				],
				},
				{
				id: "7", // Match the ID from stories.json
				title: "Celebrating Olivia's birthday", // Match title from stories.json
				slug: "", // URL-friendly slug
				description: "",
				sets: [
					[
					{
						id: "activity-7-1",
						description: "",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story7/ELS/Story 7_ELS_1_F.pdf",
							title: "La couronne d’anniversaire",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


					}, 
				 }, //ich glaube hier fehlt eine Klammer zu, bin mir aber nicht sicher (Mara)
					{
						id: "activity-7-2",
						description: "",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story7/ELS/Story 7_ELS_2_F.pdf",
							title: "Vœux d’anniversaire, création de cadeaux d’anniversaire",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-7-3",
						description: "",
						languages: {
						fr: {
							label: "French",
							pdfUrl: "/activities/story7/ELS/Story 7_ELS_3_F.pdf",
							title: "Jeu d’anniversaire : la pêche aux lettres",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
						}
						},
					}
					]
					// Second set with different activities
					
				],
				},
				{
				id: "8", // Match the ID from stories.json
				title: "Going home", // Match title from stories.json
				slug: "", // URL-friendly slug
				description: "",
				sets: [
					[
					{
						id: "activity-8-1",
						description: "",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story8/ELS/Story 8_ELS_1_F.pdf",
							title: "Trouve les lettres",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


					}, 
				 }, //ich glaube hier fehlt eine Klammer zu, bin mir aber nicht sicher (Mara)
					{
						id: "activity-8-2",
						description: "",
						languages: {
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story8/ELS/Story 8_ELS_2_F.pdf",
							title: "ABC : l’alphabet",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-8-3",
						description: "",
						languages: {
						fr: {
							label: "French",
							pdfUrl: "/activities/story8/ELS/Story 8_ELS_3_F.pdf",
							title: "À la recherche des lettres manquantes",
						}, 
						it: {
							label: "Italian",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
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
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_1_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_1_F.pdf",
							title: "Se saluer",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_1_S.pdf",
							title: "POZDRAVI",
						}, 
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_1_G.pdf",
							title: "BEGRÜSSUNGEN",
						}, 
						gr: {
							label: "Greek",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_1_GR.pdf",
							title: "ΧΑΙΡΕΤΙΣΜΟΙ",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_2_E.pdf",
							title: "Meanings of names",
												},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_2_F.pdf",
							title: "Explorer le sens des prénoms",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_2_S.pdf",
							title: "POMENI IMEN",
						}, 
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_2_G.pdf",
							title: "BEDEUTUNGEN VON VORNAMEN",
						}, 
						gr: {
							label: "Greek",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_2_GR.pdf",
							title: "Η ΣΗΜΑΣΙΑ ΤΩΝ ΟΝΟΜΑΤΩΝ",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-1-3",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_3_E.pdf",
							title: "Esperanto",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_3_F.pdf",
							title: "Parler l’espéranto",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_3_S.pdf",
							title: "ESPERANTO",
						}, 
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_3_G.pdf",
							title: "ESPERANTO",
						}, 
						gr: {
							label: "Greek",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_1_ICAU_3_GR.pdf",
							title: "ΕΣΠΕΡΑΝΤΟ",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
							pdfUrl: "/activities/story2/ICAU/Story_2_ICAU_1_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story2/ICAU/Story_2_ICAU_1_F.pdf",
							title: "Partage de saveurs",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story2/ICAU/Story_2_ICAU_1_S.pdf",
							title: "DELIMO SI OKUSE",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
							pdfUrl: "/activities/story2/ICAU/Story_2_ICAU_2_E.pdf",
							title: "Building bridges: Connecting the new with the familiar",
												},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story2/ICAU/Story_2_ICAU_2_F.pdf",
							title: "Un pont entre nous",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story2/ICAU/Story_2_ICAU_2_S.pdf",
							title: "NOST 2: GRADIMO MOSTOVE – POVEZUJEMO NOVO Z ZNANIM",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-2-3",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story2/ICAU/Story_2_ICAU_3_E.pdf",
							title: "Number detectives",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story2/ICAU/Story_2_ICAU_3_F.pdf",
							title: "L’affaire des chiffres",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story2/ICAU/Story_2_ICAU_3_S.pdf",
							title: "ŠTEVLIČNI DETEKTIVI",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
							pdfUrl: "/activities/story3/ICAU/Story_3_ICAU_1_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story3/ICAU/Story_3_ICAU_1_F.pdf",
							title: "Tour du monde des émotions",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story3/ICAU/Story_3_ICAU_1_S.pdf",
							title: "ČUSTVA PO SVETU",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
							pdfUrl: "/activities/story3/ICAU/Story_3_ICAU_2_E.pdf",
							title: "Let's go to the beach",
												},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story3/ICAU/Story_3_ICAU_2_F.pdf",
							title: "Allons à la plage",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story1/ICAU/Story_3_ICAU_2_S.pdf",
							title: "GREMO NA PLAZO",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-3-3",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story3/ICAU/Story_3_ICAU_3_E.pdf",
							title: "Five friends at the beach",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story3/ICAU/Story_1_ICAU_3_F.pdf",
							title: "Cinq amis à la plage",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story3/ICAU/Story_1_ICAU_3_S.pdf",
							title: "PET PRIJATELJEV NA PLAZI",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
						id: "activity-4-1",			
						description: "A fun song about space travel in different languages",
						languages: {
						en: {
							label: "English",
							title: "Food travels",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story4/ICAU/Story_4_ICAU_1_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story4/ICAU/Story 4_ICAU_2_F-1.pdf",
							title: "Voyager grâce à la nourriture",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
							pdfUrl: "/activities/story4/ICAU/Story_4_ICAU_2_E.pdf",
							title: "Play like me, play like you",
												},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/activities/story4/ICAU/Story 4_ICAU_2_F.pdf",
							title: "Jouons comme moi ou comme toi",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-4-3",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/activities/story4/ICAU/Story_4_ICAU_3_E.pdf",
							title: "Games from here and there",
						},
						fr: {
							label: "French",
							pdfUrl: "/activities/story4/ICAU/Story 4_ICAU_3_F.pdf",
							title: "Tour du monde des jeux",
						}, 
						it: {
							label: "Italienisch",
							title: "",
							pdfUrl: "",
						}, 
						ld: {
							label: "Ladisch",
							title: "",
							pdfUrl: "",
						}
						},
					}
					]
				],
				},
				{
				id: "5", // Match the ID from stories.json
				title: "Bobba in the library", // Match title from stories.json
				slug: "", // URL-friendly slug
				description: "",
				sets: [
					[
					{
						id: "activity-5-1",			
						description: "",
						languages: {
						en: {
							label: "English",
							title: "Same name, different letters",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story5/ICAU/Story_5_ICAU_E/Story_5_ICAU_1_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ICAU/Story 5_ICAU_F/Story 5_ICAU_1_F.pdf",
							title: "Un même prénom, différentes lettres",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ICAU/Story 5_ICAU_G/Story5_PL_1_G.pdf",
							title: "BIBLIOTHEKEN IN VERSCHIEDENEN SPRACHEN",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ICAU/Story 5_ICAU_S/Story_5_ICAU_1_S.pdf",
							title: "STO IME, DRUGE ČRKE",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-5-2",			
						description: "",
						languages: {
						en: {
							label: "English",
							title: "How does your book talk?",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story5/ICAU/Story_5_ICAU_E/Story_5_ICAU_2_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ICAU/Story 5_ICAU_F/Story 5_ICAU_2_F.pdf",
							title: "Comment parle ton livre ?",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ICAU/Story 5_ICAU_G/Story5_PL_2_G.pdf",
							title: "TELEFONSPIEL",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ICAU/Story 5_ICAU_S/Story_5_ICAU_2_S.pdf",
							title: "KAKO GOVORI TVOJA KNJIGA?",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					}, {
						id: "activity-5-3",			
						description: "",
						languages: {
						en: {
							label: "English",
							title: "Homes in books, books in homes",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story5/ICAU/Story_5_ICAU_E/Story_5_ICAU_3_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ICAU/Story 5_ICAU_F/Story 5_ICAU_3_F.pdf",
							title: "Les maisons dans les livres, les livres à la maison",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ICAU/Story 5_ICAU_G/Story5_PL_3_G.pdf",
							title: "RATESPIEL",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story5/ICAU/Story 5_ICAU_S/Story_5_ICAU_3_S.pdf",
							title: "DOMOVI V KNJIGAH, KNJIGE V DOMOVIH",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						
						},
					}
					]
				],
				},{
				id: "6", // Match the ID from stories.json
				title: "The Monster castle", // Match title from stories.json
				slug: "", // URL-friendly slug
				description: "",
				sets: [
					[
					{
						id: "activity-6-1",			
						description: "",
						languages: {
						en: {
							label: "English",
							title: "Magical creatures",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story6/ICAU/Story_6_ICAU_1_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story6/ICAU/Story 6_ICAU_1_F.pdf",
							title: "Les créatures magiques",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story6/ICAU/Story_ICAU_1_S.pdf",
							title: "ČAROBNA BITJA",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-6-2",			
						description: "",
						languages: {
						en: {
							label: "English",
							title: "Thank you around the world",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story6/ICAU/Story_6_ICAU_2_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story6/ICAU/Story 6_ICAU_2_F.pdf",
							title: "Tour du monde des mercis",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story6/ICAU/Story_ICAU_2_S.pdf",
							title: "ZAHVALA V JEZIKIH SVETA",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-6-3",			
						description: "",
						languages: {
						en: {
							label: "English",
							title: "Diffrent ways of eating",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story6/ICAU/Story_6_ICAU_3_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story6/ICAU/Story 6_ICAU_3_F.pdf",
							title: "Les coutumes à table",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story6/ICAU/Story_ICAU_3_S.pdf",
							title: "JEMO NA RAZLIČNE NAČINE",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
						},
					},
				},
					]
				],
				},
				{
				id: "7", // Match the ID from stories.json
				title: "Celebrating Olivia's birthday", // Match title from stories.json
				slug: "", // URL-friendly slug
				description: "",
				sets: [
					[
					{
						id: "activity-7-1",			
						description: "",
						languages: {
						en: {
							label: "English",
							title: "One year, many celebrations",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story7/ICAU/Story_7_ICAU_1_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story7/ICAU/Story 7_ICAU_1_F.pdf",
							title: "Tant de célébrations",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story7/ICAU/Story_7_ICAU_1_S.pdf",
							title: "ENO LETO, VELIKO PRAZNOVANJ",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-7-2",			
						description: "",
						languages: {
						en: {
							label: "English",
							title: "Let's sing together: Birthday songs from home",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story7/ICAU/Story_7_ICAU_2_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story7/ICAU/Story 7_ICAU_2_F.pdf",
							title: "Chantons les chansons d’anniversaire",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story7/ICAU/Story_7_ICAU_2_S.pdf",
							title: "ZAPOJMO SKUPAJ: ROJSTNODNEVNE PESMI OD DOMA",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-7-3",			
						description: "",
						languages: {
						en: {
							label: "English",
							title: "Handy, words and wishes",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story7/ICAU/Story_7_ICAU_3_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story7/ICAU/Story 7_ICAU_3_F.pdf",
							title: "Des mains, des mots et des vœux",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story7/ICAU/Story_7_ICAU_3_S.pdf",
							title: "ROKE, BESEDE IN ŽELJE",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					}
					]
				],
				},
				{
				id: "8", // Match the ID from stories.json
				title: "Going home", // Match title from stories.json
				slug: "", // URL-friendly slug
				description: "",
				sets: [
					[
					{
						id: "activity-8-1",			
						description: "",
						languages: {
						en: {
							label: "English",
							title: "Living around the world",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story8/ICAU/Story_8_ICAU_1_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story8/ICAU/Story 8_ICAU_1_F.pdf",
							title: "Tour du monde des lieux de vie",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story8/ICAU/Story_8_ICAU_1_S.pdf",
							title: "ŽIVLJENJE NA RAZLIČNIH KONCIH SVETA",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-8-2",			
						description: "",
						languages: {
						en: {
							label: "English",
							title: "My house, your house",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story8/ICAU/Story_8_ICAU_2_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story8/ICAU/Story 8_ICAU_2_F.pdf",
							title: "Ma maison, ta maison",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story8/ICAU/Story_8_ICAU_2_S.pdf",
							title: "MOJ DOM, TVOJ DOM",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                            }


						},
					},
					{
						id: "activity-8-3",			
						description: "",
						languages: {
						en: {
							label: "English",
							title: "Goodbye",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/activities/story8/ICAU/Story_8_ICAU_3_E.pdf",
						},
						fr: {
							label: "French",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story8/ICAU/Story 8_ICAU_3_F.pdf",
							title: "Au revoir",
						},
						sv: {
							label: "Slovenian",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/activities/story8/ICAU/Story_8_ICAU_3_S.pdf",
							title: "NASVIDENJE",
						}, 
						it: {
                            label: "Italian",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
                        },
                        ld: {
                            label: "Ladisch",
                            audioUrl: "",
                            pdfUrl: "",
                            title: "",
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
								pdfUrl: "/activities/story1/LA/Story 1_LA_1_F.pdf",
								title: "Comparer les noms",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_1_LA_1_S.pdf",
								title: "PRIMERJAJMO IMENA",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
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
								pdfUrl: "/activities/story1/LA/Story 1_LA_2_F.pdf",
								title: "Comment t’appelles-tu ?",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_1_LA_2_S.pdf",
								title: "KAKO TI JE IME?",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",	
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
								pdfUrl: "/activities/story1/LA/Story 1_LA_3_F.pdf",
								title: "Nommer la planète de Bobba",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story1/LA/Story_1_LA_3_S.pdf",
								title: "POIMENUJ BOBBOV PLANET",
							}, 
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
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
								pdfUrl: "/activities/story2/LA/Story_2_LA_1_E.pdf",
								title: "Initial sound hunt",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story2/LA/Story 2_LA_1_F.pdf",
								title: "À la recherche du son initial",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story2/LA/Story_2_LA_1_S.pdf",
								title: "LOV NA ZAČETNI GLAS",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
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
								pdfUrl: "/activities/story2/LA/Story_2_LA_2_E.pdf",
								title: "Hello around the world",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus",
								pdfUrl: "/activities/story2/LA/Story 2_LA_2_F.pdf",
								title: "Tour du monde des bonjours",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story2/LA/Story_2_LA_2_S.pdf",
								title: "ŽIVJO! V JEZIKIH SVETA",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
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
								pdfUrl: "/activities/story2/LA/Story_2_LA_3_E.pdf",
								title: "Which language is it?",
							},
							fr: {
								label: "French",
								pdfUrl: "/activities/story2/LA/Story 2_LA_3_F.pdf",
								title: "Quelle langue c’est ?",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story2/LA/Story_2_LA_3_S.pdf",
								title: " KATERI JEZIK JE TO?",
							}, 
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
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
								pdfUrl: "/activities/story3/LA/Story_3_LA_1_E.pdf",
								title: "Dididi song",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story3/LA/Story 3_LA_1_F.pdf",
								title: "La chanson Didi",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story3/LA/Story_3_LA_1_S.pdf",
								title: "PESMICA DIDIDI",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
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
								pdfUrl: "/activities/story3/LA/Story_3_LA_2_E.pdf",
								title: "Rhyme memory",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus",
								pdfUrl: "/activities/story3/LA/Story 3_LA_2_F.pdf",
								title: "Jeu de mémoire : les rimes",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story3/LA/Story_3_LA_2_S.pdf",
								title: "SPOMIN Z RIMAMI",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
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
								pdfUrl: "/activities/story3/LA/Story_3_LA_3_E.pdf",
								title: "Sounds of different languages",
							},
							fr: {
								label: "French",
								pdfUrl: "/activities/story3/LA/Story 3_LA_3_F.pdf",
								title: "Les sons des différentes langues",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story3/LA/Story_3_LA_3_S.pdf",
								title: "ZVEN RAZLIČNIH JEZIKOV",
							}, 
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
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
								pdfUrl: "/activities/story4/LA/Story_4_LA_1_E.pdf",
								title: "The biggest sandwich in the world",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story4/LA/Story 4_LA_1_F.pdf",
								title: "Le plus grand sandwich au monde",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story4/LA/Story_4_LA_1_S.pdf",
								title: "NAJVEČJI SENDVIČ NA SVETU",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
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
								pdfUrl: "/activities/story4/LA/Story_4_LA_2_E.pdf",
								title: "I spy with my little eye",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus",
								pdfUrl: "/activities/story4/LA/Story_4_LA_2_F.pdf",
								title: "Mon petit œil voit",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story4/LA/Story_4_LA_2_S.pdf",
								title: "VIDIM NEKAJ, KAR SE ZAČNE NA",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",	
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
								pdfUrl: "/activities/story4/LA/Story_4_LA_3_E.pdf",
								title: "What's this story about?",
							},
							fr: {
								label: "French",
								pdfUrl: "/activities/story4/LA/Story_4_LA_3_F.pdf",
								title: "Que raconte cette histoire ?",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story4/LA/Story_4_LA_3_S.pdf",
								title: "O ČEM GOVORI TA ZGODBA?",
							}, 
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
						},
					}
				],
			],
		},{
			id: "5", // Match the ID from stories.json
			title: "Bobba in the library",
			slug: "", // URL-friendly slug
			description: "",
			sets: [
				[
					{
						id: "activity-5-1",
						description: "",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story5/LA/Story 5_LA_E/Story_5_LA_1_E.pdf",
								title: " Initial sound search",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story5/LA/Story 5_LA_F/Story 5_LA_1_F.pdf",
								title: "La recherche du son initial continue",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story5/LA/Story 5_LA_S/Story_5_LA_1_S.pdf",
								title: "ISKANJE ZAČETNEGA GLASU",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
								}
	
	
							}
						},
					{
						id: "activity-5-2",
						description: "",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story5/LA/Story 5_LA_E/Story_5_LA_2_E.pdf",
								title: "Which fairy tale is it?",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story5/LA/Story 5_LA_F/Story 5_LA_2_F.pdf",
								title: "De quel conte de fées s’agit-il ?",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story5/LA/Story 5_LA_S/Story_5_LA_2_S.pdf",
								title: "KATERA PRAVLJICA JE TO?",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
								}
	
	
							}
						},
					{
						id: "activity-5-3",
						title: "Space Vocabulary Worksheet",
						description: "Learn words related to space in different languages",
						languages: {
							en: {
								label: "English",
								pdfUrl: "/activities/story5/LA/Story 5_LA_E/Story_5_LA_3_E.pdf",
								title: "Jazz chant",
							},
							fr: {
								label: "French",
								pdfUrl: "/activities/story5/LA/Story 5_LA_F/Story 5_LA_3_F.pdf",
								title: "Le chant Jazz",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story5/LA/Story 5_LA_S/Story_5_LA_3_S.pdf",
								title: "JAZZ CHANT",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
								}
	
	
						},
					}
				],
			],
		},{
			id: "6", // Match the ID from stories.json
			title: "The Monster castle",
			slug: "", // URL-friendly slug
			description: "",
			sets: [
				[
					{
						id: "activity-6-1",
						description: "",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story6/LA/Story_6_LA_1_E.pdf",
								title: "Language dance",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story6/LA/Story 6_LA_1_F.pdf",
								title: "La danse des langues",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story6/LA/Story_6_LA_1_S.pdf",
								title: "JEZIKOVNI PLES",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
								},	
						},
					},
					{
						id: "activity-6-2",
						description: "",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus",
								pdfUrl: "/activities/story6/LA/Story_6_LA_2_E.pdf",
								title: "Who says quack quack?",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus",
								pdfUrl: "/activities/story6/LA/Story 6_LA_2_F.pdf",
								title: "Qui fait coin-coin ?",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story6/LA/Story_6_LA_2_S.pdf",
								title: "KDO REČE KVAK KVAK?",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
								},	
						},
					},
					{
						id: "activity-6-3",
						title: "Worksheet",
						description: "",
						languages: {
							en: {
								label: "English",
								pdfUrl: "/activities/story6/LA/Story_6_LA_3_E.pdf",
								title: "Find the final sound",
							},
							fr: {
								label: "French",
								pdfUrl: "/activities/story6/LA/Story 6_LA_3_F.pdf",
								title: "À la recherche du son final",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story6/LA/Story_6_LA_3_S.pdf",
								title: "POIŠČI KONČNI GLAS",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
								}
	
	
						},
					}
				],
			],
		},{
			id: "7", // Match the ID from stories.json
			title: "Celebrating Olivia's birthday",
			slug: "", // URL-friendly slug
			description: "",
			sets: [
				[
					{
						id: "activity-7-1",
						description: "",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story7/LA/Story_7_LA_1_E.pdf",
								title: "Guess the language",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story7/LA/Story 7_LA_1_F.pdf",
								title: "Devine la langue",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story7/LA/Story_7_LA_1_S.pdf",
								title: "UGANI JEZIK",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
								},	
						},
					},
					{
						id: "activity-7-2",
						description: "",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus",
								pdfUrl: "/activities/story7/LA/Story_7_LA_2_E.pdf",
								title: "Which holiday is it??",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus",
								pdfUrl: "/activities/story7/LA/Story 7_LA_2_F.pdf",
								title: "De quelle fête s’agit-il ?",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story7/LA/Story_7_LA_2_S.pdf",
								title: "UGANI PRAZNIK",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
								},	
						},
					},
					{
						id: "activity-7-3",
						title: "Worksheet",
						description: "",
						languages: {
							en: {
								label: "English",
								pdfUrl: "/activities/story7/LA/Story_7_LA_3_E.pdf",
								title: "Find the rhyme",
							},
							fr: {
								label: "French",
								pdfUrl: "/activities/story7/LA/Story 7_LA_3_F.pdf",
								title: "Trouve la rime",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story7/LA/Story_7_LA_3_S.pdf",
								title: "NAJDI RIMO",
							}, 
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
								},	
						},
					}
				],
			],
		},{
			id: "8", // Match the ID from stories.json
			title: "Going home",
			slug: "", // URL-friendly slug
			description: "",
			sets: [
				[
					{
						id: "activity-8-1",
						description: "",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus", // Use your test audio
								pdfUrl: "/activities/story8/LA/Story_8_LA_1_E.pdf",
								title: "Goodbye around the world",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story8/LA/Story 8_LA_1_F.pdf",
								title: "Tour du monde des au revoir",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story8/LA/Story_8_LA_1_S.pdf",
								title: "POSLAVLJANJE V JEZIKIH SVETA",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
								},	
						},
					},
					{
						id: "activity-8-2",
						description: "Match planet names in different languages",
						languages: {
							en: {
								label: "English",
								audioUrl: "/audio/test-en.opus",
								pdfUrl: "/activities/story8/LA/Story_8_LA_2_E.pdf",
								title: "Jazz chant",
							},
							fr: {
								label: "French",
								audioUrl: "/audio/test-de.opus",
								pdfUrl: "/activities/story8/LA/Story 8_LA_2_F.pdf",
								title: "Le chant Jazz 2",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story8/LA/Story_8_LA_2_S.pdf",
								title: "JAZZ CHANT",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},	
						},
					},
					{
						id: "activity-8-3",
						title: "Worksheet",
						description: "",
						languages: {
							en: {
								label: "English",
								pdfUrl: "/activities/story8/LA/Story_8_LA_3_E.pdf",
								title: "Find the final sound",
							},
							fr: {
								label: "French",
								pdfUrl: "/activities/story8/LA/Story 8_LA_3_F.pdf",
								title: "À la recherche du son final 2",
							},
							sv: {
								label: "Slovenian",
								audioUrl: "/audio/test-de.opus", // Use your test audio
								pdfUrl: "/activities/story8/LA/Story_8_LA_3_S.pdf",
								title: "NAJDI KONČI GLAS",
							},
							it: {
								label: "Italian",
								audioUrl: "",
								pdfUrl: "",
								title: "",
							},
							ld: {
								label: "Ladisch",
								audioUrl: "",
								pdfUrl: "",
								title: "",
								}
	
	
						},
					}
				],
			],
		},
	],
	},
};

export const GUIDES: Record<GuideKey, Guide> = {
	dialogic: {
		id: "dialogic-reading-guide",
		translations: {
			en: {
				url: "/learning-material/dialogic-reading-guide/Dialogic reading guide_E.pdf"
			},
			fr: {
				url: "/learning-material/dialogic-reading-guide/Dialogic reading guide_F.pdf"
			},
			sv: {
				url: "/learning-material/dialogic-reading-guide/Dialogic reading guide_S.pdf"
			},
			gr: {
				url: "/learning-material/dialogic-reading-guide/Dialogic reading guide_GR.pdf"
			}
		},
	},
	"story-1-reading": {
        id: "story-1-reading-guide",
        translations: {
            en: {
                url: "/learning-material/story-1/reading-guide/Story 1_Story's reading guide_E.pdf"
            },
            de: {
                url: "/learning-material/story-1/reading-guide/Story 1_Story's reading guide_G.pdf"
            },
            fr: {
                url: "/learning-material/story-1/reading-guide/Story 1_Story's reading guide_F.pdf"
            },
            sv: {
                url: "/learning-material/story-1/reading-guide/Story 1_Story's reading guide_S.pdf"
            },
			gr: {
				url: "/learning-material/story-1/reading-guide/Story 1_Story's reading guide_GR.pdf"}
        }
    },
    "story-2-reading": {
        id: "story-2-reading-guide",
        translations: {
            en: {
                url: "/learning-material/story-2/reading-guide/Story 2_Guide de lecture_E.pdf"
            },
        
            fr: {
                url: "/learning-material/story-2/reading-guide/Story 2_Guide de lecture_F.pdf"
            },
        }
    },
    "story-3-reading": {
        id: "story-3-reading-guide",
        translations: {
            en: {
                url: "/learning-material/story-3/reading-guide/Story 3_Story's reading guide_E.pdf"
            },
            de: {
                url: "/learning-material/story-3/reading-guide/Story 3_Story's reading guide_G.pdf"
            },
            fr: {
                url: "/learning-material/story-3/reading-guide/Story 3_Guide de lecture_F.pdf"
            },
            sv: {
                url: "/learning-material/story-3/reading-guide/Story 3_Story's reading guide_S.pdf"
            }
        }
    },
    "story-4-reading": {
        id: "story-4-reading-guide",
        translations: {
            en: {
                url: "/learning-material/story-4/reading-guide/Story 4_Story's reading guide_E.pdf"
            },
            de: {
                url: "/learning-material/story-4/reading-guide/Story 4_Story's reading guide_G.pdf"
            },
            fr: {
                url: "/learning-material/story-4/reading-guide/Story 4_Story's reading guide_F.pdf"
            },
            sv: {
                url: "/learning-material/story-4/reading-guide/Story 4_Story's reading guide_S.pdf"
            }
        }
    },
    "story-5-reading": {
        id: "story-5-reading-guide",
        translations: {
            en: {
                url: "/learning-material/story-5/reading-guide/Story 5_Story's reading guide_E.pdf"
            },
            de: {
                url: "/learning-material/story-5/reading-guide/Story 5_Story's reading guide_G.pdf"
            },
            fr: {
                url: "/learning-material/story-5/reading-guide/Story 5_Story's reading guide_F.pdf"
            },
            sv: {
                url: "/learning-material/story-5/reading-guide/Story 5_Story's reading guide_S.pdf"
            }
        }
    },
    "story-6-reading": {
        id: "story-6-reading-guide",
        translations: {
            en: {
                url: "/learning-material/story-6/reading-guide/Story 6_Story's reading guide_E.pdf"
            },
            de: {
                url: "/learning-material/story-6/reading-guide/Story 6_Story's reading guide_G.pdf"
            },
            fr: {
                url: "/learning-material/story-6/reading-guide/Story 6_Story's reading guide_F.pdf"
            },
            sv: {
                url: "/learning-material/story-6/reading-guide/Story 6_Story's reading guide_S.pdf"
            }
        }
    },
    "story-7-reading": {
        id: "story-7-reading-guide",
        translations: {
            en: {
                url: "/learning-material/story-7/reading-guide/Story 7_Story's reading guide_E.pdf"
            },
            de: {
                url: "/learning-material/story-7/reading-guide/Story 7_Story's reading guide_G.pdf"
            },
            fr: {
                url: "/learning-material/story-7/reading-guide/Story 7_Story's reading guide_F.pdf"
            },
            sv: {
                url: "/learning-material/story-7/reading-guide/Story 7_Story's reading guide_S.pdf"
            }
        }
    },
    "story-8-reading": {
        id: "story-8-reading-guide",
        translations: {
            en: {
                url: "/learning-material/story-8/reading-guide/Story 8_Story's reading guide_E.pdf"
            },
            de: {
                url: "/learning-material/story-8/reading-guide/Story 8_Story's reading guide_G.pdf"
            },
            fr: {
                url: "/learning-material/story-8/reading-guide/Story 8_Story's reading guide_F.pdf"
            },
            sv: {
                url: "/learning-material/story-8/reading-guide/Story 8_Story's reading guide_S.pdf"
            }
        }
    }
};

// Helper function to get story reading guide by story ID
export const getStoryReadingGuide = (storyId: string, languageId: LanguageGuide["id"] = "en"): { url: string } | null => {
    const guideKey = `story-${storyId}-reading` as GuideKey;
    const guide = GUIDES[guideKey];
    
    if (!guide || !guide.translations) return null;
    
    // Try requested language first, then fallback to English
    return guide.translations[languageId] || guide.translations.en || null;
};

// Helper function to check if a story has a reading guide
export const hasStoryReadingGuide = (storyId: string, languageId?: LanguageGuide["id"]): boolean => {
    const guideKey = `story-${storyId}-reading` as GuideKey;
    const guide = GUIDES[guideKey];
    
    if (!guide || !guide.translations) return false;
    
    if (languageId) {
        return !!guide.translations[languageId];
    }
    
    return Object.keys(guide.translations).length > 0;
};
