import * as React from 'react'

import { useQuery } from 'react-query'

import { fetchItemsWithMetadata } from '../../api'
import { ListCardItem } from '../../components/list-card-item'
import { Page } from '../../layout/page'
import { GridItems } from '../../layout/page/grid-items'

// interface IGameItems {}

export const GameItems = () => {
   const { data: itemsWithMetadata, isSuccess } = useQuery('items', fetchItemsWithMetadata)
   return (
      <Page title="Items">
         {isSuccess ? (
            <GridItems>
               {itemsWithMetadata.map((item) => {
                  const key = `${item.id}${item.templateId}`
                  return (
                     <ListCardItem
                        title={item.name}
                        img={item.img}
                        id={key}
                        description={item.description}
                        address={item.owner.AccountId}
                        key={key}
                     />
                  )
               })}
            </GridItems>
         ) : (
            'loading'
         )}
      </Page>
   )
}
