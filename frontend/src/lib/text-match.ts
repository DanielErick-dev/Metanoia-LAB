export function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function matchesQuery(text: string, query: string): boolean {
  const q = normalize(query);
  return q.length > 0 && wordStarts(text, q);
}

export function wordStarts(text: string, q: string): boolean {
  const t = normalize(text);
  let i = t.indexOf(q);
  while (i !== -1) {
    if (i === 0 || !/[a-z]/.test(t[i - 1])) return true;
    i = t.indexOf(q, i + 1);
  }
  return false;
}
