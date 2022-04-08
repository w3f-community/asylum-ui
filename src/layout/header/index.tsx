import * as React from 'react'
import { Hr } from 'components/hr'
import { Button } from 'components/button'
import { Modal } from 'components/modal'

import { IComponentProps } from 'types'

interface IProps extends IComponentProps {}

export const Header: React.FC<IProps> = () => (
   <header>
      <div className="container mx-auto flex justify-end">
         <div className="w12">
            <div className="mb-4">
               <Button variant="dark" size="sm">
                  connect wallet
               </Button>
            </div>
            <Hr />
         </div>
      </div>
      <Modal open={false} title="Connect Wallet">
         Modal
      </Modal>
   </header>
)
