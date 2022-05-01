import * as React from 'react'

import { Card } from 'components/card'
import { ReviewCard } from 'components/review-item'
import { HeadingXl } from 'components/text/heading-xl'
import { Paragraph } from 'components/text/paragraph'

import { Review } from '@asylum-ui/connection-library'

import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   reviews: Review[]
}

export const Reviews: React.FC<IProps> = ({ reviews }) => {
   return (
      <>
         <HeadingXl className="text-white mb-5">Reviews</HeadingXl>
         <div className="flex flex-col gap-9">
            {reviews.map((review) => (
               <ReviewCard key={review.id} review={review} />
            ))}
            {reviews.length === 0 && (
               <Card>
                  <Paragraph>No reviews yet.</Paragraph>
               </Card>
            )}
         </div>
      </>
   )
}
