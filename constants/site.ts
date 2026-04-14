import { NavigationItem } from '@app-types'

export const SITE_METADATA = {
  title: 'Sy Thai - Backend Engineer',
  description: 'Portfolio of Sy Thai, a Backend Engineer specializing in modern web technologies.',
  url: 'https://sythai.vn',
  author: 'Sy Thai',
  keywords: ['Backend Engineer', 'Web Developer', 'React', 'Next.js', 'TypeScript'],
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Home',
    href: '#home',
    icon: 'Home',
  },
  {
    label: 'About',
    href: '#about',
    icon: 'User',
  },
  {
    label: 'Projects',
    href: '#projects',
    icon: 'Code',
  },
  {
    label: 'Experience',
    href: '#experience',
    icon: 'Briefcase',
  },
  {
    label: 'Skills',
    href: '#skills',
    icon: 'Cpu',
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: 'Mail',
  },
]

export const SOCIAL_LINKS = [
  {
    platform: 'GitHub',
    url: 'https://github.com/sythai263',
    icon: 'Github',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/sythai263',
    icon: 'Linkedin',
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/sythai263',
    icon: 'Twitter',
  },
]

export const PROJECT_CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'design', label: 'Design' },
  { value: 'other', label: 'Other' },
]

export const SKILL_LEVELS = {
  beginner: { label: 'Beginner', color: 'bg-red-500' },
  intermediate: { label: 'Intermediate', color: 'bg-yellow-500' },
  advanced: { label: 'Advanced', color: 'bg-blue-500' },
  expert: { label: 'Expert', color: 'bg-green-500' },
}

export const CONTACT_INFO = {
  email: 'sythai263@gmail.com',
  phone: '+84 39 666 6666',
  location: 'Hanoi, Vietnam',
}
