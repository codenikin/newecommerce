'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { MapPin } from 'lucide-react'

import MapComponent from './Map'
import ContactSection from './ConntactSection'

const locations = [
  {
    name: 'Sharjah Office',
    address: 'Al Ghanem Warehouse-9',
    phone: '+971 6 542 2701',
    email: 'Info@totaleng.ae',
  },
  {
    name: 'India Office',
    address: 'No.4/68H Sri Kanika Garden',
    phone: '+919514399331',
    email: 'Info@totaleng.in',
  },
]

export default function ContactPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We love to hear from you. Please fill out this form or use one of our contact methods
            below.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-stretch">
          <div className="h-full">
            <h2 className="text-2xl font-semibold mb-4">Our Locations</h2>

            <Card className="h-full">
              <CardContent className="p-6">
                {locations.map((location, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h3 className="flex items-center text-lg font-semibold mb-2">
                      <MapPin className="mr-2 h-5 w-5" />
                      {location.name}
                    </h3>

                    <p>{location.address}</p>
                    <p>Phone: {location.phone}</p>
                    <p>Email: {location.email}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="h-full">
            <h2 className="text-2xl font-semibold mb-4 py-8 md:py-0">Map</h2>

            <Card className="h-full py-0 overflow-hidden">
              <CardContent className="h-full px-0">
                <MapComponent />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ContactSection />
    </>
  )
}
