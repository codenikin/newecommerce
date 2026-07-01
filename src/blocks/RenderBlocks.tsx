import React from 'react'
import { ContentBlock } from '@/blocks/Content/Component'
import type { Page } from '@/payload-types'

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = ({ blocks }) => {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, index) => (
        <div key={block.id ?? index} className="my-16">
          <ContentBlock {...block} />
        </div>
      ))}
    </>
  )
}
