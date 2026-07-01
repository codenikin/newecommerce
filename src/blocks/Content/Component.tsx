import { cn } from '@/lib/utils'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

type Props = ContentBlockProps & {
  className?: string
}

export const ContentBlock: React.FC<Props> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '8',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="mx-auto max-w-5xl gap-x-8 gap-y-16 border border-gray-200 px-2">
      {columns?.map((col, index) => {
        const { richText, size } = col

        return (
          <div
            key={index}
            className={cn(`col-span-8 lg:col-span-${colsSpanClasses[size!]}`, {
              'md:col-span-6': size !== 'full',
            })}
          >
            {richText && (
              <div
                className="
                  prose
                  max-w-7xl
                  text-center
                  prose-headings:text-center
                  prose-p:text-center
                  prose-li:text-center
                  prose-h1:text-5xl
                  prose-h1:font-bold
                  prose-h1:mb-8
                  prose-h2:text-4xl
                  prose-h2:font-bold
                  prose-h2:mt-12
                  prose-h2:mb-6
                  prose-h3:text-2xl
                  prose-h3:font-semibold
                  prose-p:text-gray-700
                  prose-p:leading-8
                  prose-p:mb-6
                  prose-a:text-primary
                  prose-a:no-underline
                  hover:prose-a:underline
                  prose-ul:list-disc
                  prose-ul:pl-6
                  prose-li:my-2
                  prose-blockquote:border-l-4
                  prose-blockquote:border-primary
                  prose-blockquote:pl-6
                  prose-img:rounded-2xl
                "
              >
                <RichText data={richText} enableGutter={false} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
