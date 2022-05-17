import React, { useState } from 'react'

import { Hr } from 'components/hr'
import { ListCardItem } from 'components/list-card-item'
import { SearchAutocomplete } from 'components/search-autocomplete'
import { HeadingXl } from 'components/text/heading-xl'
import { Paragraph } from 'components/text/paragraph'
import { flow, map, uniq } from 'lodash/fp'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { fetchTemplates } from 'api'
import { TemplateCreate } from 'modules/template/template-create'
import { TemplateWithMetadata } from 'types'

interface IProps { }

function GameTemplatesSkeleton() {
   return (
      <div className="flex items-center justify-center space-x-2 animate-pulse">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-9 w-full opacity-75">
            {[...Array(6).fill(0)].map((_, i) => (
               <div
                  key={i}
                  className="bg-white p-5 rounded-2xl cursor-pointer group flex flex-col h-[407px]"
               />
            ))}
         </div>
      </div>
   )
}

export const GameTemplates: React.FC<IProps> = () => {
   const navigate = useNavigate()
   const [query, setQuery] = useState('')
   const { data: templates, isLoading } = useQuery('templates', () => fetchTemplates())

   const filterTemplates = (
      inputValue: string,
      items: TemplateWithMetadata[]
   ): TemplateWithMetadata[] =>
      items.filter((item) => {
         return item.name?.toLowerCase().includes(inputValue.toLowerCase())
      })

   const filteredTemplates = templates?.length ? filterTemplates(query, templates) : []

   return (
      <div className="container mx-auto">
         <div className="flex justify-between items-center">
            <HeadingXl className="text-white">Templates</HeadingXl>
            <TemplateCreate />
         </div>
         <Hr />
         <div className="py-6">
            <SearchAutocomplete
               className="mb-10"
               variants={flow(map('name'), uniq)(templates)}
               onSelect={setQuery}
            />
            {isLoading && <GameTemplatesSkeleton />}
            {!isLoading && (
               <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-9 w-full">
                     {filteredTemplates.map((item: TemplateWithMetadata) => (
                        <ListCardItem
                           key={item.id}
                           id={item.id}
                           title={item.name}
                           img={item.img}
                           description={item.description}
                           address={item.issuer}
                           actionText="mint item"
                           onClick={() => navigate(`/templates/${item.id}`)}
                        />
                     ))}
                  </div>
                  {query && filteredTemplates.length === 0 && (
                     <Paragraph className="text-white">
                        Your search - <strong>{query}</strong> - did not match any Templates.
                     </Paragraph>
                  )}
               </>
            )}
         </div>
      </div>
   )
}
