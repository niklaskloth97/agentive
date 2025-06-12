import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { LingoProvider, loadDictionary } from "lingo.dev/react/rsc";
//import { AppSidebar } from "@/app/dashboard/app-sidebar";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<LingoProvider
			loadDictionary={async (locale) => {
				console.log("Loading dictionary for locale:", locale);
				const dict = await loadDictionary(locale);
				console.log("Dictionary loaded:", dict);

				return dict;
			}}
		>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased relative flex flex-col min-h-screen`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<NavBar />
						<main className="flex-grow overflow-y-auto">
							<div className="mx-auto pr-4">{children}</div>
						</main>
						<Footer />
					</ThemeProvider>
				</body>
			</html>
		</LingoProvider>
	);
}
