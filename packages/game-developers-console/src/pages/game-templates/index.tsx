import { ListCardItem } from 'components/list-card-item'
import { Hr } from 'components/hr'
import { SearchAutocomplete } from 'components/search-autocomplete'
import { HeadingXl } from 'components/text/heading-xl'
import * as React from 'react'
import { ITemplate } from 'types'
import { debounce, map } from 'lodash'
import { TemplatesOverview } from './templates-overview'
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow-left.svg'
import classNames from 'classnames'
import { MOCK_ADDRESS, templates } from 'context/mocks'
import { Paragraph } from 'components/text/paragraph'

interface IProps {}

export const GameTemplates: React.FC<IProps> = () => {
   const [query, setQuery] = React.useState<string>('')
   const [selectedItem, setSelectedItem] = React.useState<ITemplate | undefined>(undefined)

   const handleSearch = debounce((value: string) => setQuery(value), 200)
   const handleSelectItem = (item: number | undefined) =>
      setSelectedItem(templateList.find((template: ITemplate) => template.id === item))
   const [templateList, setTemplateList] = React.useState<ITemplate[]>(templates)

   const filterTemplates = (inputValue: string, items: ITemplate[]): ITemplate[] =>
      items.filter((item) => {
         return item.title.toLowerCase().includes(inputValue.toLowerCase())
      })

   return (
      <div className="container mx-auto">
         <div
            onClick={() => setSelectedItem(undefined)}
            className={selectedItem ? 'flex items-center cursor-pointer' : 'flex items-center'}
         >
            {selectedItem && <ArrowIcon className="mx-4" />}
            <HeadingXl className="text-white">Templates</HeadingXl>
         </div>
         <Hr />
         {!selectedItem && (
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
                        onClick={() => handleSelectItem(item.id)}
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
         )}
         {selectedItem && <TemplatesOverview {...selectedItem} />}
      </div>
   )
}
