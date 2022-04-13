import * as React from 'react'
import { IComponentProps, Review } from 'types'
import { ReviewCard } from 'components/review-item'
import { HeadingXl } from 'components/text/heading-xl'

interface IProps extends IComponentProps {
   reviews: Review[]
}

export const Reviews: React.FC<IProps> = ({ reviews, className }) => {
   return (
      <>
         <HeadingXl className="text-white mb-5">Reviews</HeadingXl>
         <div className="flex flex-col">
            {reviews.map((review) => (
               <ReviewCard key={review.id} review={review} />
            ))}
         </div>
      </>
   )
}
