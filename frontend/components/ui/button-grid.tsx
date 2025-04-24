import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./button"

const ButtonGrid = () => {
  const navigate = useNavigate()

  /** die Routes gibt es in meinem Wissen noch nicht */
  const actions = [
    { label: "art", route: "/art" },
    { label: "bingo", route: "/bingo" },
    { label: "drama", route: "/drama" },
    { label: "game", route: "/game" },
    { label: "lotto", route: "/lotto" },
    { label: "memory", route: "/memory" },
    { label: "song", route: "/song" },
    { label: "sport", route: "/sport" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto p-6">
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={() => navigate(action.route)}        
          variant="secondary"
          size="lg"
          className="w-full transition-transform hover:scale-105"
        >
          {action.label}                                
        </Button>
      ))}
    </div>
  )
}

export default ButtonGrid