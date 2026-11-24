// Roster card shown inside an article. Everything in it is typed in the editor.
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export type RosterPlayer = { role?: string | null; name: string; realName?: string | null; photo?: string | null; tag?: string | null; gold?: boolean | null };
export type RosterCard = {
  team: string; subtitle?: string | null; logo?: string | null; logoWhite?: boolean | null;
  players: RosterPlayer[]; footLabel?: string | null; footText?: string | null;
};

const SIL = '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><circle cx="50" cy="40" r="18" fill="currentColor"/><path d="M12 100c4-26 19-38 38-38s34 12 38 38z" fill="currentColor"/></svg>';

/** photos: resized photo URL per player (same order), or undefined. */
export function rosterHtml(c: RosterCard, logoSrc?: string, photos: (string | undefined)[] = []): string {
  const initials = c.team.replace(/[^A-Za-z0-9 ]/g, '').split(/\s+/).filter(Boolean).map((w) => w[0]).join('').slice(0, 3).toUpperCase();
  const badge = logoSrc
    ? `<img class="roster-logo${c.logoWhite ? ' white' : ''}" src="${esc(logoSrc)}" alt="" width="34" height="34" loading="lazy" decoding="async">`
    : `<span class="roster-badge" aria-hidden="true">${esc(initials)}</span>`;
  const anyPhoto = photos.some(Boolean);
  const tiles = c.players.map((p, i) => {
    const tba = /^(tba|tbd|\?)$/i.test(p.name.trim());
    const photo = anyPhoto
      ? `<span class="roster-photo">${photos[i] ? `<img src="${esc(photos[i]!)}" alt="${esc(p.name)}" loading="lazy" decoding="async">` : SIL}</span>`
      : '';
    const tag = p.tag ? `<span class="${p.gold ? 'roster-new' : 'roster-note'}">${esc(p.tag)}</span>` : '';
    return `<li${tba ? ' class="tba"' : ''}>${p.role ? `<span class="roster-role">${esc(p.role)}</span>` : ''}${photo}<b class="roster-name">${esc(p.name)}</b>${p.realName ? `<span class="roster-real">${esc(p.realName)}</span>` : ''}${tag}</li>`;
  }).join('');
  const coach = c.footLabel || c.footText
    ? `<span class="roster-coach">${c.footLabel ? `<span>${esc(c.footLabel)}</span>` : ''}${esc(c.footText ?? '')}</span>` : '';
  return `<figure class="roster" aria-label="${esc(c.team + (c.subtitle ? ', ' + c.subtitle : ''))}">`
    + `<div class="roster-head">${badge}<span class="roster-title"><b>${esc(c.team)}</b>${c.subtitle ? `<span>${esc(c.subtitle)}</span>` : ''}</span>${coach}</div>`
    + (tiles ? `<ul class="roster-list" style="--n:${Math.min(Math.max(c.players.length, 1), 6)}">${tiles}</ul>` : '')
    + `</figure>`;
}
