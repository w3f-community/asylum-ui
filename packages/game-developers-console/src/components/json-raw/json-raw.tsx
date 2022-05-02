import * as React from 'react'
import { useEffect } from 'react'

import classNames from 'classnames'
import hljs from 'highlight.js'

import { ReactComponent as CheckmarkIcon } from 'assets/svg/checkmark.svg'
import { ReactComponent as CopyIcon } from 'assets/svg/copy.svg'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   metadata: any
   copyButtonClassName?: string
}

export const JsonRaw: React.FC<IProps> = ({ metadata, className, copyButtonClassName }) => {
   const [copied, setCopied] = React.useState(false)
   const copiedMessage = copied ? 'copied' : 'copy'
   const copiedIcon = copied ? <CheckmarkIcon /> : <CopyIcon />

   useEffect(() => {
      setCopied(false)
   }, [metadata])

   const metadataString = JSON.stringify(metadata, null, 2)
   const metadataHtml = hljs.highlight('json', metadataString).value

   return (
      <div
         className={classNames('bg-white text-gray-700 p-4 text-sm rounded-xl relative', className)}
      >
         <div
            className={classNames(
               'flex gap-3 items-center basis-48 !absolute top-2 right-3 hover:bg-gray-200 cursor-pointer py-2 px-4 rounded-xl transition-all text-base flex items-center gap-2 font-secondary',
               copyButtonClassName
            )}
            onClick={() => {
               navigator.clipboard.writeText(metadataString)
               setCopied(true)
            }}
         >
            {copiedIcon} {copiedMessage}
         </div>
         <pre
            className="hljs-json overflow-auto"
            dangerouslySetInnerHTML={{ __html: metadataHtml }}
         />
      </div>
   )
}
