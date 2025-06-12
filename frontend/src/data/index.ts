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
	description: string;
	sets: Array<Array<Activity>>;
};

type Activity = {
	id: string;
	type: "song" | "game" | "worksheet";
	title: string;
	description: string;
	languages: Partial<
		Record<
			Language["id"],
			{
				label: string;
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
				secondary: "#dc2f02",
				text: "white",
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
	};

export const ACTIVITY_GROUPS: Record<
	ActivityGroupKey,
	Omit<ActivityGroup, "id">
> = {
	PC: {
		stories: [
			{
				id: "monster-story",
				title: "Monster at the Hairdresser",
				slug: "a-monster-story",
				description: "Sound patterns and language comparisons",
				sets: [
					[
						{
							id: "1",
							type: "song",
							title: "Monster Rhyming Song",
							description:
								"A catchy song to help identify similar sounds across languages",
							languages: {
								en: {
									label: "English",
									audioUrl: "/audio/test-en.opus",
									pdfUrl:
										"/learning-material/monster-story/monster-song-en.pdf",
								},
								de: {
									label: "German",
									audioUrl: "/audio/test-de.opus",
									pdfUrl:
										"/learning-material/monster-story/monster-song-de.pdf",
								},
								it: {
									label: "Italian",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl:
										"/learning-material/monster-story/monster-song-it.pdf",
								},
								fr: {
									label: "French",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl:
										"/learning-material/monster-story/monster-song-fr.pdf",
								},
								sv: {
									label: "Slovene",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl:
										"/learning-material/monster-story/monster-song-sv.pdf",
								},
								lux: {
									label: "Luxembourgish",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl:
										"/learning-material/monster-story/monster-song-lux.pdf",
								},
								gr: {
									label: "Greek",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl:
										"/learning-material/monster-story/monster-song-gr.pdf",
								},
							},
						},
						{
							id: "monster-game",
							type: "game",
							title: "Sound Matching Game",
							description:
								"Interactive game to match similar sounds in different languages",
							languages: {
								en: {
									label: "English",
									audioUrl: "/audio/test-en.opus",
									pdfUrl: "/learning-material/monster-story/sound-game-en.pdf",
								},
								de: {
									label: "German",
									audioUrl: "/audio/test-de.opus",
									pdfUrl: "/learning-material/monster-story/sound-game-de.pdf",
								},
								it: {
									label: "Italian",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl: "/learning-material/monster-story/sound-game-it.pdf",
								},
								fr: {
									label: "French",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl: "/learning-material/monster-story/sound-game-fr.pdf",
								},
							},
						},
						{
							id: "monster-worksheet",
							type: "worksheet",
							title: "Word Patterns Worksheet",
							description:
								"Printable worksheet for recognizing patterns across languages",
							languages: {
								en: {
									label: "English",
									pdfUrl:
										"/learning-material/monster-story/word-patterns-en.pdf",
								},
								de: {
									label: "German",
									pdfUrl:
										"/learning-material/monster-story/word-patterns-de.pdf",
								},
								it: {
									label: "Italian",
									pdfUrl:
										"/learning-material/monster-story/word-patterns-it.pdf",
								},
							},
						},
					],
					[
						{
							id: "1",
							type: "song",
							title: "Monster Rhyming Song",
							description:
								"A catchy song to help identify similar sounds across languages",
							languages: {
								en: {
									label: "English",
									audioUrl: "/audio/test-en.opus",
									pdfUrl:
										"/learning-material/monster-story/monster-song-en.pdf",
								},
								de: {
									label: "German",
									audioUrl: "/audio/test-de.opus",
									pdfUrl:
										"/learning-material/monster-story/monster-song-de.pdf",
								},
								it: {
									label: "Italian",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl:
										"/learning-material/monster-story/monster-song-it.pdf",
								},
								fr: {
									label: "French",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl:
										"/learning-material/monster-story/monster-song-fr.pdf",
								},
								sv: {
									label: "Slovene",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl:
										"/learning-material/monster-story/monster-song-sv.pdf",
								},
								lux: {
									label: "Luxembourgish",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl:
										"/learning-material/monster-story/monster-song-lux.pdf",
								},
								gr: {
									label: "Greek",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl:
										"/learning-material/monster-story/monster-song-gr.pdf",
								},
							},
						},
						{
							id: "monster-game",
							type: "game",
							title: "Sound Matching Game",
							description:
								"Interactive game to match similar sounds in different languages",
							languages: {
								en: {
									label: "English",
									audioUrl: "/audio/test-en.opus",
									pdfUrl: "/learning-material/monster-story/sound-game-en.pdf",
								},
								de: {
									label: "German",
									audioUrl: "/audio/test-de.opus",
									pdfUrl: "/learning-material/monster-story/sound-game-de.pdf",
								},
								it: {
									label: "Italian",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl: "/learning-material/monster-story/sound-game-it.pdf",
								},
								fr: {
									label: "French",
									audioUrl: "/audio/pirate-story-es.mp3",
									pdfUrl: "/learning-material/monster-story/sound-game-fr.pdf",
								},
							},
						},
						{
							id: "monster-worksheet",
							type: "worksheet",
							title: "Word Patterns Worksheet",
							description:
								"Printable worksheet for recognizing patterns across languages",
							languages: {
								en: {
									label: "English",
									pdfUrl:
										"/learning-material/monster-story/word-patterns-en.pdf",
								},
								de: {
									label: "German",
									pdfUrl:
										"/learning-material/monster-story/word-patterns-de.pdf",
								},
								it: {
									label: "Italian",
									pdfUrl:
										"/learning-material/monster-story/word-patterns-it.pdf",
								},
							},
						},
					],
				],
			},
			{
				id: "1", // Match the ID from stories.json
				title: "Bobba's first trip to Earth", // Match title from stories.json
				slug: "bobbas-first-trip", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-1-1",
						type: "song",
						title: "Bobba's Space Song",
						description: "A fun song about space travel in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/learning-material/story-1/space-song-en.pdf",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/learning-material/story-1/space-song-de.pdf",
						}
						},
					},
					{
						id: "activity-1-2",
						type: "game",
						title: "Planet Matching Game",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/learning-material/story-1/planet-game-en.pdf",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/learning-material/story-1/planet-game-de.pdf",
						}
						},
					},
					{
						id: "activity-1-3",
						type: "worksheet",
						title: "Space Vocabulary Worksheet",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/learning-material/story-1/space-vocab-en.pdf",
						},
						de: {
							label: "German",
							pdfUrl: "/learning-material/story-1/space-vocab-de.pdf",
						}
						},
					}
					],
					// Second set with different activities
					[
					{
						id: "activity-1-4",
						type: "song",
						title: "Alien Greeting Song",
						description: "Learn how to say hello like Bobba",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/learning-material/story-1/greeting-song-en.pdf",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/learning-material/story-1/greeting-song-de.pdf",
						}
						},
					},
					{
						id: "activity-1-5",
						type: "worksheet",
						title: "Earth Adventures Worksheet",
						description: "Activities about Bobba's adventures on Earth",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/learning-material/story-1/earth-adventures-en.pdf",
						},
						de: {
							label: "German",
							pdfUrl: "/learning-material/story-1/earth-adventures-de.pdf",
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
						type: "song",
						title: "Bobba's Space Song",
						description: "A fun song about space travel in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/learning-material/story-1/space-song-en.pdf",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/learning-material/story-1/space-song-de.pdf",
						}
						},
					},
					{
						id: "activity-1-2",
						type: "game",
						title: "Planet Matching Game",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/learning-material/story-1/planet-game-en.pdf",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/learning-material/story-1/planet-game-de.pdf",
						}
						},
					},
					{
						id: "activity-1-3",
						type: "worksheet",
						title: "Space Vocabulary Worksheet",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/learning-material/story-1/space-vocab-en.pdf",
						},
						de: {
							label: "German",
							pdfUrl: "/learning-material/story-1/space-vocab-de.pdf",
						}
						},
					}
					],
					// Second set with different activities
					[
					{
						id: "activity-1-4",
						type: "song",
						title: "Alien Greeting Song",
						description: "Learn how to say hello like Bobba",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/learning-material/story-1/greeting-song-en.pdf",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/learning-material/story-1/greeting-song-de.pdf",
						}
						},
					},
					{
						id: "activity-1-5",
						type: "worksheet",
						title: "Earth Adventures Worksheet",
						description: "Activities about Bobba's adventures on Earth",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/learning-material/story-1/earth-adventures-en.pdf",
						},
						de: {
							label: "German",
							pdfUrl: "/learning-material/story-1/earth-adventures-de.pdf",
						}
						},
					}
					]
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
						type: "song",
						title: "Bobba's Space Song",
						description: "A fun song about space travel in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/learning-material/story-1/space-song-en.pdf",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/learning-material/story-1/space-song-de.pdf",
						}
						},
					},
					{
						id: "activity-1-2",
						type: "game",
						title: "Planet Matching Game",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/learning-material/story-1/planet-game-en.pdf",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/learning-material/story-1/planet-game-de.pdf",
						}
						},
					},
					{
						id: "activity-1-3",
						type: "worksheet",
						title: "Space Vocabulary Worksheet",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/learning-material/story-1/space-vocab-en.pdf",
						},
						de: {
							label: "German",
							pdfUrl: "/learning-material/story-1/space-vocab-de.pdf",
						}
						},
					}
					],
					// Second set with different activities
					[
					{
						id: "activity-1-4",
						type: "song",
						title: "Alien Greeting Song",
						description: "Learn how to say hello like Bobba",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/learning-material/story-1/greeting-song-en.pdf",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/learning-material/story-1/greeting-song-de.pdf",
						}
						},
					},
					{
						id: "activity-1-5",
						type: "worksheet",
						title: "Earth Adventures Worksheet",
						description: "Activities about Bobba's adventures on Earth",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/learning-material/story-1/earth-adventures-en.pdf",
						},
						de: {
							label: "German",
							pdfUrl: "/learning-material/story-1/earth-adventures-de.pdf",
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
				title: "Bobba's first trip to Earth", // Match title from stories.json
				slug: "bobbas-first-trip", // URL-friendly slug
				description: "Follow Bobba the alien as he discovers Earth for the first time.",
				sets: [
					[
					{
						id: "activity-1-1",
						type: "song",
						title: "Bobba's Space Song",
						description: "A fun song about space travel in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus", // Use your test audio
							pdfUrl: "/learning-material/story-1/space-song-en.pdf",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus", // Use your test audio
							pdfUrl: "/learning-material/story-1/space-song-de.pdf",
						}
						},
					},
					{
						id: "activity-1-2",
						type: "game",
						title: "Planet Matching Game",
						description: "Match planet names in different languages",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/learning-material/story-1/planet-game-en.pdf",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/learning-material/story-1/planet-game-de.pdf",
						}
						},
					},
					{
						id: "activity-1-3",
						type: "worksheet",
						title: "Space Vocabulary Worksheet",
						description: "Learn words related to space in different languages",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/learning-material/story-1/space-vocab-en.pdf",
						},
						de: {
							label: "German",
							pdfUrl: "/learning-material/story-1/space-vocab-de.pdf",
						}
						},
					}
					],
					// Second set with different activities
					[
					{
						id: "activity-1-4",
						type: "song",
						title: "Alien Greeting Song",
						description: "Learn how to say hello like Bobba",
						languages: {
						en: {
							label: "English",
							audioUrl: "/audio/test-en.opus",
							pdfUrl: "/learning-material/story-1/greeting-song-en.pdf",
						},
						de: {
							label: "German",
							audioUrl: "/audio/test-de.opus",
							pdfUrl: "/learning-material/story-1/greeting-song-de.pdf",
						}
						},
					},
					{
						id: "activity-1-5",
						type: "worksheet",
						title: "Earth Adventures Worksheet",
						description: "Activities about Bobba's adventures on Earth",
						languages: {
						en: {
							label: "English",
							pdfUrl: "/learning-material/story-1/earth-adventures-en.pdf",
						},
						de: {
							label: "German",
							pdfUrl: "/learning-material/story-1/earth-adventures-de.pdf",
						}
						},
					}
					]
				],
				}],
	},
};
