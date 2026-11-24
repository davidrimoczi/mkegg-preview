// Roster card shown inside an article (names only; photos can come later).
import type { CollectionEntry } from 'astro:content';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export function rosterHtml(team: CollectionEntry<'teams'>): string {
  const t = team.data;
  const initials = t.name.replace(/[^A-Za-z0-9 ]/g, '').split(/\s+/).filter(Boolean).map((w) => w[0]).join('').slice(0, 3).toUpperCase();
  const rows = t.players.map((p) => {
    const tag = p.isNew
      ? `<span class="roster-new">New${p.note ? ` · ${esc(p.note)}` : ''}</span>`
      : p.note ? `<span class="roster-note">${esc(p.note)}</span>` : '<span></span>';
    return `<li${p.name.trim().toUpperCase() === 'TBA' ? ' class="tba"' : ''}><span class="roster-role">${esc(p.role)}</span><span class="roster-name"><b>${esc(p.name)}</b>${p.realName ? `<span>${esc(p.realName)}</span>` : ''}</span>${tag}</li>`;
  }).join('');
  return `<figure class="roster" aria-label="${esc(`${t.name} roster for ${t.league} ${t.season}`)}">`
    + `<div class="roster-head"><span class="roster-badge" aria-hidden="true">${esc(initials)}</span><span class="roster-title"><b>${esc(t.name)}</b><span>${esc(`${t.league} ${t.season} roster`)}</span></span></div>`
    + `<ul class="roster-list">${rows}</ul>`
    + (t.coach ? `<div class="roster-foot"><span>Head coach</span>${esc(t.coach)}</div>` : '')
    + `</figure>`;
}
