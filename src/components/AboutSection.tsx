import { Check, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/Carousel'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Alexander Cameron',
    role: 'Lead Developer',
    image: '/team/team1.png',
    review:
      "If you're looking for a rewarding career and a chance to make an impact, you've come to the right place. We will transform your business through our techniques!",
  },
  {
    name: 'Alexander Cameron',
    role: 'Lead Developer',
    image: '/team/team1.png',
    review:
      "If you're looking for a rewarding career and a chance to make an impact, you've come to the right place. We will transform your business through our techniques!",
  },
]
export default function AboutSection() {
  return (
    <section className="py-20 lg:py-12 overflow-hidden ">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={'/thumb1.png'}
                alt="IT Solutions"
                width={650}
                height={700}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 z-10">
              <div className="rounded-3xl bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                <Image
                  src="/satisfaction.png"
                  alt="Customer Satisfaction"
                  width={120}
                  height={120}
                  className="h-auto w-auto"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-xl ">
            <h2 className="text-4xl font-bold leading-tight text-slate-900 lg:text-6xl">
              Exclusive technology to provide IT solutions
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We are architects of innovation, trailblazers of technological advancement, and
              trusted partners in your success. We build scalable digital experiences that help
              businesses grow faster.
            </p>

            <ul className="mt-10 space-y-5">
              {[
                'Easily build custom reports and dashboards',
                'Legacy software modernization',
                'Software for the open enterprise',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-lg font-medium text-slate-800"
                >
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                    <Check className="h-4 w-4 text-blue-600" />
                  </span>

                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              More About
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-blue-600 mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="py-8 text-center">
            <h2 className="text-6xl font-bold tracking-tight text-white">26+</h2>
            <p className="mt-4 text-base font-medium text-slate-300">Years of Experience</p>
          </div>

          <div className="py-8 text-center">
            <h2 className="text-6xl font-bold tracking-tight text-white">730+</h2>
            <p className="mt-4 text-base font-medium text-slate-300">Successfully Projects</p>
          </div>

          <div className="py-8 text-center">
            <h2 className="text-6xl font-bold tracking-tight text-white">198+</h2>
            <p className="mt-4 text-base font-medium text-slate-300">Satisfied Happy Clients</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 py-20 lg:py-28">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Section Title */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
              Trusted by more than 200+ clients around the world
            </h2>
          </div>

          {/* Your Carousel Component Here */}
          <div className="mt-16">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
            >
              <CarouselContent className="-ml-6">
                {testimonials.map((item, index) => (
                  <CarouselItem key={index} className="pl-6 md:basis-1/2">
                    <div className="h-full rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      {/* Rating */}
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>

                      {/* Testimonial */}
                      <p className="mt-6 text-lg leading-8 text-slate-600">
                        “If you're looking for a rewarding career and a chance to make an impact,
                        you've come to the right place. We will transform your business through our
                        techniques!”
                      </p>

                      {/* Author */}
                      <div className="mt-8 flex items-center gap-4">
                        <img
                          src="/team/team1.png"
                          alt="Alexander Cameron"
                          className="h-16 w-16 rounded-full object-cover"
                        />

                        <div>
                          <h5 className="text-lg font-semibold text-slate-900">
                            Alexander Cameron
                          </h5>
                          <span className="text-sm text-slate-500">Lead Developer</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
