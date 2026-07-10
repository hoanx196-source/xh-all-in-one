import { j as getCollectionId, h as fetchGraphQl, p as parseSafe } from './B213zw-8.js';
import { deepFind } from './jfxAbuAi.js';

const CONTACT_SECTIONS = ['about_contact_and_basic_info', 'directory_contact_info'];
const ABOUT_DOC = 'getAboutAppSection';
const SECTION_SUFFIX = ':2327158227';
const APP_SECTION_PREFIX = 'ProfileCometAppSectionFeed_timeline_nav_app_sections__';

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

export async function getUserAboutBasicInfo(uid) {
  if (!uid) return null;
  let rawSectionToken = null;
  for (const section of CONTACT_SECTIONS) {
    rawSectionToken = await getCollectionId(uid, section).catch(() => null);
    if (rawSectionToken) break;
  }
  if (!rawSectionToken) return null;

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
  const rows = [];
  const seen = new Set();

  for (const rawField of collectFields(parsed)) {
    const field = normalizeField(rawField);
    if (!field) continue;
    const key = `${field.field_type}|${field.label}|${field.value}`;
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push(field);
  }

  const info = { rows };
  for (const row of rows) mergeKnown(info, row);
  return info;
}
