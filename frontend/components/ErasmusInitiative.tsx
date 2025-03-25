"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Adjust import if needed

export default function ErasmusInitiative() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col md:flex-row-reverse items-center gap-12 mt-12 mb-12">
      <Image src="/erasmus.jpg" alt="EU Initiative" width={500} height={300} className="rounded-lg" />

      <div className="md:w-1/2">
        <h2 className="text-lg font-semibold mb-2">An EU-Funded Erasmus+ Initiative</h2>

        <p className="text-gray-600 mb-4">
          The AGENTIVE project is a groundbreaking initiative funded by the Erasmus+ programme of the European Union.
          It unites universities and organizations from Luxembourg, Greece, Germany, Switzerland, Slovenia, and Italy to develop innovative multilingual educational resources.
          <br /><br />
          
          {expanded && (
            <>
              {" "}This pan-European partnership emphasizes the EU’s commitment to fostering multilingualism and digital transformation in education.
              Aligned with the EU’s priorities for education, AGENTIVE promotes linguistic diversity, inclusion, and digital transformation.
              It embodies the EU’s vision of fostering a multilingual society. For this project, we are funded by Europe’s Erasmus+ Programme.
            </>
          )}
        </p>

        <Button variant="outline" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Read Less" : "Read More"}
        </Button>
      </div>
    </div>
  );
}
