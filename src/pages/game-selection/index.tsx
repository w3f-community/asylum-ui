import * as React from 'react'
import { GameTable } from 'components/game-table'
import { Hr } from 'components/hr'
import { HeadingXl } from 'components/text/heading-xl'
import { games } from 'context/mocks'
import BN from 'bn.js'
import chunk from 'lodash/chunk'
import { getRandomAvatar } from '../../utils'

export const GameList = () => {
   const hexAddress = '2af09dcc61e1dc3d70a000a325d3db9893c8045a8525de8fd6eb50d95fd6687c0ec496'

   const seeds = chunk(hexAddress, 4).map((item) =>
      parseFloat('0.' + new BN(item.join(''), 16).toString(10))
   )

   console.log(seeds)

   const avatar = getRandomAvatar(seeds, 10)
   return (
      <div className="container mx-auto">
         <HeadingXl className="text-white">Select a game</HeadingXl>
         <Hr />
         <div className="py-6">

            <GameTable games={games} />
         </div>
      </div>
   )
}
