import { Review } from '../../types'
import * as React from 'react'
import { Card } from '../card'
import { Avatar } from '../avatar'
import { Paragraph } from '../text/paragraph'
import { RatingStarsComponent } from '../rating-star'

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
                     <Paragraph>0x53D3.....G4T8</Paragraph>
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
