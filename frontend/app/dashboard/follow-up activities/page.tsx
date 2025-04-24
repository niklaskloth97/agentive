/* Grid <implementation> */

import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
/**import ButtonGrid from "/components/ui/ButtonGrid"  findet den Pfad nicht**/ 
import Art from "./art"
import Bingo from "./bingo"
import Drama from "./drama"
import Game from "./game"
import Lotto from "./lotto"
import Memory from "./memory"
import Song from "./song"
import Sport from "./sport"
import Image from "next/image";
import ButtonGrid from "@/components/ui/button-grid"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/components/ui/ButtonGrid" element={<ButtonGrid />} />
        <Route path="/art" element={<Art />} />
        <Route path="/bingo" element={<Bingo />} />
        <Route path="/drama" element={<Drama />} />
        <Route path="/game" element={<Game />} />
        <Route path="/lotto" element={<Lotto />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/song" element={<Song />} />      
        <Route path="/sport" element={<Sport />} />
      </Routes>
    </Router>
  )
}

export default App