import { TemplateItem } from 'components/template-item'
import { Hr } from 'components/hr'
import { SearchInput } from 'components/search-input'
import { HeadingXl } from 'components/text/heading-xl'
import * as React from 'react'
import { games } from 'context/mocks'
import { GameObject } from 'types'
import { filterItems } from 'services/filter-items'
import { getVariants } from 'services/get-variants'

interface IProps { }

export const GameTemplate: React.FC<IProps> = () => {
   const [search, setSearch] = React.useState<string>('')
   const [gamesList, setGamesList] = React.useState(games)
   const [variants, setVariants] = React.useState<string[]>([])

   const handleSearch = (value: string) => setSearch(value)

   React.useLayoutEffect(() => setVariants(getVariants(gamesList)), [gamesList])
   React.useLayoutEffect(() => setGamesList(filterItems(search, games)), [search])

   return (
      <div>
         <HeadingXl className="text-white" >Templates</HeadingXl>
         <Hr />
         <br />
         <br />
         <SearchInput variants={variants} onChange={handleSearch} />
         <br />
         <br />
         {/* <div className="flex flex-row flex-wrap justify-start gap-14"> */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-9">
            {gamesList.map((item: GameObject) => {
               return (<TemplateItem key={item.id} {...item} />)
            })}
         </div>
      </div>
   )
}
