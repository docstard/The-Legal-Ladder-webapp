"use client"
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Card from "@/components/Card/page";


const homeCardData = [  {
    id: 1,
    title: "Free Notes & Resources",
    description: "Access a comprehensive library of notes and materials, completely free.",
    src: "",
    link: "",
    color: "#fff"
  },
  {
    id: 2,
    title: "Smart Mock Tests",
    description: "Simulate exam conditions and get instant, detailed feedback to improve.",
    src: "",
    link: "",
    color: "#fff"
  },
  {
    id: 3,
    title: "1v1 Counseling",
    description: "Get personalized guidance and support from our expert mentors.",
    src: "",
    link: "",
    color: "#fff"
  },
  {
    id: 4,
    title: "Insightful Blogs",
    description: "Read expert insights and stay updated with the latest trends in legal education.",
    src: "",
    link: "",
    color: "#fff"
  }
]

export default function Home() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

  }, [])
  return (
    <main className="relative w-full h-full">

      {/* FIXED HERO SECTION */}
      <section
        className="
        fixed top-0 left-0 
        w-full h-screen 
        bg-cover bg-center 
        flex items-center justify-center 
        text-white
        z-10
        bg-[url('@/public/images/hero-img-1.png')]
      "
      // style={{
      //   backgroundImage:
      //     `url('../public/images/hero-img-1.png')`,
      // }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-primary/70"></div>

        {/* CONTENT */}
        <div className="relative z-20 text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold">
            Climb Your Way to Legal Excellence
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            A student-first legal learning platform guiding you step-by-step with structured notes,
            intelligent mock tests, and personalized mentorship.
          </p>

          <div className="mt-8 flex justify-center space-x-4">
            <button className="px-6 py-3 bg-[#C5A46D] text-primary font-medium rounded-md">
              Start Learning
            </button>

            <button className="px-6 py-3 border border-[#C5A46D] text-[#C5A46D] font-medium rounded-md">
              Explore Free Content
            </button>
          </div>
        </div>
      </section>

      {/* SCROLLING CONTENT WRAPPER */}
      <div className="relative rounded-t-full z-30 pt-[100vh]">

        {/* <section className="bg-white w-full rounded-t-2xl">
          <VideoPlayer />
        </section> */}
        {/* <!-- FeatureSection --> */}
        <section className="bg-[#f9f7f2] py-20">
          {/* <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-3 rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <span className="material-symbols-outlined text-black text-muted-gold text-3xl">description</span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#131e40] text-lg font-bold leading-tight">Free Notes &amp; Resources</h2>
                  <p className="text-[#5d6c8d] text-sm font-normal leading-normal">Access a comprehensive library of notes and materials, completely free.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <span className="material-symbols-outlined text-black text-muted-gold text-3xl" >quiz</span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#131e40] text-lg font-bold leading-tight">Smart Mock Tests</h2>
                  <p className="text-[#5d6c8d] text-sm font-normal leading-normal">Simulate exam conditions and get instant, detailed feedback to improve.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <span className="material-symbols-outlined text-black text-muted-gold text-3xl" >groups</span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#131e40] text-lg font-bold leading-tight">1v1 Counseling</h2>
                  <p className="text-[#5d6c8d] text-sm font-normal leading-normal">Get personalized guidance from experienced legal professionals.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <span className="material-symbols-outlined text-black text-muted-gold text-3xl" >article</span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#131e40] text-lg font-bold leading-tight">Insightful Blogs</h2>
                  <p className="text-[#5d6c8d] text-sm font-normal leading-normal">Stay updated with the latest trends and insights from the legal world.</p>
                </div>
              </div>
            </div>
          </div> */}

          <div ref={container} className=" mt-[50vh] mb-[100vh]">
            {homeCardData.map((project, index) => {
              const targetScale = 1 - ((homeCardData.length - index) * 0.05)
              return <Card key={project.id} i={index} range={[index * 0.25, 1]} progress={scrollYProgress} targetScale={targetScale} {...project} />
            })}
          </div>
          <div>
            cdsc
          </div>
        </section>
        {/* <!-- Free Resources Preview --> */}
        <section className="bg-[#f9f7f2] py-20">
          <div className="container mx-auto grid grid-cols-1 gap-12 px-6 lg:grid-cols-3">
            <div className="flex flex-col justify-center lg:col-span-1">
              <h2 className="font-display text-4xl font-bold leading-tight text-[#131e40] md:text-5xl">Start with Free Content.</h2>
              <div className="mt-4 h-1 w-24 bg-muted-gold"></div>
              <p className="mt-6 text-[#5d6c8d]">Dive into our collection of free resources. Get a feel for our teaching style and the quality of our materials before you commit.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
              <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm">
                <div className="w-full aspect-video rounded-md bg-cover bg-center" data-alt="Stack of law books on a wooden table" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhsH2TVF3lzybdIQfifcR0x3pvn56kq2WZ1FrZnYR_uA8D8XsqXueSn0w_eHUm4_zn_7DYOQPP2T_v8Tp0Er3IWOjLaDBt7Sp-X6Vg_sfQlwhMV-J8ASUt8WDM9utQC07WlYa0Pw_iMe0H44d2PjBkLkpc-6cLmOcXnxB4EqC-SDXAaRX_lGftXt7uwYgvt7h6XxFENbXbxaBMKIVng9TGc7x0gwAz8shngLbVaGzrxuzg4n0JTGLl6obGVu_0iK7FBadCW_Pjk4k')" }}></div>
                <div>
                  <p className="text-[#131e40] text-base font-bold leading-normal">Comprehensive Case Notes</p>
                  <p className="text-[#5d6c8d] text-sm font-normal leading-normal">Download detailed notes on landmark cases.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm">
                <div className="w-full aspect-video rounded-md bg-cover bg-center" data-alt="A person watching an online lecture on a laptop" style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDu7S945dfh4eJXqNNSRedonbK-Z5wv3qSOsruziHZI8OLq2DBeVL7XIdt81GYT0vXVMHMJB66-UzmB64Hv5gXipcJYyb3nGMz3G6sdzOjNRmYZD4fYjsF8Zh3evE5lfdtgnuaTafBl4ye6SnOZAcySKjkjdrWQC7Dv6371etVyzADBgLuPUfQTVu1whvnxz63rJIYyXBI-GbSPxYfaLo8v7Jqk4CbFrtH4e_77uqbSS0UrS2LMZ19curYk0UEB9fjVXb4fQ7Eo8gU')"
                }}></div>
                <div>
                  <p className="text-[#131e40] text-base font-bold leading-normal">Free Mock Tests</p>
                  <p className="text-[#5d6c8d] text-sm font-normal leading-normal">Give our free mock tests.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Mock Test Engine Preview --> */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-4xl font-bold text-[#131e40] md:text-5xl">Perfect Your Practice</h2>
              <p className="mt-4 text-lg text-[#5d6c8d]">Our mock test engine provides topic-wise tests, instant logic explanations, and detailed progress tracking to sharpen your skills.</p>
            </div>
            <div className="mt-12">
              <img className="mx-auto rounded-xl shadow-2xl" data-alt="A sleek UI mockup of a legal mock test platform on a laptop screen, showing progress charts and question analysis." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHms84KEvGe38Uf8tNFE4NU90rswd42YJAnxn4hA2ctBf7WCmcPXbKaH196gUpN5x_0p_49gaJKDsWgNGTGrirQkRkRl2oG4XegcXdNvgQKQDvr6BiU-aq7qD9e-FThQfc4WpiE-TTR31zWlMlrpWdgU7GouQEw1U4eJDurQbN5F2YBDHH8OzuFW3lZ_yixRvh-0zdyhy9bq1UIlGXJag0dyGWUNmiX0a-HHsdmfxTZGx6bcaA191BqfiUuGUZrgIMRXTtzgKiYL4" />
            </div>
          </div>
        </section>
        {/* <!-- 1v1 Counseling Banner --> */}
        <section className="bg-[#5d6c8d] py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-4xl font-bold text-white">Personalized Guidance, Unlocked.</h2>
              <p className="mt-4 text-lg text-ivory/90">Feeling stuck? Our experienced mentors are here to provide one-on-one counseling to help you navigate your legal career path with confidence.</p>
              <button className="mt-8 shrink-0 mx-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-muted-gold text-[#131e40] text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                <span className="truncate">Book a Counseling Session</span>
              </button>
            </div>
          </div>
        </section>
        {/* // Blog Section */}
        <section className="bg-[#f9f7f2] py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12 max-w-3xl">
              <h2 className="font-display text-4xl font-bold text-[#131e40] md:text-5xl">From the Blog</h2>
              <p className="mt-4 text-lg text-[#5d6c8d]">Stay ahead with insights and analysis from legal experts.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl">
                <div className="h-48 w-full bg-cover bg-center" data-alt="Close-up of a judge's gavel on a wooden block" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCVpZ5xygYNFmZ09vyetdp6iRYSCqHsiuHDnd_W_ejCLWmnFq129gxCN4V7BLxvujq7UGo7bSBs5ER4w4zf0XWhaPU_j6XYbdAKxLUrP2fycg1udBess67OeraBhHC65hRFGUZDff6AVgmWhbXzMpwzINTeL35LEyKzacn5oan6hn6TnlTlr_oYKwxJrxrbUGbzpjPOjq1wckn3XFaXS5u2g0iZH5tI3jDlKqdYa3WmIKg8QAZQ7eKM_mEZL0Wtl65PPAWspWeRP8o')" }}></div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#131e40]">The Art of Cross-Examination</h3>
                    <p className="mt-3 text-[#5d6c8d]">Master the techniques that can make or break a case in the courtroom.</p>
                  </div>
                  <a className="mt-4 font-bold text-muted-gold hover:underline" href="#">Read More →</a>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl">
                <div className="h-48 w-full bg-cover bg-center" data-alt="A modern office with lawyers discussing a document" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCFrdRKJqKKYKUa08uPxF1epoze7BlPgHY06vY0JMDcM8ITmvYedW0LsDeTiOws7aeNnfAZPDvduyVsOd7MED9gIcLl9anQle_GQOiZeGKh-315fUJKQPn_VB9eR4e0oNyBCgvWH8viS2KRmkzIG_cSgNpxj9RmocfRdnA8clp5UEOhJOlSbZrUnvUMIFcAMl4pFZ1hk48J81UikRoFk-a1mFlLXPK9BVsheYGRmjXIcTR7tt6KL9NaKd8_JsImNt_lvr-gU5H3TM')" }}></div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#131e40]">Navigating Corporate Law in 2024</h3>
                    <p className="mt-3 text-[#5d6c8d]">An overview of the emerging trends and challenges for corporate lawyers.</p>
                  </div>
                  <a className="mt-4 font-bold text-muted-gold hover:underline" href="#">Read More →</a>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl">
                <div className="h-48 w-full bg-cover bg-center" data-alt="A hand signing a legal contract with a fountain pen" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDvPjUBYQSf7RG_1ApsZ_Mo8l5PX7ZeiN_k3lFnhDRkQryapX4mJ9xcTlsyvtIslcUL9-k3-P948_kUdVKkG7fGlFvuRkl8RKneRz3HM3B8ROeOyGWmuMOjgn8xeotwbJS7r-aF16FsyzMJdN8bWE5QeNCjBFp6meTNpgKrHSWoU1K2iG5BYFR6_8HZHO4OpD9tbeF4nACokJE0K-8PZSvBp7-2wB8ASC2BCTzA4LrlhK0-mcddjXqnqtLvFkyVcIp2d3qQcNHxMw')" }}></div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#131e40]">Understanding Intellectual Property</h3>
                    <p className="mt-3 text-[#5d6c8d]">A primer on patents, trademarks, and copyrights for aspiring law students.</p>
                  </div>
                  <a className="mt-4 font-bold text-muted-gold hover:underline" href="#">Read More →</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}