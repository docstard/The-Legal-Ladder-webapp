"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Calendar } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getBlogs()
      .then((data) => {
        setBlogs(data.blogs || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f9f7f2] py-24">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f9f7f2] py-24">
      {/* Hero Section */}
      <section className="pt-16 pb-12 text-center px-4 bg-gradient-to-b from-white to-[#f9f7f2]">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge className="mb-4" variant="outline">
            <BookOpen className="w-4 h-4 mr-2" />
            Legal Insights
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#131e40] leading-tight">
            From the Blog
          </h1>
          <p className="text-lg text-[#5d6c8d] md:text-xl max-w-2xl mx-auto">
            Stay ahead with insights, analysis, and expert perspectives from the legal world.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Card 
                key={blog.id}
                className="flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                data-testid={`blog-card-${blog.id}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={blog.isFree ? "secondary" : "default"}>
                      {blog.isFree ? "Free" : "Premium"}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl hover:text-[#1754cf] transition-colors">
                    <Link href={`/blog/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-base line-clamp-2">
                    {blog.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  {/* Content preview */}
                  <div 
                    className="text-sm text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{ 
                      __html: blog.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
                    }}
                  />
                </CardContent>

                <CardFooter>
                  <Link href={`/blog/${blog.id}`} className="w-full">
                    <Button 
                      variant="outline" 
                      className="w-full gap-2 group"
                      data-testid={`read-more-button-${blog.id}`}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No blog posts available yet</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for new insights!</p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-white py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#131e40] mb-4">
            Never Miss an Update
          </h2>
          <p className="text-[#5d6c8d] text-lg mb-8">
            Subscribe to our newsletter for the latest legal insights and study tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1754cf]"
            />
            <Button 
              size="lg"
              className="bg-[#1754cf] hover:bg-[#1754cf]/90"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
