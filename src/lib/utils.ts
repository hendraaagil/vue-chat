export function formatDate(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function replaceFileAttachments(text: string): string {
  return text.replace(/\[file\].*?\[\/file\]/gs, 'File attachment')
}
