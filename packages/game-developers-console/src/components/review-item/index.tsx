import * as React from 'react'

import { Review } from '@asylum-ui/connection-library'

import { Avatar } from 'components/avatar'
import { Card } from 'components/card'
import { RatingStarsComponent } from 'components/rating-star'
import { Paragraph } from 'components/text/paragraph'
import { formatAddress } from 'utils'

interface IReviewProps {
   review: Review
}

export const ReviewCard: React.FC<IReviewProps> = ({ review }) => {
   return (
      <Card>
         <div className="flex flex-col justify-between gap-5">
            <div className="flex flex-row justify-between">
               <div className="flex items-center">
                  <Avatar />
                  <div className="pl-4">
                     <Paragraph>{formatAddress(review.address)}</Paragraph>
                  </div>
               </div>
               <div className="flex justify-center items-center">
                  <RatingStarsComponent rating={review.rating} />
               </div>
            </div>
            <Paragraph>{review.text}</Paragraph>
         </div>
      </Card>
   )
}
