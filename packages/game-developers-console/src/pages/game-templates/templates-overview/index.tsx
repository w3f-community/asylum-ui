import * as React from 'react'
import { Card } from 'components/card'
import { IInterpretation, ITemplates } from 'types'
import { HeadingLg } from 'components/text/heading-lg'
import { Heading } from 'components/text/heading'
import { Carousel } from 'react-responsive-carousel'
import { Paragraph } from 'components/text/paragraph'
import { HeadingXl } from 'components/text/heading-xl'
import { SearchInput } from 'components/search-input'
import { interpretations } from 'context/mocks'
import { Button } from 'components/button'
import { ReactComponent as EditIcon } from 'assets/svg/edit.svg'
import { ReactComponent as TrashIcon } from 'assets/svg/trash.svg'

interface IProps extends ITemplates { }

export const TemplatesOverview: React.FC<IProps> = ({ title, img, description, id }) => {
   const [interpretationsList, setInterpretationsList] = React.useState<IInterpretation[]>(interpretations)

   return (
      <>
         <Card className="mb-20" >
            <div className="flex flex-col">
               <div className="w-full flex gap-9">
                  <div className="basis-7/12 flex gap-12 pr-20 mb-5">
                     <div>
                        <HeadingLg>
                           Temptales Overview
                        </HeadingLg>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fermentum tellus libero, vitae tristique lacus rutrum et. Duis fermentum, tortor mollis maximus porttitor, leo elit semper nibh, vitae tincidunt justo magna vitae metus.Nulla quis dignissim dolor. Sed scelerisque sapien purus, id eleifend neque sodales et. Cras faucibus vehicula purus in volutpat. Duis posuere eros ac rhoncus lacinia. Vestibulum elit ipsum, mollis pharetra erat id, volutpat tristique magna. Mauris eu blandit elit. Phasellus nec condimentum nibh. In hac habitasse platea dictumst. Nunc consectetur odio ante, id rutrum elit pulvinar vel.
                        Vestibulum elit ipsum, mollis pharetra erat id, volutpat tristique magna.
                     </Paragraph>
                  </div>
               </div>
            </div>
         </Card>

         <HeadingXl className="text-white mb-20" >Interpretations</HeadingXl>

         {/* <SearchInput /> */}

         {interpretationsList.map((interpretation: IInterpretation, index: number) => {
            return (
               <Card
                  className="mb-14"
                  key={index}
               >
                  <div className="relative left-full h-0 cursor-pointer" onClick={() => console.log('edit id : ', index)}>
                     <EditIcon />
                  </div>
                  <div className="relative left-[93%] top-[-1px] h-0 cursor-pointer" onClick={() => console.log('trash id : ', index)}>
                     <TrashIcon />
                  </div>
                  <div className="flex flex-row gap-8">
                     <div className="flex flex-col gap-5 w-44 min-w-20" >
                        <img className="aspect-square object-cover" src={img} alt="your interpretation" />
                        <Button variant="dark" className="w-full">SOURCE</Button>
                     </div>
                     <div className="flex flex-col gap-4 h-60 overflow-auto no-scrollbar">
                        <Heading>Description :</Heading>
                        <Paragraph >{interpretation.description}</Paragraph>
                        <Heading>Properties :</Heading>
                        {Object.entries(interpretation.properties).map((item, index) => {
                           return (<Paragraph key={index}>{item[0]}: {item[1]}</Paragraph>)
                        })}
                        {/* <Paragraph >{interpretation.properties}</Paragraph> */}
                     </div>
                  </div>
               </Card>
            )
         })}
      </>
   )
}
