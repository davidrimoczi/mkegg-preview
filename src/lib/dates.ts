// Publish times are Budapest time. The editor saves times like "2026-11-22T05:55" with no
// timezone; without this, the build server (UTC) would read them an hour or two off.

const TZ = 'Europe/Budapest';

/** Offset of Budapest from UTC, in minutes, at a given moment (CET +60, CEST +120). */
function budapestOffsetMinutes(at: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(at);
  const get = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  const asUTC = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
  return Math.round((asUTC - at.getTime()) / 60000);
}

/** Turn whatever the editor saved into a real moment in time, reading bare times as Budapest time. */
export function toBudapestDate(v: unknown): unknown {
  if (v instanceof Date) return v;
  if (typeof v !== 'string') return v;
  const s = v.trim();
  if (/[zZ]$|[+-]\d\d:?\d\d$/.test(s)) return new Date(s); // already has a timezone
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?$/);
  if (!m) return new Date(s);
  const [, y, mo, d, h = '12', mi = '00', se = '00'] = m; // a bare date means midday
  const naive = Date.UTC(+y, +mo - 1, +d, +h, +mi, +se);
  const offset = budapestOffsetMinutes(new Date(naive));
  return new Date(naive - offset * 60000);
}
