"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Lock } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { toast } from "@/lib/use-toast"

export default function BlogDetailPage({ params }: { params: Promise<{ blogId: string }> }) {
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [blogId, setBlogId] = useState<string>("")
  const { isSignedIn } = useUser()

  useEffect(() => {
    params.then((resolvedParams) => {
      setBlogId(resolvedParams.blogId)
    })
  }, [params])

  useEffect(() => {
    if (!blogId) return

    api.getBlog(blogId)
      .then((data) => {
        setBlog(data.blog)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch blog:", err)
        toast({
          title: "Error",
          description: err.message || "Failed to load blog post",
          variant: "destructive",
        })
        setLoading(false)
      })
  }, [blogId])

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
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#f9f7f2] py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-[#131e40] mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const canAccessContent = blog.isFree || isSignedIn

  return (
    <main className="min-h-screen bg-white py-24">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Blog Header */}
      <article className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant={blog.isFree ? "secondary" : "default"}>
              {blog.isFree ? "Free" : "Premium"}
            </Badge>
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#131e40] leading-tight mb-4">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-xl text-[#5d6c8d] leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {blog.course && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>Part of: {blog.course.title}</span>
            </div>
          )}
        </div>

        <hr className="my-8 border-gray-200" />

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          {canAccessContent ? (
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <div className="relative">
              {/* Preview */}
              <div 
                className="blog-content mb-8"
                dangerouslySetInnerHTML={{ 
                  __html: blog.content?.substring(0, 500) + '...' 
                }}
              />

              {/* Blur overlay */}
              <div className="relative -mt-32 h-64 bg-gradient-to-t from-white via-white/95 to-transparent flex items-end justify-center pb-8">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center border-2 border-gray-200">
                  <Lock className="w-12 h-12 text-[#1754cf] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#131e40] mb-2">
                    Premium Content
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Sign in to read the full article and access exclusive legal insights.
                  </p>
                  <Button className="w-full bg-[#1754cf] hover:bg-[#1754cf]/90">
                    Sign In to Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Content CTA */}
        {canAccessContent && (
          <div className="mt-12 p-6 bg-[#f9f7f2] rounded-lg">
            <h3 className="text-xl font-bold text-[#131e40] mb-2">
              Want More Legal Insights?
            </h3>
            <p className="text-gray-600 mb-4">
              Explore our other blog posts and stay updated with the latest in legal education.
            </p>
            <Link href="/blog">
              <Button variant="outline">
                View All Posts
              </Button>
            </Link>
          </div>
        )}
      </article>

      {/* Share Section */}
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <div className="border-t pt-8">
          <p className="text-sm text-gray-500 text-center">
            © 2025 The Legal Ladder. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  )
}
