import { TemplateItem } from 'components/template-item'
import { Hr } from 'components/hr'
import { SearchInput } from 'components/search-input'
import { HeadingXl } from 'components/text/heading-xl'
import * as React from 'react'
import { games } from 'context/mocks'
import { GameObject } from 'types'

interface IProps { }

export const GameTemplate: React.FC<IProps> = () => {
   return (
      <div>
         <HeadingXl className="text-white" >Templates</HeadingXl>
         <Hr />
         <br />
         <br />
         <SearchInput onChange={console.log} />
         <br />
         <br />
         <div className="flex flex-row flex-wrap justify-start gap-14">
            {games && games.map((item: GameObject) => {
               return (<TemplateItem key={item.id} {...item} />)
            })}
         </div>
      </div>
   )
}
