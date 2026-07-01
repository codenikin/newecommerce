import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/Card'
import { ArrowRightIcon } from 'lucide-react'

const CTASection = () => {
  return (
    <div className="mx-auto max-w-7xl py-16">
      <Card className="bg-white rounded-noneshadow-none border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="flex justify-between gap-6 max-lg:flex-col md:px-8 lg:items-center">
          <div className="space-y-4">
            <h2 className="text-bblack text-2xl font-semibold md:text-3xl lg:text-4xl">
              Ready to Dive Deeper?
            </h2>
            <p className="text-black text-lg md:text-xl">
              Everything from setup to advanced features is covered in our docs.
            </p>
          </div>
          <div>
            <Button size="lg" variant="secondary" className="shrink-0" asChild>
              <a href="#" className="inline-flex items-center gap-2">
                View Docs
                <ArrowRightIcon className="size-5" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CTASection
