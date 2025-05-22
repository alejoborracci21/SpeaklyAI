"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "SpeaklyAI has transformed my English vocabulary. I've learned more words in 3 months than I did in 3 years of traditional study.",
    name: "Sarah Johnson",
    title: "Marketing Professional",
  },
  {
    quote:
      "The personalized approach is what makes SpeaklyAI stand out. It adapts to my learning style and challenges me at just the right level.",
    name: "Michael Chen",
    title: "Software Engineer",
  },
  {
    quote:
      "As a non-native English speaker, SpeaklyAI has been invaluable for my career. The industry-specific vocabulary features are particularly helpful.",
    name: "Elena Rodriguez",
    title: "Finance Analyst",
  },
  {
    quote:
      "I've tried many vocabulary apps, but SpeaklyAI's AI-powered practice sessions make learning new words actually enjoyable and effective.",
    name: "David Kim",
    title: "Graduate Student",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrev = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1))
  }

  const handleNext = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Success stories from SpeaklyAI learners
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-card rounded-xl p-8 md:p-10 shadow-sm border relative">
                    <Quote className="w-10 h-10 text-primary/20 absolute top-6 left-6" />
                    <div className="relative z-10">
                      <p className="text-lg md:text-xl mb-6 italic">&quot;{testimonial.quote}&quot;</p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            <button className="btn btn-outline btn-icon rounded-full" onClick={handlePrev}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </button>

            {testimonials.map((_, index) => (
              <button
                key={index}
                className={` btn btn-ghost btn-sm w-2 h-2 rounded-full p-0 min-w-0 ${
                  index === activeIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                onClick={() => {
                  setAutoplay(false)
                  setActiveIndex(index)
                }}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </button>
            ))}

            <button className="btn btn-outline btn-icon rounded-full" onClick={handleNext}>
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
