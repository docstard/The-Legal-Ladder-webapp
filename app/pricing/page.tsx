"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { getWhatsAppLink } from "@/lib/whatsapp"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, MessageCircle } from "lucide-react"
import { useUser } from "@clerk/nextjs"

export default function PricingPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    api.getCourses()
      .then((data) => {
        setCourses(data.courses || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err)
        setLoading(false)
      })
  }, [])

  const handleWhatsAppClick = (course: any) => {
    const userName = user ? `${user.firstName} ${user.lastName}` : undefined
    const whatsappUrl = getWhatsAppLink({
      courseName: course.title,
      courseId: course.id,
      price: Number(course.price),
      userName,
    })
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f9f7f2] py-24">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading courses...</p>
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
            Flexible Learning Plans
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#131e40] leading-tight">
            Choose Your Path to Legal Excellence
          </h1>
          <p className="text-lg text-[#5d6c8d] md:text-xl max-w-2xl mx-auto">
            Comprehensive courses designed for judiciary, CLAT PG, and UGC NET Law aspirants.
            Get personalized guidance and unlock your potential.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className="flex flex-col hover:shadow-xl transition-shadow duration-300"
              data-testid={`course-card-${course.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={course.isFree ? "secondary" : "default"}>
                    {course.isFree ? "Free" : "Premium"}
                  </Badge>
                  {course.type === "PRIMARY" && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Most Popular
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <CardDescription className="text-base">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-[#131e40]">
                      ₹{Number(course.price).toLocaleString('en-IN')}
                    </span>
                    {!course.isFree && (
                      <span className="text-sm text-gray-500">one-time</span>
                    )}
                  </div>
                </div>

                {/* Course Type Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {course.type === "PRIMARY" && "Complete comprehensive coverage"}
                      {course.type === "SECONDARY" && "Targeted preparation module"}
                      {course.type === "SUBJECT_WISE" && "Subject-specific deep dive"}
                      {course.type === "ADD_ON" && "Supplementary learning materials"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Access to exclusive mock tests</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Downloadable study materials</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Expert mentorship support</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <Button 
                  className="w-full bg-[#1754cf] hover:bg-[#1754cf]/90"
                  size="lg"
                  data-testid={`enroll-button-${course.id}`}
                >
                  {course.isFree ? "Start Learning Free" : "Enroll Now"}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full gap-2 border-green-600 text-green-700 hover:bg-green-50"
                  size="lg"
                  onClick={() => handleWhatsAppClick(course)}
                  data-testid={`whatsapp-button-${course.id}`}
                >
                  <MessageCircle className="w-5 h-5" />
                  Get More Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#131e40] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#5d6c8d]">Have questions? We're here to help!</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's included in the courses?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#5d6c8d]">
                Each course includes comprehensive study materials, mock tests, video lectures,
                downloadable notes, and access to our expert mentorship program.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do I get more information?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#5d6c8d]">
                Click the "Get More Details" button on any course card to connect with us on WhatsApp.
                Our team will provide personalized guidance and answer all your questions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I switch between courses?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#5d6c8d]">
                Yes! Once enrolled, you can upgrade to higher-tier courses. Contact us via WhatsApp
                for flexible switching options.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#131e40] py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of successful law students who trust The Legal Ladder.
          </p>
          <Button 
            size="lg" 
            className="bg-[#C5A46D] hover:bg-[#C5A46D]/90 text-[#131e40] font-bold"
            onClick={() => {
              const whatsappUrl = getWhatsAppLink({
                courseName: "General Inquiry",
                userName: user ? `${user.firstName} ${user.lastName}` : undefined,
              })
              window.open(whatsappUrl, '_blank')
            }}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contact Us on WhatsApp
          </Button>
        </div>
      </section>
    </main>
  )
}
