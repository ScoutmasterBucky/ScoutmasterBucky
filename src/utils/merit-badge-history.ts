// Shared helpers for the merit badge history pages and the patch/pamphlet type pages.
import approvedList from '~/data/merit-badge-history/approved.yaml';
import badgeNames from '~/data/historical-merit-badges.yaml';
import patchTypes from '~/data/merit-badge-history/patch-types.yaml';
import pamphletTypes from '~/data/merit-badge-history/pamphlet-types.yaml';
import hardcoverTypes from '~/data/merit-badge-history/hardcover-types.yaml';
import sharedPhotoList from '~/data/merit-badge-history/shared-photos.json';

// The history photos live on the filestore, not in git (history-tools/web-photos.mjs).
// The data keeps paths like /history/archery/archery-patch-a.webp; this points them there.
// The dev server reads them straight from the local folder (astro.config.mjs), so
// reviewing drafts doesn't depend on the filestore server being up.
const PHOTO_HOST = import.meta.env.DEV ? '/filestore-history/' : 'https://filestore.scoutmasterbucky.com/history/web/';
export const historyPhoto = <T extends string | undefined>(path: T): T =>
    (path?.startsWith('/history/') ? PHOTO_HOST + path.slice('/history/'.length) : path) as T;

// The type and back cover photos on the filestore, for showing only the ones that exist
const sharedPhotos = new Set<string>(sharedPhotoList);
export const sharedPhoto = (path?: string) => (path && sharedPhotos.has(path) ? historyPhoto(path) : undefined);

export interface HistoryItem {
    type: string;
    years?: string;
    note?: string;
    image?: string;
    more?: { image: string; label: string }[];
    status?: 'missing' | 'unknown' | 'none' | 'notMade' | 'unconfirmed';
    placeholder?: string;
    // Title shown instead of "Type X", for a slot that is not a type yet
    label?: string;
}

export interface Printing {
    year: number;
    month?: string;
    cover?: string;
    back?: string;
    printRun?: string;
    copyright?: string;
    upc?: string;
    bsaNumber?: string;
    sku?: string;
    saNumber?: string;
    notes?: string;
    hardcover?: string;
    status: 'have' | 'confirmed' | 'listed';
}

export interface BadgeHistory {
    name: string;
    patches: HistoryItem[];
    pamphlets: HistoryItem[];
    hardcovers?: HistoryItem[];
    extraPrintings?: Printing[];
    [key: string]: unknown;
}

// Sections of a history page. Earned counts and rankings are always public;
// the rest wait for Bucky's approval (approved.yaml).
export const historySections = [
    'facts',
    'story',
    'requirements',
    'timeline',
    'trivia',
    'patches',
    'pamphlets',
    'hardcovers',
] as const;
export type HistorySection = (typeof historySections)[number];

const approvals: Record<string, 'all' | HistorySection[]> = approvedList.approved ?? {};

// The sections a page shows: everything on a draft page, approved sections on a public one
export function visibleSections(slug: string, draft: boolean) {
    const approved = approvals[slug];
    return new Set<HistorySection>(draft || approved === 'all' ? historySections : (approved ?? []));
}

// Badges with a public history page: the site's history list
export const hasPublicHistory = (slug: string) => slug in badgeNames;

// Where links point. Draft pages (/admin/history-draft/) link to every draft;
// public pages (/history/) link only to badges with a public page, and give
// undefined for the rest.
export function historyLinks(draft: boolean) {
    const base = draft ? '/admin/history-draft' : '/history';
    const types = `${base}/types`;

    return {
        hub: `${base}/`,
        types,
        badge: (slug: string) => (draft || hasPublicHistory(slug) ? `${base}/${slug}/` : undefined),
        patchType: (type: string) => `${types}/patch-${typeSlug(type)}/`,
        pamphletType: (type: string) => {
            const family = pamphletFamily(type);
            return family ? `${types}/pamphlet-${family}/` : undefined;
        },
        // HCLM, HCLX, HCQQ and the Misc covers share the Misc page
        hardcoverType: (type: string) =>
            `${types}/hardcover-${/^HC(LM|LX|QQ)$|MISC/i.test(type) ? 'misc' : typeSlug(type)}/`,
    };
}

// Years written as a range, e.g. "1952 - 1962"
export function span(years: number[]) {
    const first = Math.min(...years);
    const last = Math.max(...years);
    return first === last ? `${first}` : `${first} - ${last}`;
}

// Year ranges read "1952 - 1962"; only a dash after a year is spaced, so "3A-2" is left alone
export const formatYears = (years?: string) => years?.replace(/(\d{4})\s*-\s*/g, '$1 - ');

