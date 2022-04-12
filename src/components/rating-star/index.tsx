import * as React from 'react'
import { ReactComponent as FillStarIcon } from 'assets/svg/fill-star.svg'
import { ReactComponent as HalfStarIcon } from 'assets/svg/half-star.svg'
import { ReactComponent as EmptyStarIcon } from 'assets/svg/empty-star.svg'

interface IProps {
   rating: number
}

export const RatingStarsComponent: React.FC<IProps> = ({ rating = 0 }) => {
   const starFilter = (): React.ReactNode => {
      const starArray: React.ReactNode[] = []
      for (let i = 0; i < 5; i++) {
         if (rating <= i) {
            starArray.push(<EmptyStarIcon key={i} />)
         } else if (rating > i && rating < i + 1) {
            starArray.push(<HalfStarIcon key={i} />)
         } else {
            starArray.push(<FillStarIcon key={i} />)
         }
      }
      return starArray
   }

   return <div className="flex gap-3">{starFilter()}</div>
}
