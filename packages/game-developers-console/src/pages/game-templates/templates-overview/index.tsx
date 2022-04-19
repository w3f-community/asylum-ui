import * as React from 'react'
import { Card } from 'components/card'
import { IInterpretation, ITemplate } from 'types'
import { HeadingLg } from 'components/text/heading-lg'
import { Heading } from 'components/text/heading'
import { Carousel } from 'react-responsive-carousel'
import { Paragraph } from 'components/text/paragraph'
import { HeadingXl } from 'components/text/heading-xl'
import { interpretations } from 'context/mocks'
import { Interpretation } from './interpretations'

interface IProps extends ITemplate {}

export const TemplatesOverview: React.FC<IProps> = () => {
   const [interpretationsList, setInterpretationsList] =
      React.useState<IInterpretation[]>(interpretations)

   const handleSearch = (value: string) => {
      const newList = interpretations.filter((item) => {
         return item.name.toLowerCase().includes(value.toLowerCase())
      })
      setInterpretationsList(newList)
   }

   const variantFilter = () => interpretationsList.map((item: IInterpretation) => item.name)

   return (
      <>
         <Card className="mb-20">
            <div className="flex flex-col">
               <div className="w-full flex gap-9">
                  <div className="basis-7/12 flex gap-12 pr-20 mb-5">
                     <div>
                        <HeadingLg>Temptales Overview</HeadingLg>
                     </div>
                     <div className="flex gap-4">
                        <Heading>Id:</Heading>
                        <Heading className="!font-light text-gray-700">{'test'}</Heading>
                     </div>
                  </div>
                  <div className="basis-5/12 flex gap-4">
                     <Heading>Issuer:</Heading>
                     <Heading className="!font-light text-gray-700">{'test'}</Heading>
                  </div>
               </div>
               <div className="w-full flex gap-9 mb-5">
                  <div className="basis-7/12">
                     <Heading>Name of the interpretation</Heading>
                  </div>
                  <div className="basis-5/12">
                     <Heading>Description</Heading>
                  </div>
               </div>
               <div className="w-full flex gap-9">
                  <div className="basis-7/12">
                     <Carousel
                        className="demo-carousel overflow-hidden"
                        showIndicators={false}
                        showArrows={true}
                        showThumbs={true}
                        showStatus={false}
                     >
                        <img
                           src="https://www.usitility.com/media/software/screenshots/screenshot-fortnite-battle-royale-13268.webp"
                           className="aspect-video object-cover object-center"
                           alt="Your games"
                        />
                        <img
                           src="https://www.usitility.com/media/software/screenshots/screenshot-fortnite-battle-royale-13268.webp"
                           className="aspect-video object-cover object-center"
                           alt="Your games"
                        />
                        <img
                           src="https://www.usitility.com/media/software/screenshots/screenshot-fortnite-battle-royale-13268.webp"
                           className="aspect-video object-cover object-center"
                           alt="Your games"
                        />
                     </Carousel>
                  </div>
                  <div className="basis-5/12">
                     <Paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fermentum
                        tellus libero, vitae tristique lacus rutrum et. Duis fermentum, tortor
                        mollis maximus porttitor, leo elit semper nibh, vitae tincidunt justo magna
                        vitae metus.Nulla quis dignissim dolor. Sed scelerisque sapien purus, id
                        eleifend neque sodales et. Cras faucibus vehicula purus in volutpat. Duis
                        posuere eros ac rhoncus lacinia. Vestibulum elit ipsum, mollis pharetra erat
                        id, volutpat tristique magna. Mauris eu blandit elit. Phasellus nec
                        condimentum nibh. In hac habitasse platea dictumst. Nunc consectetur odio
                        ante, id rutrum elit pulvinar vel. Vestibulum elit ipsum, mollis pharetra
                        erat id, volutpat tristique magna.
                     </Paragraph>
                  </div>
               </div>
            </div>
         </Card>

         <HeadingXl className="text-white mb-20">Interpretations</HeadingXl>

         {/* <div className="mb-16">
            <SearchInput onChange={handleSearch} value="" variants={variantFilter()} />
         </div> */}

         {interpretationsList.map((interpretation: IInterpretation, index: number) => {
            return (
               <Interpretation
                  key={index}
                  name={interpretation.name}
                  img={interpretation.img}
                  type={interpretation.type}
                  description={interpretation.description}
                  properties={interpretation.properties}
               />
            )
         })}
      </>
   )
}
