// components/blob-avatar.tsx
import { cn } from '@lib/utils'
import { User } from 'lucide-react'
import Image from 'next/image'

interface BlobAvatarProps {
  src?: string
  alt?: string
  className?: string
}

export function BlobAvatar({ src, alt = 'Avatar', className }: BlobAvatarProps) {
  // Path bạn cung cấp
  const blobPath =
    'M76.9891 261.319C82.3335 265.121 40.7154 284.267 71.8071 338.308C82.7948 357.405 117.96 370.14 157.679 347.931C178.407 365.698 200.198 384.449 271.172 372.223C338.769 360.579 390.023 308.917 389.87 254.544C418.486 236.757 436.371 207.989 433.503 178.887C431.681 160.4 421.786 144.882 406.839 134.096C414.612 118.236 418.206 101.125 416.511 83.9276C410.865 26.6523 348.753 -9.86762 277.78 2.35815C232.777 10.1102 195.024 35.6023 174.855 67.8199C157.505 64.2775 138.447 63.9009 118.7 67.3025C47.7265 79.5282 -5.23274 135.87 0.412497 193.145C4.52822 234.902 31.2938 252.472 76.9891 261.319Z'

  return (
    <div className={cn('relative w-full h-full', className)}>
      <svg
        viewBox="0 0 434 377"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          <clipPath id="avatar-blob-clip">
            <path d={blobPath} />
          </clipPath>
        </defs>

        {/* Nền mặc định bên dưới ảnh (Màu cam Primary) */}
        <path d={blobPath} fill="currentColor" className="text-primary" />

        {/* Gắn ảnh vào và cắt (clip) theo hình dạng path */}
        <g clipPath="url(#avatar-blob-clip)">
          {src ? (
            <foreignObject width="100%" height="100%">
              <div className="relative w-[110%] h-[110%] -left-[5%] -top-[5%]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover object-center"
                  priority // Ưu tiên load ảnh này vì nó ở màn hình đầu tiên
                />
              </div>
            </foreignObject>
          ) : (
            /* Icon placeholder nếu chưa truyền src ảnh vào */
            <foreignObject width="100%" height="100%">
              <div className="flex items-center justify-center w-full h-full text-white/50">
                <User size={100} strokeWidth={1.5} />
              </div>
            </foreignObject>
          )}
        </g>
      </svg>
    </div>
  )
}