// "3A over 2" -> "3a-over-2", safe for an element id or URL
export const typeSlug = (type: string) => type.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// The pamphlet type page a cover belongs to: "6A" -> "6", "10C-2" -> "10", "3A over 2" -> "3".
// The 5A wartime covers have a page of their own.
export const pamphletFamily = (type: string) =>
    /^5A\b/i.test(type) ? '5a' : type.match(/^\d+/)?.[0];

// The section of a type page a cover is listed under: "10C-2" -> "10C",
// "3A-1 over 2" -> "3A over 2". Printing variations share their letter's section.
export const pamphletSection = (type: string) => type.toUpperCase().replace(/-\d+/g, '');

// A title as written on Bucky's lists ("Wood Work", "Life Saving") -> a badge slug
export const titleSlug = (title: string) =>
    title
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

// Match a printing's cover ("3A-1", "5B-1") to one of the pamphlet cards ("3A", "5B-1").
// Covers printed over an older type ("3A over 2") are their own card.
export function coverMatcher(pamphlets: HistoryItem[]) {
    const cardTypes = pamphlets.map(p => p.type.toUpperCase());

    return (cover?: string) => {
        if (!cover) {
            return undefined;
        }

        const base = cover.toUpperCase().trim();
        if (cardTypes.includes(base)) {
            return base;
        }

        const parent = cardTypes
            .filter(t => base.startsWith(`${t}-`) && !base.includes(' OVER '))
            .sort((a, b) => b.length - a.length)[0];
        if (parent) {
            return parent;
        }

        // A printing listed only as "3A" when the covers are 3A-1 and 3A-2: shown
        // under the first one until the workbook says which cover it is
        return cardTypes.filter(t => t.startsWith(`${base}-`)).sort()[0];
    };
}

// Years each pamphlet card was printed, worked out from its printings
export function pamphletYears(history: BadgeHistory, printings: Printing[]) {
    const all = [...printings, ...(history.extraPrintings ?? [])];
    const cardFor = coverMatcher(history.pamphlets);
    const years = new Map<string, string>();

    for (const item of history.pamphlets) {
        const type = item.type.toUpperCase();
        const used = all.filter(p => cardFor(p.cover) === type).map(p => p.year);
        if (used.length) {
            years.set(type, span(used));
        }
    }

    return years;
}

// Static paths for the patch, pamphlet and hard cover type pages
export function typePagePaths() {
    const families = new Set(Object.keys(pamphletTypes));
    for (const { history } of allBadgeHistories()) {
        for (const item of history.pamphlets) {
            const family = pamphletFamily(item.type);
            if (family) {
                families.add(family);
            }
        }
    }

    return [
        ...Object.keys(patchTypes).map(letter => ({
            params: { type: `patch-${typeSlug(letter)}` },
            props: { kind: 'patch' as const, key: letter },
        })),
        ...[...families].map(family => ({
            params: { type: `pamphlet-${family}` },
            props: { kind: 'pamphlet' as const, key: family },
        })),
        ...Object.keys(hardcoverTypes).map(hc => ({
            params: { type: `hardcover-${typeSlug(hc)}` },
            props: { kind: 'hardcover' as const, key: hc },
        })),
    ];
}

// Every badge with a history data file, with its printings, sorted by name
export function allBadgeHistories() {
    const histories = import.meta.glob<{ default: BadgeHistory }>(
        '/src/data/merit-badge-history/*.yaml',
        { eager: true }
    );
    const printingFiles = import.meta.glob<{ default: { printings: Printing[]; notMadeYears?: number[] } }>(
        '/src/data/merit-badge-history/printings/*.yaml',
        { eager: true }
    );
    const slugOf = (path: string) => path.split('/').pop()!.replace(/\.yaml$/, '');
    const printingsBySlug = new Map(
        Object.entries(printingFiles).map(([path, mod]) => [slugOf(path), mod.default])
    );

    return Object.entries(histories)
        .map(([path, mod]) => ({ slug: slugOf(path), history: mod.default }))
        .filter(({ slug, history }) => slug !== 'patch-types' && Array.isArray(history.patches))
        .map(({ slug, history }) => ({
            slug,
            history,
            printings: printingsBySlug.get(slug)?.printings ?? [],
            // Years the workbook marks "not made"; only the easter egg lists them
            notMadeYears: printingsBySlug.get(slug)?.notMadeYears ?? [],
        }))
        .sort((a, b) => a.history.name.localeCompare(b.history.name));
}
