'use client'
import { SerializedLinkNode, type DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { FaCirclePlay } from 'react-icons/fa6'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useState } from 'react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') throw new Error('Expected value to be an object')
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}
type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>
const buildClassName = (
  enableGutter: boolean,
  enableProse: boolean,
  customClassName?: string,
): string => {
  const classes = ['payload-richtext']
  if (enableGutter) classes.push('container')
  if (!enableGutter) classes.push('max-w-none')
  if (enableProse) classes.push('mx-auto')
  if (customClassName) classes.push(customClassName)
  return classes.join(' ')
}
const RichTextContent = dynamic(
  async () => {
    const { LinkJSXConverter, RichText: ConvertRichText } =
      await import('@payloadcms/richtext-lexical/react')

    const jsxConverters = ({ defaultConverters }: any) => {
      return {
        ...defaultConverters,
        ...LinkJSXConverter({ internalDocToHref }),

        blocks: {
          ...defaultConverters?.blocks,
          codeblock: ({ node }: { node: any }) => {
            const language = node?.fields?.language || 'plaintext'
            const code = node?.fields?.code || ''
            const blockName = node?.fields?.blockName || ''

            if (!code.trim()) return null

            return (
              <div className="my-6 rounded-lg overflow-hidden">
                <pre className="bg-zinc-900 text-zinc-100 p-4 overflow-x-auto">
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-zinc-700">
                    <div className="text-sm text-zinc-400 font-mono uppercase">{language}</div>
                    {blockName && <span className="text-xs text-zinc-500">{blockName}</span>}
                  </div>
                  <code className="text-sm font-mono leading-relaxed whitespace-pre-wrap break-all">
                    {code}
                  </code>
                </pre>
              </div>
            )
          },
          services: ({ node }: { node: any }) => {
            const { services, description, title } = node.fields || {}
            return (
              <div className="bg-zinc-900 w-full text-white">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-14 lg:px-14 xl:px-18 2xl:px-3 lg:pb-24 pb-20 justify-center">
                  <div className="blog-title bg-light-blue-banner lg:pt-20 pt-14 font-dm">
                    {/* Post Title */}
                    <div className="lg:w-8/12 text-center pb-12 mx-auto lg:pt-20 pt-14">
                      <div className="flex justify-center mb-3">
                        <div className="px-3 py-1 border border-gray-200 rounded-lg text-xs font-semibold uppercase  shadow-sm flex items-center gap-2 w-auto">
                          Business
                        </div>
                      </div>
                      <h2 className="text-3xl md:text-5xl  font-semibold mb-1 md:mb-2">
                        {services[0]?.title || 'Service Title'}
                      </h2>
                      <p className=" font-medium text-base mb-0">
                        More balanced you — and works tirelessly to help you get there.
                      </p>
                    </div>
                  </div>
                  <div className="lg:w-11/12 justify-center pb-14 mx-auto">
                    <Image
                      src="/blog-single.svg"
                      alt="banner"
                      width={1200}
                      height={600}
                      className="object-cover w-full rounded-xl"
                    />
                  </div>
                  <div className="justify-center max-width-7xl px-16">
                    <h2 className="text-2xl md:text-3xl  font-semibold mb-2">
                      Solutions designed for every business journey.
                    </h2>
                    <p className=" font-medium text-[17px] leading-7">
                      Gen financial habits are vastly different from those of previous generations.
                      They expect:
                    </p>
                    <ul className="list-disc pl-5 mb-3 py-5  font-medium text-[17px] leading-7">
                      <li>Real-time access to their money</li>
                      <li>Intuitive user experiences</li>
                      <li>Ethical, inclusive financial products</li>
                    </ul>
                    <p className=" font-medium text-[17px] leading-7 mb-3">
                      Fintech startups are rising to meet these expectations by offering tools that
                      go beyond traditional banking. Going through this checklist will ensure that
                      your content covers multiple angles, making it richer and more inclusive. This
                      approach prevents your content from feeling one-dimensional or narrowly
                      focused—allowing it to resonate with a broader and more diverse audience.
                    </p>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
                      <div className="overflow-hidden duration-500 border border-primary rounded-[10px] p-[30px] relative after:absolute after:w-[50px] after:h-[50px] after:bottom-0 after:right-0 after:content-[''] after:bg-primary after:rounded-tl-[100px] after:rounded-tr-[20px] after:duration-500 hover:border-secondary hover:after:bg-secondary">
                        <div className="text-primary text-3xl mb-4"></div>
                        <h2 className="text-white lg:mb-6 mb-4 capitalize sm:text-[40px] text-3xl leading-[120%] font-semibold">
                          Local SEO Optimization
                        </h2>
                        <p className="lg:mb-[30px] mb-5 text-white text-lg">
                          Local Google SEO helps your business appear in Google Search and Google
                          Maps when customers search for services in Kerala
                        </p>
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl  font-semibold mt-4 mb-2">
                      Key Features in Modern Fintech Apps
                    </h2>
                    <p className=" font-medium text-[17px] leading-7">
                      The best fintech apps for Gen Z usually include:
                    </p>
                    <ul className="list-disc pl-5 mb-3 py-5  font-medium text-[17px] leading-7">
                      <li>
                        <strong>Automated budgeting</strong>: Apps that track spending and
                        categorize expenses in real-time.
                      </li>
                      <li>
                        <strong>Round-up savings</strong>: Tools that round up purchases and stash
                        the spare change.
                      </li>
                      <li>
                        <strong>Crypto integration</strong>: Support for buying, storing, and
                        learning about cryptocurrency.
                      </li>
                      <li>
                        <strong>Social accountability</strong>: Features that let users set goals
                        and share progress with friends.
                      </li>
                    </ul>
                    <h2 className="text-2xl md:text-3xl  font-semibold mt-4 mb-2">
                      Spotlight: Top Fintech Startups to Watch
                    </h2>
                    <p className="font-medium text-[17px] leading-7">
                      Here are a few standout startups:
                    </p>
                    <ul className="list-disc pl-5 mb-3 py-5 font-medium text-[17px] leading-7">
                      <li>
                        <strong>Zeno</strong>: Offers micro-investment opportunities tailored for
                        college students.
                      </li>
                      <li>
                        <strong>BrightCard</strong>: A debit card with automatic savings and
                        spend-limit controls.
                      </li>
                      <li>
                        <strong>Finly</strong>: Combines personal finance education with gamified
                        savings challenges.
                      </li>
                    </ul>
                    <blockquote className=" lg:p-12 p-8 rounded-xl my-5 bg-black">
                      <p className="text-white font-medium text-2xl leading-snug lg:pr-6">
                        “We wanted to make managing money feel like a conversation, not a chore.”
                      </p>
                      <span className="block mt-2 text-sm text-gray-300 font-medium">
                        — Co-founder of BrightCard
                      </span>
                    </blockquote>
                    <h2 className="text-2xl md:text-3xl  font-semibold mt-4 mb-2">
                      The Future of Personal Finance
                    </h2>
                    <p className=" font-medium text-[17px] leading-7 mb-2">
                      With AI and machine learning, fintech will continue to evolve. Expect:
                    </p>
                    <ul className="list-disc pl-5 mb-3  font-medium text-[17px] leading-7 py-5">
                      <li>Hyper-personalized recommendations</li>
                      <li>Predictive budgeting insights</li>
                      <li>Integration with mental wellness tools</li>
                    </ul>
                    <p className=" font-medium text-[17px] leading-7">
                      Gen Z isn’t just using fintech — they’re helping build it.
                    </p>
                    <p className=" font-medium text-[17px] leading-7">
                      Going through this checklist will ensure that your content covers multiple
                      angles, making it richer and more inclusive. This approach prevents your
                      content from feeling one-dimensional or narrowly focused—allowing it to
                      resonate with a broader and more diverse audience.
                    </p>
                    <p className="font-medium text-[17px] leading-7 mb-0">
                      When diverse perspectives are incorporated, readers are more likely to see
                      their own experiences reflected, creating a stronger emotional connection with
                      the content.
                    </p>
                  </div>
                </div>
              </div>
            )
          },
          seo: ({ node }: { node: any }) => {
            const { services, description, title } = node.fields || {}

            return (
              <section className="  py-8 ">
                <div className="  xl mx-auto p-8 mb-12 border border-primary rounded-[10px] bg-zinc-900 relative z-50">
                  <div className="grid lg:grid-cols-[66%_auto] gap-6">
                    <div>
                      <div className="w-full mb-15">
                        <img src="./seo.jpg" alt="img" className="w-full relative z-25" />
                      </div>
                      <div className="xl:mb-15 mb-10" data-aos="fade-up" data-aos-duration="1400">
                        <h3
                          text-split=""
                          words-slide-from-right=""
                          className="block xl:text-4xl text-2xl xl:mb-7.5 font-semibold mb-5 text-white"
                        >
                          {title}
                        </h3>
                        <div
                          text-split=""
                          letters-slide-up=""
                          className="md:text-base text-lg text-white xl:mb-7 mb-4 relative z-5 max-w-full whitespace-normal break-words"
                        >
                          {description}
                        </div>
                      </div>
                      <div className="xl:mb-15 mb-10" data-aos="fade-up" data-aos-duration="1400">
                        <h3
                          text-split=""
                          words-rotate-in=""
                          className="xl:text-4xl text-2xl font-semibold xl:mb-7.5 mb-5 text-white block"
                        >
                          Why Businesses Choose CODENIK DESIGN
                        </h3>
                        <p
                          text-split=""
                          letters-slide-down=""
                          className="md:text-base text-lg text-white"
                        >
                          With over 5 years of industry experience, we understand what works in
                          modern web development and SEO.Unlike traditional web design agencies, we
                          build websites with SEO in mind from the beginning.We use advanced
                          technologies like Payload CMS and Tailwind CSS to build scalable and
                          future-ready websites.Our websites are structured for search engines with
                          clean code, optimized architecture, and fast loading speeds
                        </p>
                      </div>
                      <div className="relative w-full mb-15 overflow-hidden rounded-[10px] before:absolute before:inset-0 before:z-10 before:content-[''] before:rounded-[10px] before:bg-[rgb(12_12_12)] before:bg-opacity-60">
                        <img
                          src="./seovideo.png"
                          alt="img"
                          className="relative z-10 block w-full rounded-[10px]"
                        />
                        <button
                          type="button"
                          // onClick={() => setShowVideo(true)}
                          aria-label="Play video"
                          className="video__80 video-btn cursor-pointer absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 xl:w-20 xl:h-20 w-[60px] h-[60px] flex justify-center items-center rounded-full border border-[#414141] before:absolute before:border-1 before:border-[#414141] before:w-full before:h-full before:content-[''] before:rounded-full before:animate-scales"
                        >
                          <FaCirclePlay className="text-primary text-[42px]" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="lg:mb-7.5 mb-5 xl:p-4.5 p-2 border border-[#414141] rounded-lg z-70 relative">
                        <h3 className="text-3xl text-white mb-7.5 font-semibold">Service List</h3>
                        {services.map((service: any) => (
                          <a
                            href={service.link}
                            key={service.text}
                            className="lg:mb-4 mb-[10px] lg:py-7 md:py-5 py-4 lg:pr-[26px] md:pr-4 pr-3 lg:pl-5 pl-3 rounded-[10px] border border-[#414141] flex items-center justify-between text-white lg:text-2xl md:xl text-base duration-500 transition-colors hover:bg-primary hover:border-primary hover:text-black"
                          >
                            {service.text}
                            <i className="bi-chevron-right text-white text-[22px]"></i>
                          </a>
                        ))}
                      </div>

                      <div className="lg:mb-7.5 mb-5 xl:p-7.5 p-5 border border-[#414141] rounded-lg">
                        <div className="relative w-full before:absolute before:w-full before:h-full before:inset-0 before:content-[''] before:rounded-[10px] before:bg-[rgb(12_12_12)] before:opacity-60">
                          <img src="./google.jpg" alt="img" className="w-full" />
                          <a
                            href=""
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center items-center gap-2 font-medium px-[30px] pt-5 pb-[21px] sm:text-lg text-base leading-[120%] capitalize bg-primary overflow-hidden rounded-[5px] duration-500 text-clr_subtitle before:absolute before:content-[''] before:bottom-full before:bg-[#aad302] before:left-0 before:w-full before:h-full before:duration-500 before:bg-opacity-80 hover:before:bottom-0"
                          >
                            <span className="z-10 relative duration-500 whitespace-nowrap">
                              Contact Me
                            </span>
                            <span className="z-10 relative duration-500">
                              <i className="bi-arrow-right"> </i>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid place-items-center grid-cols-1 gap-6 rounded-[10px]  py-8">
                    <h3 className="text-white capitalize sm:text-[32px] text-[26px] font-semibold">
                      Leave a Reply
                    </h3>
                    <form action="#" className="flex flex-col gap-6 w-full px-0 lg:px-64">
                      <div className="w-full">
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-full py-4.5 px-5 rounded-[10px] bg-[rgb(29_29_29)] border border-clr_cusborder text-white outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <input
                          type="email"
                          placeholder="Eamil"
                          className="w-full py-4.5 px-5 rounded-[10px] bg-[rgb(29_29_29)] border border-clr_cusborder text-white outline-none"
                        />
                      </div>

                      <div>
                        <textarea
                          name="comment"
                          placeholder="Write Comments"
                          className="w-full py-4.5 px-5 rounded-[10px] bg-[rgb(29_29_29)] border border-clr_cusborder text-white outline-none"
                        ></textarea>
                      </div>
                      <a
                        href=""
                        className="w-62.5 flex justify-center items-center gap-2 font-medium px-[30px] pt-5 pb-[21px] text-lg leading-[120%] capitalize relative bg-primary overflow-hidden rounded-[5px] duration-500 text-clr_subtitle before:absolute before:content-[''] before:bottom-full before:bg-[#aad302] before:left-0 before:w-full before:h-full before:duration-500 before:bg-opacity-80 hover:before:bottom-0"
                      >
                        <span className="z-10 relative duration-500">Submit Comment</span>

                        <i className="bi-arrow-right z-10 relative duration-500 text-xl"></i>
                      </a>
                    </form>
                  </div>
                </div>
              </section>
            )
          },
        },
      }
    }

    return function RichTextWrapper({
      data,
      enableGutter = false,
      enableProse = false,
      className,
      ...rest
    }: Props) {
      return (
        <ConvertRichText
          data={data}
          converters={jsxConverters}
          className={buildClassName(enableGutter, enableProse, className)}
          {...rest}
        />
      )
    }
  },
  { ssr: false },
)

export default function RichText(props: Props) {
  return <RichTextContent {...props} />
}
