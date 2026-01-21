"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Lock } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { toast } from "@/lib/use-toast"

export default function ResourcesPage() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    api.getNotes()
      .then((data) => {
        setNotes(data.notes || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch notes:", err)
        setLoading(false)
      })
  }, [])

  const handleDownload = async (note: any) => {
    if (!note.isFree && !isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access premium resources.",
        variant: "destructive",
      })
      return
    }

    // In a real implementation, this would download the file
    toast({
      title: "Download Started",
      description: `Downloading ${note.fileName}...`,
    })
    
    // Simulate download
    console.log("Downloading:", note.fileUrl)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f9f7f2] py-24">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading resources...</p>
          </div>
        </div>
      </main>
    )
  }

  const freeNotes = notes.filter(note => note.isFree)
  const premiumNotes = notes.filter(note => !note.isFree)

  return (
    <main className="min-h-screen bg-[#f9f7f2] py-24">
      {/* Hero Section */}
      <section className="pt-16 pb-12 text-center px-4 bg-gradient-to-b from-white to-[#f9f7f2]">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge className="mb-4" variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Study Materials
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#131e40] leading-tight">
            Comprehensive Notes & Resources
          </h1>
          <p className="text-lg text-[#5d6c8d] md:text-xl max-w-2xl mx-auto">
            Access high-quality study materials, detailed notes, and case compilations
            curated by legal experts.
          </p>
        </div>
      </section>

      {/* Free Resources */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#131e40] mb-2">
            Free Resources
          </h2>
          <p className="text-[#5d6c8d]">
            Get started with our collection of free study materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeNotes.length > 0 ? (
            freeNotes.map((note) => (
              <Card 
                key={note.id}
                className="hover:shadow-lg transition-shadow duration-300"
                data-testid={`note-card-${note.id}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-10 h-10 text-[#1754cf]" />
                    <Badge variant="secondary">Free</Badge>
                  </div>
                  <CardTitle className="text-xl">{note.title}</CardTitle>
                  <CardDescription>{note.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{formatFileSize(note.fileSize)}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      PDF
                    </span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full gap-2"
                    onClick={() => handleDownload(note)}
                    data-testid={`download-button-${note.id}`}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center py-8">
              No free resources available at the moment
            </p>
          )}
        </div>
      </section>

      {/* Premium Resources */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#131e40] mb-2">
            Premium Resources
          </h2>
          <p className="text-[#5d6c8d]">
            Unlock exclusive content with course enrollment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumNotes.length > 0 ? (
            premiumNotes.map((note) => (
              <Card 
                key={note.id}
                className="hover:shadow-lg transition-shadow duration-300 relative"
                data-testid={`premium-note-card-${note.id}`}
              >
                {!isSignedIn && (
                  <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] rounded-lg z-10 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                      <Lock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-700">
                        Sign in to access
                      </p>
                    </div>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-10 h-10 text-[#C5A46D]" />
                    <Badge>Premium</Badge>
                  </div>
                  <CardTitle className="text-xl">{note.title}</CardTitle>
                  <CardDescription>{note.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{formatFileSize(note.fileSize)}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      PDF
                    </span>
                  </div>
                  {note.course && (
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>Included in: {note.course.title}</span>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  {isSignedIn ? (
                    <Button 
                      className="w-full gap-2"
                      onClick={() => handleDownload(note)}
                      data-testid={`download-premium-button-${note.id}`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  ) : (
                    <Button 
                      className="w-full gap-2"
                      variant="outline"
                    >
                      <Lock className="w-4 h-4" />
                      Sign In to Access
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center py-8">
              No premium resources available
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#131e40] to-[#1754cf] py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want Access to Premium Resources?
          </h2>
          <p className="text-gray-200 text-lg mb-8">
            Enroll in our courses to unlock exclusive study materials and notes.
          </p>
          <Button 
            size="lg" 
            className="bg-[#C5A46D] hover:bg-[#C5A46D]/90 text-[#131e40] font-bold"
            onClick={() => window.location.href = '/pricing'}
          >
            View Courses
          </Button>
        </div>
      </section>
    </main>
  )
}
