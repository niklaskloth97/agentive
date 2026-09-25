"use client";

import { useState } from "react";

const posterPdfs = [
  {
    title: "Bobba Creation",
    url: "/blog/posters/Bobba_Creation_AGENTIVE_Poster_260907.pdf",
  },
  {
    title: "Platform Development",
    url: "/blog/posters/Agentive%20poster-UM.pdf",
  },
  {
    title: "Activities",
    url: "/blog/posters/AGENTIVE_activities%20poster.pdf",
  },
  {
    title: "CPD Courses & Workshops",
    url: "/blog/posters/AGENTIVE_CPD_Trainings_Workshops_final.pdf",
  },
  {
    title: "Interviews",
    url: "/blog/posters/AGENTIVE_interviews%20poster.pdf",
  },
  {
    title: "Survey",
    url: "/blog/posters/AGENTIVE_survey.pdf",
  },
  {
    title: "Stakeholders",
    url: "/blog/posters/AGENTIVE_Stakeholders_Poster_final.pdf",
  },
  {
    title: "Multiplier Events",
    url: "/blog/posters/AGENTVE_Multiplier_LU_IT_SL_GR_CH.pdf",
  },
];

export default function PostersBlog() {
  const [selectedPosterIndex, setSelectedPosterIndex] = useState(0);
  const selectedPoster = posterPdfs[selectedPosterIndex];

  return (
    <div className="container mx-auto max-w-5xl px-8 py-6">
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-extrabold leading-tight sm:text-4xl">
          AGENTIVE Posters: From Creation to Multiplier Event
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore the AGENTIVE project through these posters, presented in chronological order.
        </p>
      </header>

      <article>
        <nav aria-label="Poster selection" className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {posterPdfs.map((poster, index) => {
            const isSelected = index === selectedPosterIndex;

            return (
              <button
                key={poster.url}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedPosterIndex(index)}
                className={`min-h-10 rounded-lg border-2 px-4 py-3 text-left text-base font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-green-300 ${
                  isSelected
                    ? "border-green-700 bg-green-700 text-white shadow-lg"
                    : "border-gray-300 bg-gray-100 text-gray-900 hover:border-green-600 hover:bg-green-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-green-400 dark:hover:bg-gray-700"
                }`}
              >
                <span className="mr-2 text-sm font-normal opacity-75">{index + 1}</span>
                {poster.title}
              </button>
            );
          })}
        </nav>

        <section aria-live="polite">
          <h2 className="mb-4 text-2xl font-bold">{selectedPoster.title}</h2>
          <embed
            src={selectedPoster.url}
            type="application/pdf"
            width="100%"
            height="1360"
            title={selectedPoster.title}
            className="rounded-md border border-gray-200"
          />
          

        </section>
      </article>
    </div>
  );
}
