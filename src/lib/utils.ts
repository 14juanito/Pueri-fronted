import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function truncate(str: string, length: number) {
  return str.length > length ? str.substring(0, length) + '...' : str
}

export function isImageFile(filename: string) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
  const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase()
  return imageExtensions.includes(ext)
}

export function getFileIcon(filename: string) {
  const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase()
  
  const icons: Record<string, string> = {
    '.pdf': '📄',
    '.doc': '📝',
    '.docx': '📝',
    '.xls': '📊',
    '.xlsx': '📊',
    '.ppt': '📑',
    '.pptx': '📑',
    '.jpg': '🖼️',
    '.jpeg': '🖼️',
    '.png': '🖼️',
    '.gif': '🖼️',
    '.zip': '📦',
    '.rar': '📦',
    '.txt': '📄',
    '.csv': '📊',
  }
  
  return icons[ext] || '📄'
}
