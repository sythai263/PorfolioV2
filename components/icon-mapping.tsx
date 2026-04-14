import { FC } from 'react'

// 1. Import từ simple-icons gốc để LẤY ĐƯỢC MÀU MẶC ĐỊNH
import {
  siDocker,
  siExpress,
  siFigma,
  siGit,
  siGraphql,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siShopify,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons'

// 2. Lucide cho các icon công cụ chung (không có màu thương hiệu)
import {
  Cloud,
  Code,
  Cpu,
  Database,
  Globe,
  Layers,
  Package,
  Server,
  Terminal,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

// 3. Gom nhóm Brand (Tự động chứa sẵn màu .hex và .path)
const brandIcons: Record<string, SimpleIcon> = {
  react: siReact,
  nextjs: siNextdotjs,
  typescript: siTypescript,
  tailwind: siTailwindcss,
  nodejs: siNodedotjs,
  express: siExpress,
  postgresql: siPostgresql,
  mongodb: siMongodb,
  git: siGit,
  docker: siDocker,
  figma: siFigma,
  python: siPython,
  graphql: siGraphql,
  redis: siRedis,
  mysql: siMysql,
  nestjs: siNestjs,
  shopify: siShopify,
}

// 4. Gom nhóm Generic (Màu tùy chỉnh hoặc mặc định)
const genericIcons: Record<string, LucideIcon> = {
  database: Database,
  cloud: Cloud,
  code: Code,
  cpu: Cpu,
  server: Server,
  globe: Globe,
  package: Package,
  layers: Layers,
  terminal: Terminal,
  wrench: Wrench,
}

interface TechIconProps {
  iconName: string
  size?: number | string
  className?: string
  defaultColor?: string // Màu dự phòng cho Lucide icon
}

export const TechIconComponent: FC<TechIconProps> = ({
  iconName,
  size = 24,
  className = '',
  defaultColor = '#6B7280', // Xám nhạt cho icon generic
}) => {
  // Chuẩn hóa tên đầu vào (chỉ cần so sánh lowercase nguyên khối)
  const normalizedName = iconName.trim().toLowerCase()

  // TH1: Nếu là Brand Icon -> Render SVG và tự động lấy màu hex của hãng
  const brandIcon = brandIcons[normalizedName]
  if (brandIcon) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        fill={`#${brandIcon.hex}`} // ĐÂY LÀ ĐIỂM ĂN TIỀN: Tự động lên màu chuẩn!
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{brandIcon.title}</title>
        <path d={brandIcon.path} />
      </svg>
    )
  }

  // TH2: Nếu là Generic Icon (Lucide) -> Render component với màu default
  const GenericIcon = genericIcons[normalizedName]
  if (GenericIcon) {
    return <GenericIcon size={size} className={className} color={defaultColor} />
  }

  // TH3: Fallback nếu truyền sai tên
  return <Code size={size} className={className} color={defaultColor} />
}

// Phục vụ cho việc map/render list
export const iconCategories = {
  frontend: ['react', 'nextjs', 'typescript', 'tailwind'],
  backend: ['nodejs', 'express', 'postgresql', 'mongodb', 'python', 'graphql', 'redis', 'shopify'],
  tools: ['git', 'docker', 'aws', 'figma'],
  generic: [
    'database',
    'cloud',
    'code',
    'cpu',
    'server',
    'globe',
    'package',
    'layers',
    'terminal',
    'wrench',
    'shopify',
  ],
}
