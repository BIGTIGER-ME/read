import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import { cn } from 'renderer/utils'
import { runTask } from './utils'

interface ICoverProps {
  content: string
  src?: string
  className?: string
}

const cache: { [content: string]: string } = {}

function CoverImage({ content, src, className }: ICoverProps) {
  const [image, setImage] = useState(src)

  useEffect(() => {
    if (src) return
    if (cache[content]) {
      setImage(cache[content])
    } else {
      runTask(() => {
        const container = document.createElement('div')

        container.className = 'prose prose-zinc mx-auto dark:prose-invert'
        container.innerHTML = content
        document.body.append(container)
        html2canvas(container, { backgroundColor: null }).then((canvas) => {
          const image = canvas.toDataURL('image/png')

          setImage(image)
          cache[content] = image
        })
        document.body.removeChild(container)
      })
    }
  }, [content, setImage])

  return (
    <div
      className={cn(
        'bg-no-repeat',
        { 'bg-[center_top_1rem]': !src, 'bg-center': !!src },
        className
      )}
      style={{ backgroundImage: `url(${image})`, backgroundSize: src ? 'cover' : '90%' }}
    />
  )
}

export default CoverImage
