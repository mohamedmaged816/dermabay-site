export function ogImageName(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  if (trimmed === '') return 'home.png';
  return `${trimmed.replace(/\//g, '-')}.png`;
}
