import { TemplateItem } from 'components/template-item'
import { Hr } from 'components/hr'
import { SearchInput } from 'components/search-input'
import { HeadingXl } from 'components/text/heading-xl'
import * as React from 'react'
import { ITemplates } from 'types'
import { debounce, map } from 'lodash'

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

   const handleSearch = debounce((value: string) => setQuery(value), 200)

   React.useLayoutEffect(() => setTemplatesList(filterItems(query, templates)), [query])
   React.useLayoutEffect(() => setVariants(map(templatesList, 'title')), [templatesList])

   return (
      <div>
         <HeadingXl className="text-white" >Templates</HeadingXl>
         <Hr className="mb-14" />
         <SearchInput value="" variants={variants} onChange={handleSearch} />
         <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-9">
            {templatesList.map((item: ITemplates) => {
               return (<TemplateItem key={item.id} {...item} />)
            })}
         </div>
      </div>
   )
}
