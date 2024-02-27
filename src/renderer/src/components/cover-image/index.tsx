import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import { cn } from 'renderer/utils'

interface ICoverProps {
  content: string
  src?: string
  className?: string
}

function CoverImage({ content, src, className }: ICoverProps) {
  const [image, setImage] = useState(src)

  useEffect(() => {
    if (src) return
    setTimeout(() => {
      const container = document.createElement('div')

      container.className = 'prose prose-zinc mx-auto dark:prose-invert'
      container.innerHTML = content
      document.body.append(container)
      html2canvas(container, { backgroundColor: null }).then((canvas) => {
        setImage(canvas.toDataURL('image/png'))
      })
      document.body.removeChild(container)
    }, 1000)
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
