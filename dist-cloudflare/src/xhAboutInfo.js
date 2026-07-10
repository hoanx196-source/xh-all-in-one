import { j as getCollectionId, h as fetchGraphQl, p as parseSafe } from './B213zw-8.js';
import { deepFind } from './jfxAbuAi.js';
import { h as fetchRaw } from './ZQcttVra.js';

const CONTACT_SECTIONS = ['about_contact_and_basic_info', 'directory_contact_info'];
const ABOUT_DOC = 'getAboutAppSection';
const SECTION_SUFFIX = ':2327158227';
const APP_SECTION_PREFIX = 'ProfileCometAppSectionFeed_timeline_nav_app_sections__';
const MBASIC_BASE = 'https://mbasic.facebook.com/';

const FIELD_ALIASES = {
  birthdate: 'birthday',
  birthday: 'birthday',
  gender: 'gender',
  current_city: 'location',
  current_location: 'location',
  location: 'location',
  hometown: 'hometown',
  relationship: 'relationship_status',
  relationship_status: 'relationship_status',
  website: 'website',
  websites: 'website',
  email: 'email',
  phone: 'phone',
  mobile_phone: 'mobile_phone',
  screenname: 'screenname',
};

function textOf(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value.text === 'string') return value.text;
  if (typeof value.name === 'string') return value.name;
  return '';
}

function firstText(...values) {
  for (const value of values) {
    const text = textOf(value);
    if (text) return text;
  }
  return '';
}

function normalizeField(field) {
  const fieldType = field?.field_type || field?.pressable_profile_field_type || '';
  const label =
    deepFind(field, 'list_item_groups.text.text') ||
    deepFind(field, 'list_items.text.text') ||
    deepFind(field, 'item_subtitle.text.text') ||
    deepFind(field, 'subtitle.text.text') ||
    textOf(field?.subtitle) ||
    fieldType;
  const value = firstText(field?.title, field?.value, field?.item_title, field?.text);
  if (!value) return null;
  return {
    field_type: fieldType,
    label: label || fieldType || 'Info',
    value,
    icon: field?.icon?.uri || field?.icon_image?.uri || '',
    url: field?.link_url || field?.url || '',
  };
}

function mergeKnown(target, field) {
  const key = FIELD_ALIASES[field.field_type] || FIELD_ALIASES[String(field.label || '').toLowerCase()];
  if (!key) return;
  if (key === 'location' || key === 'hometown') {
    target[key] = { name: field.value };
    return;
  }
  if (key === 'website' && target.website) {
    target.website = [target.website, field.value].filter(Boolean).join(', ');
    return;
  }
  target[key] = target[key] || field.value;
}

function pushUnique(rows, seen, field) {
  if (!field?.value) return;
  const key = `${field.field_type || ''}|${field.label || ''}|${field.value}`;
  if (seen.has(key)) return;
  seen.add(key);
  rows.push(field);
}

function collectFields(value, out = []) {
  if (!value) return out;
  if (Array.isArray(value)) {
    for (const item of value) collectFields(item, out);
    return out;
  }
  if (typeof value !== 'object') return out;
  if (Array.isArray(value.profile_field_sections?.nodes)) {
    for (const sectionNode of value.profile_field_sections.nodes) {
      collectFields(sectionNode?.field_section || sectionNode, out);
    }
  }
  if (Array.isArray(value.profile_fields?.nodes)) out.push(...value.profile_fields.nodes);
  if (value.field_section) collectFields(value.field_section, out);
  if (Array.isArray(value.fields)) out.push(...value.fields);
  for (const child of Object.values(value)) collectFields(child, out);
  return out;
}

function linesFromHtml(html) {
  if (!html) return [];
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return (doc.body?.innerText || '')
      .split('\n')
      .map(line => line.replace(/\s+/g, ' ').trim())
      .filter(Boolean);
  } catch {
    return String(html)
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '\n')
      .split('\n')
      .map(line => line.replace(/\s+/g, ' ').trim())
      .filter(Boolean);
  }
}

