"use client"
// from @kuzand 

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Search } from "lucide-react"
import oerData from "@/data/oer.json"

interface OER {
  id: string
  title: string
  link: string
  shortDescription: string
  focusArea: string
  source: string
  categoryOfSource: string
  typology: string
  format: string
  language: string
  license: string
  opennessScore: number
  resourceProvenance: string
}

export default function LearningMaterial() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFocusArea, setSelectedFocusArea] = useState<string>("all")
  const [selectedFormat, setSelectedFormat] = useState<string>("all")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all")
  const [selectedSource, setSelectedSource] = useState<string>("all")
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set())

  const oerItems: OER[] = oerData as OER[]

  // Toggle description expansion
  const toggleDescription = (itemId: string) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  // Extract unique values for filters (filter out empty strings)
  // Split comma-separated focus areas and extract individual unique areas
  const focusAreas = useMemo(() => {
    const areas = new Set<string>()
    oerItems.forEach(item => {
      if (item.focusArea && item.focusArea.trim() !== "") {
        // Split by comma and extract individual focus areas
        item.focusArea.split(',').forEach(area => {
          const trimmed = area.trim()
          if (trimmed) {
            areas.add(trimmed)
          }
        })
      }
    })
    return Array.from(areas).sort()
  }, [oerItems])

  const formats = useMemo(() => {
    const formatSet = new Set(oerItems.map(item => item.format).filter(format => format && format.trim() !== ""))
    return Array.from(formatSet).sort()
  }, [oerItems])

  const languages = useMemo(() => {
    const langSet = new Set(oerItems.map(item => item.language).filter(lang => lang && lang.trim() !== ""))
    return Array.from(langSet).sort()
  }, [oerItems])

  const sources = useMemo(() => {
    const sourceSet = new Set(oerItems.map(item => item.source).filter(source => source && source.trim() !== ""))
    return Array.from(sourceSet).sort()
  }, [oerItems])

  // Filter OER items
  const filteredOER = useMemo(() => {
    return oerItems.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.focusArea.toLowerCase().includes(searchQuery.toLowerCase())

      // Check if selected focus area is contained in the item's focus area(s)
      const matchesFocusArea = selectedFocusArea === "all" || 
        (item.focusArea && item.focusArea.split(',').some(area => area.trim() === selectedFocusArea))
      const matchesFormat = selectedFormat === "all" || item.format === selectedFormat
      const matchesLanguage = selectedLanguage === "all" || item.language === selectedLanguage
      const matchesSource = selectedSource === "all" || item.source === selectedSource

      return matchesSearch && matchesFocusArea && matchesFormat && matchesLanguage && matchesSource
    })
  }, [oerItems, searchQuery, selectedFocusArea, selectedFormat, selectedLanguage, selectedSource])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Introduction Section */}
      <Card className="mb-12 bg-muted/30 border-muted">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
            Exploring openness in early childhood education resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base md:text-lg leading-relaxed text-foreground">
            How openly accessible are early childhood education (ECE) resources within and beyond Europe? Which types of licences are most commonly used?
          </p>
          <p className="text-base md:text-lg leading-relaxed text-foreground">
            To explore these questions, the AGENTIVE project carried out a non-exhaustive, qualitative mapping of resources across four key thematic areas of ECE: <strong>a) plurilingual competence</strong>, <strong>b) language awareness</strong>, <strong>c) intercultural awareness</strong>, and <strong>d) early literacy skills</strong>.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-foreground">
            In total, 20 resources were identified and analysed using a scale from 0 to 5 to assess their degree of openness (openness score). You can find all 20 resources in the section below. A detailed discussion of the methodology and findings is available in{" "}
            <a 
              href="/learning-material/AGENTIVE%20D7%20report%20final.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              this report
              <ExternalLink className="h-3 w-3" />
            </a>
            .
          </p>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Learning Material</h1>
      </div>

      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by title, description, or focus area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Focus Area</label>
              <Select value={selectedFocusArea} onValueChange={setSelectedFocusArea}>
                <SelectTrigger>
                  <SelectValue placeholder="All Focus Areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Focus Areas</SelectItem>
                  {focusAreas.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Format</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="All Formats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  {formats.map(format => (
                    <SelectItem key={format} value={format}>{format}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map(lang => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Source</label>
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {sources.map(source => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredOER.length} of {oerItems.length} resources
          </div>
        </div>

        {/* OER Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOER.map((item) => {
            const isExpanded = expandedDescriptions.has(item.id)
            // Show "More" button if description is longer than ~150 characters
            const needsExpansion = item.shortDescription.length > 150
            
            return (
            <Card key={item.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription className={`mt-2 ${!isExpanded && needsExpansion ? 'line-clamp-3' : ''}`}>
                  {item.shortDescription}
                </CardDescription>
                {needsExpansion && (
                  <button
                    onClick={() => toggleDescription(item.id)}
                    className="text-primary hover:underline text-sm mt-2 text-left"
                  >
                    {isExpanded ? 'Less' : 'More'}
                  </button>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{item.focusArea}</Badge>
                  <Badge variant="outline">{item.format}</Badge>
                  <Badge variant="outline">{item.language}</Badge>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div><strong>Source:</strong> {item.source}</div>
                  <div><strong>Category:</strong> {item.categoryOfSource}</div>
                  <div><strong>Typology:</strong> {item.typology}</div>
                  <div><strong>License:</strong> {item.license}</div>
                  <div><strong>Openness Score:</strong> {item.opennessScore}/5</div>
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center gap-2 text-primary hover:underline"
                >
                  <span>View Resource</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
            )
          })}
        </div>

        {filteredOER.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No resources found matching your criteria.</p>
            <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  )
}