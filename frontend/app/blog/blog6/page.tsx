import Image from "next/image";

export default function About() {
  const translations = [
    { language: "Albanian", translator: "Valmire Ymeri" },
    { language: "French", translator: "Carole Dording, Jeanne\n" +
            "Letsch, Angélique Quintus\n" +
            "(UNILU)" },
    { language: "German-Long", translator: "Christina vom Brocke\n" +
            "(PHGR)" },
    { language: "German", translator: "Christina vom Brocke\n" +
            "(PHGR), Marjan Asgari\n" +
            "(UNIBZ), Nancy Morys\n" +
            "(UNILU)" },
      { language: "Greek", translator: "Korina Defteraiou, Stefania\n" +
              "Oikonomou (W2L)" },
      { language: "Hungarian", translator: "Beti Karakatič, \n" +
              "Annamária Gróg" },
      { language: "Italian", translator: "Eleonora Conci,\n" +
              "Francesca Cangemi\n" +
              "(PHGR)" },
      { language: "Ladin", translator: "Sofia Stuflesser" },
      { language: "Russian", translator: "Alisa Saveleva " },
      { language: "Luxembourgish", translator: "Carole Dording, Jeanne\n" +
              "Letsch, Angélique Quintus\n" +
              "(UNILU)" },
      { language: "Polish", translator: "Magdalena Gösken" },
      { language: "Portuguese", translator: "Sofia Alvares (UNILU)" },
      { language: "Rumantsch Grischun", translator: "Irina Lutz (PHGR)" },
      { language: "Slovenian", translator: "Anja Pirih (UP),\n" +
              "Silva Bratož (UP),\n" +
              "Mojca Žefran (UP)" },
      { language: "Sursilvan", translator: "Irina Lutz (PHGR)" },
      { language: "Turkish", translator: "Banu Can Schürmann" },
      { language: "Ukrainian", translator: "Kateryna Boichenko (W2L)" },
  ];


  const recorders = [
    { language: "Albanian", recorder: "Elza Hoti, Nicolas, \n" +
          "Donnerup (UNILU) " },
       { language: "English", recorder: "Claudine Tscharner\n" +
          "(PHGR)"},
    { language: "French", recorder: "Laetitia Collin (UNILU) " },

    { language: "German-Long", recorder: "Christina vom Brocke\n" +
            "(PHGR)" },
    { language: "German", recorder: "Nancy Morys (UNILU) " },
      { language: "Greek", recorder: "Stefania Oikonomou\n" +
            "(W2L) " },
      { language: "Hungarian", recorder: "Beti Karakatič"},
      { language: "Italian", recorder: "Francesca Cangemi (PHGR)" },
      { language: "Ladin", recorder: "Sofia Stuflesser" },

      { language: "Luxembourgish", recorder: "Jeanne Letsch (UNILU)" },
      { language: "Polish", recorder: "Magdalena Gösken" },
      { language: "Portuguese", recorder: "Mélanie Goncalves\n" +
            "Marques (UNILU)" },
      { language: "Rumantsch Grischun", recorder: "Irina Lutz (PHGR)" },
      { language: "Russian", recorder: "Alisa Saveleva " },
      { language: "Slovenian", recorder: "Anja Pirih (UP)" },
      { language: "Sursilvan", recorder: "Irina Lutz (PHGR)" },
      { language: "Turkish", recorder: "Banu Can Schürmann" },
      { language: "Ukrainian", recorder: "Kateryna Boichenko (W2L)" },
  ];

  return (
    <div className="container mx-auto py-8 px-8">
      <h1 className="text-3xl font-bold mb-6">Story 3 - Bobba at the beach</h1>

      <h2 className="text-xl font-semibold mb-4">
        Meet the authors and contributors that wrote the third story about Bobba!
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
        {/* Image section */}
        <div className="md:w-1/2">
          <Image
            src="/learning-material/story-3/story-title/Story 3_COVER_E.JPG"
            alt="Bobba the alien"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Text section */}
        {/* Text section */}
<div className="md:w-1/2">
  <p className="text-gray-600 mb-6 dark:text-white leading-relaxed">
    In this third installment, Bobba experiences the wonders of the seaside! From
    sandy shores to rolling waves, this sunny chapter of his journey is brought to life
    through our collaborative network. We want to give a big thanks to all
    the translators and recorders for their incredible work in making this
    beach adventure accessible!
    <br/><br/>
    Join Bobba as he explores the coastal world in "Bobba at the Beach" available
    in various languages on the AGENTIVE Platform thanks to the dedicated
    contributors listed below.
  </p>

  {/* Project Credits */}
  <div className="text-gray-800 dark:text-gray-100 space-y-1 border-t pt-4 border-gray-200 dark:border-gray-700">
    <p><span className="font-bold">Author(s):</span> Anja Pirih (UP) and Silva Bratož (UP)</p>
    <p><span className="font-bold">Peer-reviewed:</span> UNILU, UNIBZ, UNIPRI</p>
    <p><span className="font-bold">Pictures:</span> Katerina Veroutos, Anja Pirih (UP) and Silva Bratož (UP)</p>
  </div>
</div>
      </div>

      {/* Translations Table */}
      <div className="mt-10 overflow-x-auto">
        <h3 className="text-2xl font-bold mb-4">Translation Contributors</h3>
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="py-3 px-6 font-semibold uppercase text-sm border-b">Language</th>
            <th className="py-3 px-6 font-semibold uppercase text-sm border-b">Translator</th>
          </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-200">
          {translations.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <td className="py-4 px-6">{item.language}</td>
                <td className="py-4 px-6">{item.translator}</td>
              </tr>
          ))}
          </tbody>


        </table>



      </div>

      {/* Translations Table */}
      <div className="mt-10 overflow-x-auto">
        <h3 className="text-2xl font-bold mb-4">Audio Recording Contributors</h3>
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="py-3 px-6 font-semibold uppercase text-sm border-b">Language</th>
            <th className="py-3 px-6 font-semibold uppercase text-sm border-b">Translator</th>
          </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-200">
          {recorders.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <td className="py-4 px-6">{item.language}</td>
                <td className="py-4 px-6">{item.recorder}</td>
              </tr>
          ))}
          </tbody>


        </table>



      </div>
    </div>
  );
}