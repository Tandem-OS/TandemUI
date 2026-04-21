export function renderStars(rating: number): ('filled' | 'empty')[] {
  if (rating < 1 || rating > 5) {
    throw new Error(`renderStars: rating must be between 1 and 5, received ${rating}`);
  }
  return Array.from({ length: 5 }, (_, i) => (i < rating ? 'filled' : 'empty'));
}

export function formatSpeakers(speakers: string[], label: string): string {
  if (!speakers || speakers.length === 0) {
    throw new Error('formatSpeakers: speakers array is required and must not be empty');
  }
  if (!label || !label.trim()) {
    throw new Error('formatSpeakers: label is required');
  }
  return `${label}: ${speakers.join(', ')}`;
}

export function formatAuthorLine(name: string, role: string): string {
  if (!name || !name.trim()) throw new Error('formatAuthorLine: name is required');
  if (!role || !role.trim()) throw new Error('formatAuthorLine: role is required');
  return `${name} — ${role}`;
}