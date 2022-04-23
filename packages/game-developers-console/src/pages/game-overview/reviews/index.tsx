import * as React from 'react'
import { IComponentProps } from 'types'
import { ReviewCard } from 'components/review-item'
import { HeadingXl } from 'components/text/heading-xl'
import { Review } from '@asylum-ui/connection-library'
import { Paragraph } from 'components/text/paragraph'
import { Card } from 'components/card'

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
