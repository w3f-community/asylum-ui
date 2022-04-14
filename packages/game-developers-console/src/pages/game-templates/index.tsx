import { TemplateItem } from 'components/template-item'
import { Hr } from 'components/hr'
import { SearchInput } from 'components/search-input'
import { HeadingXl } from 'components/text/heading-xl'
import * as React from 'react'
import { ITemplates } from 'types'
import { debounce, map } from 'lodash'
import { TemplatesOverview } from './templates-overview'
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow-left.svg'
import classNames from 'classnames'

const filterItems = (inputValue: string, items: ITemplates[]): ITemplates[] => items.filter(item => {
   return item.title.toLowerCase().includes(inputValue.toLowerCase())
})

interface IProps {
   templates: ITemplates[]
}

export const GameTemplates: React.FC<IProps> = ({ templates }) => {
   const [query, setQuery] = React.useState<string>('')
   const [templatesList, setTemplatesList] = React.useState<ITemplates[]>(templates)
   const [variants, setVariants] = React.useState<string[]>([])
   const [selectedItem, setSelectedItem] = React.useState<ITemplates | undefined>(undefined)

   const handleSearch = debounce((value: string) => setQuery(value), 200)
   const handleSelectItem = (item: number | undefined) => setSelectedItem(
      templatesList.find((template: ITemplates) => template.id === item)
   )

   React.useLayoutEffect(() => setTemplatesList(filterItems(query, templates)), [query])
   React.useLayoutEffect(() => setVariants(map(templatesList, 'title')), [templatesList])

   return (
      <div>
         <div className={classNames('flex items-center', { 'cursor-pointer': !!selectedItem })} onClick={() => handleSelectItem(undefined)}>
            {selectedItem && <ArrowIcon className="mx-4" />}
            <HeadingXl className="text-white" >Templates</HeadingXl>
         </div>
         <Hr className="mb-14" />
         {
            !selectedItem && (
               <div>
                  <SearchInput value="" variants={variants} onChange={handleSearch} />
                  <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-9">
                     {templatesList.map((item: ITemplates) => {
                        return (<TemplateItem onClick={handleSelectItem} key={item.id} {...item} />)
                     })}
                  </div>
               </div>
            )
         }
         {selectedItem && <TemplatesOverview {...selectedItem} />}
      </div>
   )
}
