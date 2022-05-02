import * as React from 'react'
import { Ref, useRef } from 'react'

import classNames from 'classnames'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Hr } from 'components/hr'
import { InputSelect } from 'components/input-select'
import { JsonRaw } from 'components/json-raw'
import { Tag } from 'components/tag'
import { Heading } from 'components/text/heading'
import { HeadingLg } from 'components/text/heading-lg'
import { HeadingXl } from 'components/text/heading-xl'
import { Paragraph } from 'components/text/paragraph'
import { every, filter, includes, map } from 'lodash/fp'
import { observer } from 'mobx-react-lite'
import { useQuery } from 'react-query'
import { Carousel } from 'react-responsive-carousel'
import { useNavigate, useParams } from 'react-router-dom'
import { OptionProps, components } from 'react-select'

import { TagMetadata } from '@asylum-ui/connection-library'

import { fetchTags, fetchTemplate, fetchTemplateInterpretationsMetadata } from 'api'
import { ReactComponent as ArrowLeftIcon } from 'assets/svg/arrow-left.svg'
import { ReactComponent as EditIcon } from 'assets/svg/pen.svg'
import { ReactComponent as PlusIcon } from 'assets/svg/plus.svg'
import { AddInterpretationModal } from 'pages/game-templates/add-interpretation-modal'
import { EditInterpretationModal } from 'pages/game-templates/edit-interpretation-modal'
import { EditTemplateModal } from 'pages/game-templates/edit-template-modal'
import { InterpretationWithMetadata } from 'types'
import { formatAddress } from 'utils'

const Option = (props: OptionProps<TagMetadata, true>) => {
   return (
      <components.Option {...props}>
         {props.label} <span className="text-gray-400">- {props.data.description}</span>
      </components.Option>
   )
}

export const TemplateOverview: React.FC = observer(() => {
   const { id } = useParams()
   const navigate = useNavigate()
   const { data: tags } = useQuery('tags', () => fetchTags())
   const [seeMore, setSeeMore] = React.useState(false)
   const descriptionRef: Ref<HTMLDivElement> = useRef(null)
   const [filterTags, setFilterTags] = React.useState<TagMetadata[]>([])
   const [interpretationsFiltered, setInterpretationsFiltered] = React.useState<
      InterpretationWithMetadata[]
   >([])
   const isDescriptionClamped = descriptionRef.current
      ? descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
      : false

   const [isAddInterpretationModalOpen, setIsAddInterpretationModalOpen] = React.useState(false)
   const [isEditTemplateModalOpen, setIsEditTemplateModalOpen] = React.useState(false)
   const [isEditInterpretationModalOpen, setIsEditInterpretationModalOpen] = React.useState(false)

   const { data: template } = useQuery(['templates', id], () => fetchTemplate(id || ''))
   const { data: interpretations } = useQuery(
      ['interpretations', id],
      () => fetchTemplateInterpretationsMetadata(id || ''),
      {
         onSuccess(data) {
            setInterpretationsFiltered(data)
         },
      }
   )

   const [interpretationEdited, setInterpretationEdited] =
      React.useState<InterpretationWithMetadata | null>(null)
   const [tagsEdited, setTagsEdited] = React.useState<TagMetadata[]>([])
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
            <Card className="relative">
               <div className="flex gap-9 mb-5">
                  <div className="flex gap-4 basis-7/12 justify-between">
                     <HeadingLg className="flex gap-3 items-center">
                        {template.name}
                        <EditIcon
                           className="hover:fill-asylum-magenta transition-all cursor-pointer mb-1"
                           onClick={() => setIsEditTemplateModalOpen(true)}
                        />
                        <EditTemplateModal
                           template={template}
                           open={isEditTemplateModalOpen}
                           onClose={() => setIsEditTemplateModalOpen(false)}
                        />
                     </HeadingLg>
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
                        setIsAddInterpretationModalOpen(true)
                     }}
                  >
                     <PlusIcon className="fill-text-base w-4 h-4 inline-block mr-2" /> add
                     interpretation
                  </Button>
                  <AddInterpretationModal
                     template={template}
                     open={isAddInterpretationModalOpen}
                     onClose={() => setIsAddInterpretationModalOpen(false)}
                  />
                  <EditInterpretationModal
                     tags={tagsEdited}
                     interpretation={interpretationEdited || undefined}
                     open={isEditInterpretationModalOpen}
                     onClose={() => {
                        setIsEditInterpretationModalOpen(false)
                        setTagsEdited([])
                        setInterpretationEdited(null)
                     }}
                  />
               </div>

               <InputSelect
                  placeholder="Filter by tags"
                  name="tags"
                  className="mb-9"
                  value={filterTags}
                  onChange={(value) => {
                     setFilterTags(value as TagMetadata[])
                     if (value.length) {
                        setInterpretationsFiltered(
                           filter(
                              (interpretation) =>
                                 every(
                                    (tag) => includes(tag, interpretation.tags),
                                    map('id', value)
                                 ),
                              interpretations
                           ) as InterpretationWithMetadata[]
                        )
                     } else {
                        setInterpretationsFiltered(interpretations || [])
                     }
                  }}
                  options={tags || []}
                  getOptionLabel={(option) => option.id}
                  getOptionValue={(option) => option.id}
                  Option={Option}
               />

               <div className="flex flex-col gap-6 pb-40">
                  {interpretationsFiltered.length === 0 && (
                     <div className="text-white">
                        <Paragraph className="flex gap-3 items-center">
                           No interpretations found with set of tags:{' '}
                           <div className="flex gap-1">
                              {filterTags.map((tag) => (
                                 <Tag key={tag.id}>{tag.id}</Tag>
                              ))}
                           </div>
                        </Paragraph>
                     </div>
                  )}
                  {interpretationsFiltered?.map((interpretation) => (
                     <Card key={interpretation.interpretation.id} className="py-3 px-4 relative">
                        <div
                           className="flex gap-3 items-center basis-48 !absolute top-2 right-3 hover:bg-gray-200 cursor-pointer py-2 px-4 rounded-xl transition-all text-base flex items-center gap-2 font-secondary absolute bottom-2 right-3 top-auto"
                           onClick={() => {
                              setIsEditInterpretationModalOpen(true)
                              setTagsEdited(
                                 filter((tag) => interpretation.tags.includes(tag.id), tags)
                              )
                              setInterpretationEdited(interpretation)
                           }}
                        >
                           <EditIcon />
                           edit
                        </div>
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
                                 copyButtonClassName="bottom-2 top-auto right-20"
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
