import type { NextConfig } from "next";
import lingoCompiler from "lingo.dev/compiler";

const nextConfig: NextConfig = {
	/* config options here */
};

const withLingo = lingoCompiler.next({
	debug: process.env.NODE_ENV === "development",
	sourceLocale: "en",
	// Deutsch, Griechisch, Luxemburgisch, Albanisch, Slowenisch, Türkisch, Ukraninisch, Polnisch, Italienisch
	targetLocales: ["de", "el", "lb", "sq", "sl", "tr", "uk", "pl", "it"],
	models: {
		"*:*": "groq:mistral-saba-24b",
	},
	rsc: true,
})(nextConfig);

export default withLingo;
