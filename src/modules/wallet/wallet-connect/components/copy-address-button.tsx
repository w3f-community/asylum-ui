import * as React from 'react'
import { Button } from 'components/button'
import { ReactComponent as CheckmarkIcon } from 'assets/svg/checkmark.svg'
import { ReactComponent as CopyIcon } from 'assets/svg/copy.svg'
import classNames from 'classnames'
import { formatAddress } from 'utils'

interface IProps {
   address: string
}

export const CopyAddressButton: React.FC<IProps> = ({ address }) => {
   const [copied, setCopied] = React.useState(false)

   return (
      <Button
         variant={copied ? 'success' : 'light'}
         size="lg"
         className="flex gap-3 items-center basis-48"
         onClick={() => {
            navigator.clipboard.writeText(address)
            setCopied(true)
         }}
      >
         {copied ? (
            <CheckmarkIcon className="fill-white" />
         ) : (
            <CopyIcon
               className={classNames({
                  'group-hover:fill-white': !copied,
               })}
            />
         )}
         {copied ? 'Address copied' : formatAddress(address)}
      </Button>
   )
}
