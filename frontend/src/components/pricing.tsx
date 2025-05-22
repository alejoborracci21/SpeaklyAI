"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for beginners",
    features: ["Basic vocabulary tests", "100 words per month", "Limited AI interactions", "Basic progress tracking"],
    buttonText: "Start Free",
    popular: false,
  },
  {
    name: "Intermediate",
    price: "$9.99",
    period: "per month",
    description: "For serious learners",
    features: [
      "Advanced vocabulary tests",
      "Unlimited words",
      "Daily AI practice sessions",
      "Detailed progress analytics",
      "Personalized learning path",
    ],
    buttonText: "Choose Plan",
    popular: true,
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "per month",
    description: "For professionals",
    features: [
      "All Intermediate features",
      "Industry-specific vocabulary",
      "Unlimited AI conversations",
      "Pronunciation feedback",
      "Priority support",
      "Offline mode",
    ],
    buttonText: "Choose Plan",
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Pricing Plans
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the perfect plan for your vocabulary learning journey
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-card rounded-xl p-8 shadow-sm border relative ${plan.popular ? "border-primary" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground"> {plan.period}</span>
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn w-full ${plan.popular ? "bg-primary" : ""}`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
