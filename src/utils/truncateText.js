export function truncateText(text = '', maxLength = 80) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
