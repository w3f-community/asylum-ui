import { Review } from 'types'
import * as React from 'react'
import { Card } from 'components/card'
import { Avatar } from 'components/avatar'
import { Paragraph } from 'components/text/paragraph'
import { RatingStarsComponent } from 'components/rating-star'
import { formatAddress } from 'utils'
import { MOCK_ADDRESS } from 'context/mocks'

interface IReviewProps {
   review: Review
}

export const ReviewCard: React.FC<IReviewProps> = ({ review }) => {
   return (
      <Card className="mb-9">
         <div className="flex flex-col justify-between gap-5">
            <div className="flex flex-row justify-between">
               <div className="flex items-center">
                  <Avatar />
                  <div className="pl-4">
                     <Paragraph>{formatAddress(MOCK_ADDRESS)}</Paragraph>
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
