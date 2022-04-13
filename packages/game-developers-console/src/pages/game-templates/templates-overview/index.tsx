import * as React from 'react'
import { Card } from 'components/card'
import { ITemplates } from 'types'

interface IProps extends ITemplates { }

export const TemplatesOverview: React.FC<IProps> = ({ title, img, description, id }) => {
   return (
      <Card>
         Temptales Overview
      </Card>
   )
}
