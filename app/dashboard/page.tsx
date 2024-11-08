import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState('pdf')

  return (
      <div className="flex h-screen">
        <aside className="w-64 bg-gray-100 p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <Button
                  variant={selectedItem === 'pdf' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedItem('pdf')}
                >
                  PDF Reader
                </Button>
              </li>
              <li>
                <Button
                  variant={selectedItem === 'audio' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedItem('audio')}
                >
                  Audio Player
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">Demo Entry 1</Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">Demo Entry 2</Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">Demo Entry 3</Button>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {selectedItem === 'pdf' && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">PDF Reader</h2>
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">PDF Viewer Placeholder</p>
              </div>
            </div>
          )}
          {selectedItem === 'audio' && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Audio Player</h2>
              <audio controls className="w-full">
                <source src="/placeholder.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </main>
      </div>
  )
}