function parseMbasicAbout(html) {
  const lines = linesFromHtml(html);
  const rows = [];
  const seen = new Set();
  let section = '';

  for (const line of lines) {
    if (['Thông tin cá nhân', 'Personal information'].includes(line)) {
      section = 'personal';
      continue;
    }
    if (['Giáo dục', 'Education'].includes(line)) {
      section = 'education';
      continue;
    }
    if (['Thông tin liên hệ', 'Contact info', 'Contact information'].includes(line)) {
      section = 'contact';
      continue;
    }
    if (['Tin nổi bật', 'Featured', 'Bài viết', 'Posts', 'Ảnh', 'Photos', 'Bạn bè', 'Friends'].includes(line)) {
      if (section) section = '';
      continue;
    }
    if (!section) continue;

    if (/^(Sống ở|Lives in)\s+/i.test(line)) {
      pushUnique(rows, seen, {
        field_type: 'current_city',
        label: 'Vị trí hiện tại',
        value: line.replace(/^(Sống ở|Lives in)\s+/i, '').trim(),
      });
      continue;
    }
    if (/^(Đến từ|From)\s+/i.test(line)) {
      pushUnique(rows, seen, {
        field_type: 'hometown',
        label: 'Quê quán',
        value: line.replace(/^(Đến từ|From)\s+/i, '').trim(),
      });
      continue;
    }
    if (/^\d{1,2}\s+tháng\s+\d{1,2}(,\s*\d{4})?$/i.test(line) || /^[A-Z][a-z]+\s+\d{1,2}(,\s*\d{4})?$/i.test(line)) {
      pushUnique(rows, seen, { field_type: 'birthday', label: 'Ngày sinh', value: line });
      continue;
    }
    if (/^(Nam|Nữ|Male|Female)$/i.test(line)) {
      pushUnique(rows, seen, { field_type: 'gender', label: 'Giới tính', value: line });
      continue;
    }
    if (section === 'education') {
      pushUnique(rows, seen, { field_type: 'education', label: 'Học vấn', value: line });
      continue;
    }
    if (section === 'contact') {
      const isWebsite = /^https?:\/\//i.test(line) || /\.[a-z]{2,}(\/|$)/i.test(line);
      pushUnique(rows, seen, {
        field_type: isWebsite ? 'website' : 'contact',
        label: isWebsite ? 'Website / Liên hệ' : 'Thông tin liên hệ',
        value: line,
        url: /^https?:\/\//i.test(line) ? line : '',
      });
      continue;
    }
    pushUnique(rows, seen, { field_type: 'personal', label: 'Thông tin cá nhân', value: line });
  }

  return rows;
}

function getProfilePath(profile = {}) {
  const url = profile.url || profile.profile_url || '';
  const match = String(url).match(/facebook\.com\/([^/?#]+)/i);
  const username = match?.[1];
  if (username && username !== 'profile.php' && !/^people$/i.test(username)) return username;
  return '';
}

async function fetchWithTimeout(url, timeout = 12000) {
  return Promise.race([
    fetchRaw(url),
    new Promise((_, reject) => setTimeout(() => reject(new Error('mbasic timeout')), timeout)),
  ]);
}

async function getMbasicAboutRows(uid, profile = {}) {
  const paths = [];
  const username = getProfilePath(profile);
  if (username) {
    paths.push(`${MBASIC_BASE}${encodeURIComponent(username)}?v=info`);
    paths.push(`${MBASIC_BASE}${encodeURIComponent(username)}/about`);
  }
  paths.push(`${MBASIC_BASE}profile.php?id=${encodeURIComponent(uid)}&v=info`);

  for (const url of paths) {
    try {
      const html = await fetchWithTimeout(url);
      const rows = parseMbasicAbout(html);
      if (rows.length) return rows;
    } catch (error) {
      console.warn('xH about mbasic fallback failed', url, error);
    }
  }
  return [];
}

export async function getUserAboutBasicInfo(uid, profile = {}) {
  if (!uid) return null;
  const rows = [];
  const seen = new Set();

  let rawSectionToken = null;
  for (const section of CONTACT_SECTIONS) {
    rawSectionToken = await getCollectionId(uid, section).catch(() => null);
    if (rawSectionToken) break;
  }

  if (rawSectionToken) {
    const response = await fetchGraphQl({
      fb_api_req_friendly_name: 'ProfileCometAboutAppSectionQuery',
      variables: {
        appSectionFeedKey: APP_SECTION_PREFIX + rawSectionToken,
        collectionToken: null,
        pageID: uid,
        rawSectionToken,
        scale: 2,
        sectionToken: btoa(`app_section:${uid}${SECTION_SUFFIX}`),
        showReactions: true,
        userID: uid,
        __relay_internal__pv__FBProfile_enable_perf_improv_gkrelayprovider: true,
        __relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider: false,
        __relay_internal__pv__FBReels_deprecate_short_form_video_context_gkrelayprovider: true,
        __relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider: true,
        __relay_internal__pv__FBUnifiedVideo_enable_reel_music_metadatarelayprovider: false,
        __relay_internal__pv__FBUnifiedVideoMediaFooter_comet_enable_reels_ads_gkrelayprovider: true,
      },
      doc_id: ABOUT_DOC,
    });

    const parsed = parseSafe(response, [], true);
    for (const rawField of collectFields(parsed)) {
      pushUnique(rows, seen, normalizeField(rawField));
    }
  }

  for (const field of await getMbasicAboutRows(uid, profile)) {
    pushUnique(rows, seen, field);
  }

  const info = { rows };
  for (const row of rows) mergeKnown(info, row);
  return info;
}
