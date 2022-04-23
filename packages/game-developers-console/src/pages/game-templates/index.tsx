import { map } from 'lodash'
import { ListCardItem } from 'components/list-card-item'
import { Hr } from 'components/hr'
import { SearchAutocomplete } from 'components/search-autocomplete'
import { HeadingXl } from 'components/text/heading-xl'
import * as React from 'react'
import { ITemplate } from 'types'
import { MOCK_ADDRESS, templates } from 'context/mocks'
import { Paragraph } from 'components/text/paragraph'
import { Button } from 'components/button'
import { ReactComponent as PlusIcon } from 'assets/svg/plus.svg'

interface IProps {}

export const GameTemplates: React.FC<IProps> = () => {
   const [query, setQuery] = React.useState('')
   const [templateList, setTemplateList] = React.useState<ITemplate[]>(templates)

   const filterTemplates = (inputValue: string, items: ITemplate[]): ITemplate[] =>
      items.filter((item) => {
         return item.title.toLowerCase().includes(inputValue.toLowerCase())
      })

   const handleSearch = (query: string) => {
      setTemplateList(filterTemplates(query, templates))
      setQuery(query)
   }

   return (
      <div className="container mx-auto">
         <div className="flex justify-between items-center">
            <HeadingXl className="text-white">Templates</HeadingXl>
            <Button variant="light">
               <PlusIcon className="fill-text-base w-4 h-4 inline-block mr-1" /> create template
            </Button>
         </div>
         <Hr />
         <div className="py-6">
            <SearchAutocomplete
               className="mb-10"
               variants={map(templates, 'title')}
               onSelect={handleSearch}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-9 w-full">
               {templateList.map((item: ITemplate) => (
                  <ListCardItem
                     key={item.id}
                     {...item}
                     actionText="mint item"
                     address={MOCK_ADDRESS}
                  />
               ))}
            </div>
            {templateList.length === 0 && (
               <Paragraph className="text-white">
                  Your search - <strong>{query}</strong> - did not match any Templates.
               </Paragraph>
            )}
         </div>
      </div>
   )
}
