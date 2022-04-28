import * as React from 'react'
import classNames from 'classnames'
import { IComponentProps } from 'types'
import { InputLabel } from 'components/input-label'
import { ReactComponent as IpfsIcon } from 'assets/svg/ipfs.svg'
import { Paragraph } from 'components/text/paragraph'
import { useEffect } from 'react'

interface IProps extends IComponentProps {
   name: string
   label?: string
   value?: string
   onChange?: (file: File) => void
   onLoad?: (buffer: ArrayBuffer) => void
}

export const InputFileUpload: React.FC<IProps> = ({
   name,
   label,
   value,
   onChange,
   onLoad,
   className,
}) => {
   const [image, setImage] = React.useState<string | null>(null)
   const [file, setFile] = React.useState<File | null>(null)

   useEffect(() => {
      if (!value) {
         setFile(null)
         setImage(null)
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
            htmlFor={`${name}-file-upload`}
            className="block border-dashed border-2 border-white  cursor-pointer rounded-2xl overflow-hidden"
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
                  {!file && 'or'} <span className="text-asylum-blue underline">Browse Files</span>
               </Paragraph>
            </div>
         </label>
         <input
            id={`${name}-file-upload`}
            name={name}
            type="file"
            className="hidden"
            onChange={handleChange}
         />
      </div>
   )
}
