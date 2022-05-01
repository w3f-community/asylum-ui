import * as React from 'react'

import { Card } from 'components/card'
import { Hr } from 'components/hr'
import { SearchAutocomplete } from 'components/search-autocomplete'
import { HeadingLg } from 'components/text/heading-lg'
import { HeadingXl } from 'components/text/heading-xl'
import { Paragraph } from 'components/text/paragraph'
import { observer } from 'mobx-react-lite'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { fetchTemplate } from 'api'
import { useStore } from 'store'

export const TemplateOverview: React.FC = observer(() => {
   const { id } = useParams()
   const store = useStore()
   const { data: template } = useQuery(['templates', id], () => fetchTemplate(id || ''))
   return (
      <div className="container mx-auto">
         <div className="flex justify-between items-center">
            <HeadingXl className="text-white">{template?.name}</HeadingXl>
         </div>
         <Hr />
         <div className="py-6 flex flex-col gap-8">
            <Card>
               <HeadingLg className="mb-5">Template overview</HeadingLg>
               {template?.description.split('\n').map((paragraph, index) => (
                  <Paragraph key={index} className="mb-3">
                     {paragraph}
                  </Paragraph>
               ))}
            </Card>

            <div>
               <HeadingXl className="text-white mb-2">Interpretations</HeadingXl>
               <SearchAutocomplete onSelect={() => {}} />
            </div>
         </div>
      </div>
   )
})
