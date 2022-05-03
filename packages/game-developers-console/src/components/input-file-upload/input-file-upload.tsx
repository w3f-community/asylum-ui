import * as React from 'react'
import { useEffect, useState } from 'react'

import classNames from 'classnames'
import { InputLabel } from 'components/input-label'
import { Paragraph } from 'components/text/paragraph'
import { uniqueId } from 'lodash/fp'

import { ReactComponent as IpfsIcon } from 'assets/svg/ipfs.svg'
import { IComponentProps } from 'types'
import { getFile } from 'utils'

interface IProps extends IComponentProps {
   accept?: string
   name: string
   label?: string
   value?: string
   errorMessage?: string
   onChange?: (file: File) => void
   onLoad?: (buffer: ArrayBuffer) => void
}

export const InputFileUpload: React.FC<IProps> = ({
   name,
   accept = '*',
   label,
   value,
   onChange,
   onLoad,
   errorMessage,
   className,
}) => {
   const [inputId] = useState(uniqueId(name))
   const [image, setImage] = React.useState<string | null>(null)
   const [file, setFile] = React.useState<File | null>(null)

   useEffect(() => {
      if (!value) {
         setFile(null)
         setImage(null)
      } else {
         console.log('value', value)
         if (!value.startsWith('http') && !value.startsWith('/')) {
            getFile(value).then(setImage)
         } else {
            setImage(value)
         }
      }
   }, [value])

   const handleUpload = (file: File) => {
      const reader = new FileReader()
      setFile(file)
      onChange && onChange(file)
      reader.addEventListener('load', () => {
         onLoad && onLoad(reader.result as ArrayBuffer)
         if (file.type.startsWith('image')) {
            const image = reader.result as string
            setImage(image)
         } else {
            setImage(null)
         }
      })
      reader.readAsDataURL(file)
   }

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
         const file = event.target.files[0]
         handleUpload(file)
      }
   }

   return (
      <div>
         <div
            className={classNames('w-full relative', className)}
            onDragOver={(e) => {
               e.preventDefault()
            }}
            onDrop={(event) => {
               event.preventDefault()
               event.stopPropagation()
               const file = event.dataTransfer.files[0]
               handleUpload(file)
            }}
         >
            {label && <InputLabel className="mb-2">{label}</InputLabel>}
            <label
               htmlFor={`${inputId}-file-upload`}
               className={classNames(
                  'block border-dashed border-2 cursor-pointer rounded-2xl overflow-hidden',
                  errorMessage ? 'border-red-500' : 'border-white'
               )}
            >
               <div
                  style={image ? { backgroundImage: `url(${image})` } : {}}
                  className={classNames(
                     'before:bg-gray-700 before:absolute before:inset-0 before:rounded-xl relative w-full h-full flex flex-col gap-1 py-12 items-center grow bg-cover bg-center',
                     {
                        'bg-gradient-active': file !== null && image === null,
                     },
                     image === null ? 'before:opacity-20' : 'before:opacity-60 '
                  )}
               >
                  <IpfsIcon className="fill-white w-9 h-9 mb-4 z-10" />
                  <Paragraph className="z-10">
                     {!file ? 'Attach interpretation source here' : file.name}
                  </Paragraph>
                  <Paragraph className="z-10">
                     {!file && 'or'}{' '}
                     <span className="text-asylum-blue underline">Browse Files</span>
                  </Paragraph>
               </div>
            </label>
            <input
               id={`${inputId}-file-upload`}
               name={name}
               type="file"
               className="hidden"
               accept={accept}
               onChange={handleChange}
            />
         </div>
         {errorMessage && <Paragraph className="text-red-400 ml-2 mt-2">{errorMessage}</Paragraph>}
      </div>
   )
}
