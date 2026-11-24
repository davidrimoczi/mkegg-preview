// Roster card shown inside an article. Everything in it is typed in the editor.
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export type RosterCard = {
  team: string; subtitle?: string | null; logo?: string | null;
  players: { role?: string | null; name: string; realName?: string | null; tag?: string | null; gold?: boolean | null }[];
  footLabel?: string | null; footText?: string | null;
};

export function rosterHtml(c: RosterCard, logoSrc?: string): string {
  const initials = c.team.replace(/[^A-Za-z0-9 ]/g, '').split(/\s+/).filter(Boolean).map((w) => w[0]).join('').slice(0, 3).toUpperCase();
  const badge = logoSrc
    ? `<img class="roster-logo" src="${esc(logoSrc)}" alt="" width="44" height="44" loading="lazy" decoding="async">`
    : `<span class="roster-badge" aria-hidden="true">${esc(initials)}</span>`;
  const rows = c.players.map((p) => {
    const tag = p.tag ? `<span class="${p.gold ? 'roster-new' : 'roster-note'}">${esc(p.tag)}</span>` : '<span></span>';
    const tba = /^(tba|tbd|\?)$/i.test(p.name.trim());
    return `<li${tba ? ' class="tba"' : ''}><span class="roster-role">${esc(p.role ?? '')}</span><span class="roster-name"><b>${esc(p.name)}</b>${p.realName ? `<span>${esc(p.realName)}</span>` : ''}</span>${tag}</li>`;
  }).join('');
  return `<figure class="roster" aria-label="${esc(c.team + (c.subtitle ? ', ' + c.subtitle : ''))}">`
    + `<div class="roster-head">${badge}<span class="roster-title"><b>${esc(c.team)}</b>${c.subtitle ? `<span>${esc(c.subtitle)}</span>` : ''}</span></div>`
    + (rows ? `<ul class="roster-list">${rows}</ul>` : '')
    + (c.footLabel || c.footText ? `<div class="roster-foot">${c.footLabel ? `<span>${esc(c.footLabel)}</span>` : ''}${esc(c.footText ?? '')}</div>` : '')
    + `</figure>`;
}
