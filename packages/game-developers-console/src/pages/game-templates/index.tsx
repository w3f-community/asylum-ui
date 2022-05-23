import React, { useState } from 'react'

import { flow, map, uniq } from 'lodash/fp'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { Page } from '../../layout/page'
import { GridItems } from '../../layout/page/grid-items'
import { MintItemModal } from '../../modules/mint-item-modal'
import { fetchTemplatesWithMetadata } from 'api'
import { ListCardItem } from 'components/list-card-item'
import { SearchAutocomplete } from 'components/search-autocomplete'
import { Paragraph } from 'components/text/paragraph'
import { TemplateCreate } from 'modules/template/template-create'
import { TemplateWithMetadata } from 'types'

function GameTemplatesSkeleton() {
   return (
      <GridItems className="animate-pulse opacity-75">
         {[...Array(6).fill(0)].map((_, i) => (
            <div
               key={i}
               className="bg-white p-5 rounded-2xl cursor-pointer group flex flex-col h-[407px]"
            />
         ))}
      </GridItems>
   )
}

export const GameTemplates = () => {
   const navigate = useNavigate()
   const [query, setQuery] = useState('')
   const [mintItemId, setMintItemId] = useState<string | null>(null)
   const { data: templates, isLoading } = useQuery('templates', () => fetchTemplatesWithMetadata())

   const filterTemplates = (
      inputValue: string,
      items: TemplateWithMetadata[]
   ): TemplateWithMetadata[] =>
      items.filter((item) => {
         return item.name?.toLowerCase().includes(inputValue.toLowerCase())
      })

   const filteredTemplates = templates?.length ? filterTemplates(query, templates) : []

   return (
      <>
         <Page title={'Templates'} headerButton={<TemplateCreate />}>
            <SearchAutocomplete
               className="mb-10"
               variants={flow(map('name'), uniq)(templates)}
               onSelect={setQuery}
            />
            {isLoading && <GameTemplatesSkeleton />}
            {!isLoading && (
               <>
                  <GridItems>
                     {filteredTemplates.map((item: TemplateWithMetadata) => (
                        <ListCardItem
                           key={item.id}
                           id={item.id}
                           title={item.name}
                           img={item.img}
                           description={item.description}
                           address={item.issuer}
                           onClick={() => navigate(`/templates/${item.id}`)}
                           actionButton={{
                              text: 'Mint item',
                              onClick: () => setMintItemId(item.id),
                           }}
                        />
                     ))}
                  </GridItems>
                  {query && filteredTemplates.length === 0 && (
                     <Paragraph className="text-white">
                        Your search - <strong>{query}</strong> - did not match any Templates.
                     </Paragraph>
                  )}
               </>
            )}
         </Page>
         <MintItemModal templateId={mintItemId} onClose={() => setMintItemId(null)} />
      </>
   )
}
