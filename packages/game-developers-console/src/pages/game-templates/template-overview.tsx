import * as React from 'react'
import { Ref, useRef } from 'react'

import classNames from 'classnames'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Hr } from 'components/hr'
import { JsonRaw } from 'components/json-raw'
import { SearchAutocomplete } from 'components/search-autocomplete'
import { Tag } from 'components/tag'
import { Heading } from 'components/text/heading'
import { HeadingLg } from 'components/text/heading-lg'
import { HeadingXl } from 'components/text/heading-xl'
import { Paragraph } from 'components/text/paragraph'
import { observer } from 'mobx-react-lite'
import { useQuery } from 'react-query'
import { Carousel } from 'react-responsive-carousel'
import { useNavigate, useParams } from 'react-router-dom'

import { fetchTemplate, fetchTemplateInterpretationsMetadata } from 'api'
import { ReactComponent as ArrowLeftIcon } from 'assets/svg/arrow-left.svg'
import { ReactComponent as PlusIcon } from 'assets/svg/plus.svg'
import { AddInterpretationModal } from 'pages/game-templates/add-interpretation-modal'
import { useStore } from 'store'
import { formatAddress } from 'utils'

export const TemplateOverview: React.FC = observer(() => {
   const { id } = useParams()
   const navigate = useNavigate()
   const store = useStore()
   const [seeMore, setSeeMore] = React.useState(false)
   const descriptionRef: Ref<HTMLDivElement> = useRef(null)
   const isDescriptionClamped = descriptionRef.current
      ? descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
      : false

   const [isModalOpen, setIsModalOpen] = React.useState(false)

   const { data: template } = useQuery(['templates', id], () => fetchTemplate(id || ''))
   const { data: interpretations } = useQuery(['interpretations', id], () =>
      fetchTemplateInterpretationsMetadata(id || '')
   )

   if (!template) return null

   return (
      <div className="container mx-auto">
         <div className="flex justify-between items-center">
            <HeadingXl className="text-white">
               <div
                  onClick={() => navigate('/templates')}
                  className="flex gap-4 items-center cursor-pointer"
               >
                  <ArrowLeftIcon className="fill-white" />
                  Templates
               </div>
            </HeadingXl>
         </div>
         <Hr />
         <div className="py-6 flex flex-col gap-8">
            <Card>
               <div className="flex gap-9 mb-5">
                  <div className="flex gap-4 basis-7/12 justify-between">
                     <HeadingLg>{template.name}</HeadingLg>
                     <div className="font-secondary">
                        ID: <span className="font-light">{template.id}</span>
                     </div>
                  </div>
                  <div className="flex gap-9 basis-5/12">
                     <div className="font-secondary">
                        Issuer:{' '}
                        <span className="font-light">{formatAddress(template.issuer || '')}</span>
                     </div>
                  </div>
               </div>

               <div className="flex gap-9">
                  <div className="basis-7/12">
                     <Carousel
                        className="demo-carousel overflow-hidden"
                        showIndicators={false}
                        showArrows={true}
                        showThumbs={true}
                        showStatus={false}
                     >
                        {interpretations?.map((interpretation) => (
                           <img
                              key={interpretation.interpretation.id}
                              src={interpretation.interpretation.src}
                              alt={interpretation.interpretation.id}
                              className="aspect-video object-cover object-center"
                           />
                        ))}
                     </Carousel>
                  </div>
                  <div className="basis-5/12">
                     <Heading className="mb-4">Description</Heading>
                     <div
                        ref={descriptionRef}
                        className={classNames({ 'line-clamp-15': !seeMore })}
                     >
                        {template?.description.split('\n').map((paragraph, index) => (
                           <Paragraph key={index} className="mb-3">
                              {paragraph}
                           </Paragraph>
                        ))}
                     </div>
                     {isDescriptionClamped && (
                        <a
                           className={classNames(
                              'cursor-pointer underline text-base text-asylum-blue',
                              { hidden: seeMore }
                           )}
                           onClick={() => setSeeMore(true)}
                        >
                           See more
                        </a>
                     )}
                  </div>
               </div>
            </Card>

            <div>
               <div className="flex justify-between items-center mb-6">
                  <HeadingXl className="text-white">Interpretations</HeadingXl>
                  <Button
                     variant="light"
                     onClick={() => {
                        setIsModalOpen(true)
                     }}
                  >
                     <PlusIcon className="fill-text-base w-4 h-4 inline-block mr-2" /> add
                     interpretation
                  </Button>
                  <AddInterpretationModal
                     open={isModalOpen}
                     onClose={() => setIsModalOpen(false)}
                  />
               </div>
               <SearchAutocomplete onSelect={() => {}} className="mb-6" />

               <div className="flex flex-col gap-6 pb-40">
                  {interpretations?.map((interpretation) => (
                     <Card key={interpretation.interpretation.id} className="py-3 px-4 relative">
                        <div className="flex gap-9">
                           <div className="basis-[170px]">
                              <img
                                 className="aspect-square object-cover object-center rounded-xl"
                                 src={interpretation.interpretation.src}
                                 alt={interpretation.interpretation.id}
                              />
                           </div>
                           <div className="overflow-auto grow">
                              <Paragraph className="flex items-center mb-3 gap-1 justify-end">
                                 {interpretation.tags?.map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                 ))}
                              </Paragraph>
                              <JsonRaw
                                 metadata={interpretation.metadata}
                                 className="!p-0 !static"
                                 copyButtonClassName="bottom-2 top-auto right-3"
                              />
                           </div>
                        </div>
                     </Card>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
})
