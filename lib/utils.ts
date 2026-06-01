export function money(n: number) {
  return '$' + n.toFixed(2);
}

export function fmtDate(d: string) {
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function isClosed(cutoffStr: string) {
  return new Date(cutoffStr) < new Date('2026-05-31T12:00:00');
}

export function fmtCutoff(cutoffStr: string) {
  return new Date(cutoffStr).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
