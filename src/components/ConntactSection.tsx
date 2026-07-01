'use client'

import React, { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin } from 'lucide-react'

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    details: '+919514399331',
    delay: 0.2,
  },
  {
    icon: Mail,
    title: 'Email',
    details: 'info@totaleng.in',
    delay: 0.4,
  },
  {
    icon: MapPin,
    title: 'Office',
    details: 'Sri Kanika Garden,MGC Palayam,Coimbatore-641107',
    delay: 0.6,
  },
]

const inputVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

export default function ContactSection() {
  //   const { mutate } = api.enquiry.create.useMutation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  return (
    <section className="py-12 bg-background">
      <h2 className="text-3xl text-primary font-bold tracking-tighter hidden md:block py-8  sm:text-5xl text-center mb-8">
        Contact Us
      </h2>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  //   mutate({ message, email, name })
                }}
                className="space-y-8 "
              >
                <div>
                  <Input
                    className="py-6"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <Input
                    className="py-6"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Your Email"
                  />
                </div>

                <div>
                  <Textarea
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your Message"
                    rows={4}
                  />
                </div>
                <div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {contactMethods.map((method) => (
              <div key={method.title}>
                <Card>
                  <CardContent className="flex items-center p-6">
                    <method.icon className="h-10 w-10 text-primary mr-4" />
                    <div>
                      <h3 className="font-semibold">{method.title}</h3>
                      <p className="text-lg text-muted-foreground">{method.details}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
