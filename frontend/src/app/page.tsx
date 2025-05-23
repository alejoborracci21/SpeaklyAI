import Hero from "@/components/hero"
import Features from "@/components/features"
import Pricing from "@/components/pricing"
import ThemeShowcase from "@/components/theme-showcase"
import Footer from "@/components/footer"
import Testimonials from "@/components/testimonial"
import { Navbar } from "@/components/landing/navbar"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <ThemeShowcase />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  )
}
