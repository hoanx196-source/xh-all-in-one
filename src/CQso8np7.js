import { findDataObject } from './jfxAbuAi.js';
import {
    h as callGraphql,
    g as getMyUid,
    p as parseSafe,
    j as getCollectionId,
    d as getFbUrlFromId
} from './B213zw-8.js?v=bulk-token-paste-20260707-1';

const PAGE_DOC_IDS = {
    myLikedPages: '24884640167850327',
    otherLikedPages: '2983410188445167',
    unlikeFromActivityLog: '6951244711576579'
};

const likedPageCacheById = new Map();

const LikedPageType = {
    ALL: 'likes_all',
    MOVIES: 'likes_section_movies',
    TV_SHOWS: 'likes_section_tv_shows',
    MUSIC: 'likes_section_music',
    BOOKS: 'likes_section_books',
    PEOPLE: 'likes_people',
    RESTAURANTS: 'likes_restaurants',
    APPS_AND_GAMES: 'likes_section_apps_and_games',
    APPS_LIKE: 'apps_like',
    SPORTS_TEAMS: 'likes_section_sports_teams',
    SPORTS_ATHLETES: 'likes_section_sports_athletes',
    VIDEO_TV_SHOWS_WATCH: 'video_tv_shows_watch',
    VIDEO_TV_SHOWS_FAVORITE: 'video_tv_shows_favorite',
    VIDEO_MOVIES_WATCH: 'video_movies_watch',
    VIDEO_MOVIES_FAVORITE: 'video_movies_favorite',
    PROFILE_SONGS: 'profile_songs',
    MUSIC_FAVS: 'music_favs',
    BOOKS_READ: 'books_read',
    BOOKS_FAVORITE: 'books_favorite',
    REVIEWS_WRITTEN: 'reviews_written'
};

const LikedPageTypeName = {
    likes_all: { en: 'All', vi: 'Tất cả' },
    likes_section_movies: { en: 'Movies', vi: 'Phim' },
    likes_section_tv_shows: { en: 'TV Shows', vi: 'Show TV' },
    likes_section_music: { en: 'Music', vi: 'Âm nhạc' },
    likes_section_books: { en: 'Books', vi: 'Sách' },
    likes_people: { en: 'People', vi: 'Người' },
    likes_restaurants: { en: 'Restaurants', vi: 'Nhà hàng' },
    likes_section_apps_and_games: { en: 'Apps and Games', vi: 'Ứng dụng và Game' },
    apps_like: { en: 'Apps', vi: 'Ứng dụng' },
    likes_section_sports_teams: { en: 'Sports Teams', vi: 'Đội thể thao' },
    likes_section_sports_athletes: { en: 'Sports Athletes', vi: 'Vận động viên thể thao' },
    video_tv_shows_watch: { en: 'TV Shows Watched', vi: 'Show TV đã xem' },
    video_tv_shows_favorite: { en: 'TV Shows Favorite', vi: 'Show TV đã thích' },
    video_movies_watch: { en: 'Movies Watched', vi: 'Phim đã xem' },
    video_movies_favorite: { en: 'Movies Favorite', vi: 'Phim đã thích' },
    profile_songs: { en: 'Profile Songs', vi: 'Bài hát của bạn' },
    music_favs: { en: 'Music Favorites', vi: 'Âm nhạc yêu thích' },
    books_read: { en: 'Books Read', vi: 'Sách đã đọc' },
    books_favorite: { en: 'Books Favorite', vi: 'Sách đã thích' },
    reviews_written: { en: 'Reviews Written', vi: 'Đánh giá đã viết' }
};

const UserTypeInPage = {
    ADMIN: 'admin',
    LIKED: 'liked',
    FOLLOWED: 'followed',
    INVITED: 'invited',
    DECLINED: 'declined'
};

const FollowPageType = {
    SEE_FIRST: 'SEE_FIRST',
    REGULAR_FOLLOW: 'REGULAR_FOLLOW'
};

function getText(value) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value.text || value.title || value.name || '';
}

function getImageUri(...values) {
    for (const value of values) {
        if (!value) continue;
        if (typeof value === 'string') return value;
        if (value.uri) return value.uri;
        if (value.url) return value.url;
        if (value.image?.uri) return value.image.uri;
    }
    return '';
}

function getActivityLogConnection(json) {
    return json?.data?.node?.activity_log_stories || findDataObject(json) || {};
}

function getCollectionConnection(json) {
    return json?.data?.node?.items || findDataObject(json) || {};
}

function safeAtob(value) {
    try {
        return atob(value);
    } catch {
        return '';
    }
}

function makeAllPagesCollectionId(uid) {
    return btoa(`app_collection:${uid}:2409997254:96`);
}

async function resolveLikedPagesCollectionId(uid, type) {
    try {
        const id = await getCollectionId(uid, type);
        if (id) return id;
    } catch (error) {
        console.warn('xH all in one: failed to resolve page collection id, using LOC fallback', error);
    }

    if (!type || type === LikedPageType.ALL) {
        return makeAllPagesCollectionId(uid);
    }

    return makeAllPagesCollectionId(uid);
}

function mapActivityPage(edge, pageInfo = {}) {
    const node = edge?.node || {};
    const attachment = (node.attachments || []).find(item => item?.url || item?.title_with_entities) || node.attachments?.[0] || {};
    const pageId = String(node.post_id || attachment.target?.id || attachment.id || '');
    const name = getText(attachment.title_with_entities) || getText(attachment.title) || node.title || '';

    const page = {
        id: pageId,
        storyID: node.id,
        name,
        subTitle: '',
        url: attachment.url || (pageId ? getFbUrlFromId(pageId) : ''),
        image: getImageUri(attachment.media?.image, attachment.media, attachment.image),
        cursor: edge?.cursor || pageInfo.end_cursor || '',
        userType: UserTypeInPage.LIKED,
        category: '',
        verified: undefined,
        ctaLabel: '',
        ctaSubtext: '',
        canLike: true,
        subscribe_status: '',
        likedDate: node.creation_time ? new Date(node.creation_time * 1000).toLocaleString() : '',
        total: pageInfo.count || 0
    };

    if (page.id) likedPageCacheById.set(page.id, page);
    return page;
}

function mapCollectionPage(edge, pageInfo = {}, total = 0) {
    const node = edge?.node || {};
    const nested = node.node || {};
    const decodedId = safeAtob(node.id).split(':').at(-1);
    const id = String(nested.id || node.id || decodedId || '');

    return {
        id,
        name: getText(node.title) || node.name || nested.name || '',
        subTitle: getText(node.subtitle_text) || getText(node.subtitle) || '',
        url: node.url || nested.url || (id ? getFbUrlFromId(id) : ''),
        image: getImageUri(node.image, nested.image, nested.profile_picture),
        cursor: edge?.cursor || pageInfo.end_cursor || '',
        userType: UserTypeInPage.LIKED,
        category: node.category_name || nested.category_name || '',
        verified: node.is_verified ?? nested.is_verified,
        ctaLabel: getText(node.comet_page_cta_renderer?.label),
        ctaSubtext: node.page_profile_cta_renderer?.subtext || '',
        canLike: node.can_viewer_like,
        subscribe_status: node.subscribe_status,
        total
    };
}

async function getOtherLikedPages({ uid = '', cursor = null, type = LikedPageType.ALL }) {
    const collectionId = await resolveLikedPagesCollectionId(uid, type);
    const response = await callGraphql({
        fb_api_req_friendly_name: 'ProfileCometAppCollectionGridRendererPaginationQuery',
        variables: {
            count: 8,
            scale: 1,
            cursor: cursor ?? null,
            id: collectionId
        },
        doc_id: PAGE_DOC_IDS.otherLikedPages
    });
    const json = parseSafe(response);
    const connection = getCollectionConnection(json);
    const edges = connection.edges || [];
    const pageInfo = connection.page_info || {};
    const total = connection.count || connection.total_count || json?.data?.node?.items?.count || 0;

    return edges.map(edge => mapCollectionPage(edge, pageInfo, total)).filter(page => page.id);
}

async function getMyLikedPages(cursor = '') {
    const uid = await getMyUid();
    const response = await callGraphql({
        fb_api_req_friendly_name: 'CometActivityLogStoriesListPaginationQuery',
        variables: {
            audience: null,
            category: 'LIKEDINTERESTS',
            category_key: 'LIKEDINTERESTS',
            count: 25,
            cursor: cursor || null,
            feedLocation: null,
            media_content_filters: [],
            month: null,
            person_id: null,
            privacy: 'NONE',
            scale: 1,
            timeline_visibility: 'ALL',
            year: null,
            id: uid
        },
        doc_id: PAGE_DOC_IDS.myLikedPages
    });
    const json = parseSafe(response);
    const connection = getActivityLogConnection(json);
    const edges = connection.edges || [];
    const pageInfo = connection.page_info || {};

    return edges.map(edge => mapActivityPage(edge, pageInfo)).filter(page => page.id && page.name);
}

async function unlikePage(pageOrId = '') {
    const page = typeof pageOrId === 'object' && pageOrId
        ? pageOrId
        : likedPageCacheById.get(String(pageOrId)) || { id: String(pageOrId) };
    if (!page.storyID) return false;

    const uid = await getMyUid();
    const response = await callGraphql({
        fb_api_req_friendly_name: 'CometPageUnlikeCommitMutation',
        variables: {
            input: {
                action: 'UNFAN_FBPAGE',
                category_key: 'LIKEDINTERESTS',
                deletion_request_id: null,
                post_id_str: page.id,
                story_id: page.storyID,
                story_location: 'ACTIVITY_LOG',
                actor_id: uid,
                client_mutation_id: 1
            }
        },
        doc_id: PAGE_DOC_IDS.unlikeFromActivityLog
    });
    const json = parseSafe(response);
    return json?.data?.activity_log_story_curation?.story?.id === page.storyID;
}

async function followPage() {
    return false;
}

async function unFollowPage() {
    return false;
}

async function getPageInvites() {
    return [];
}

async function acceptPageInvite() {
    return false;
}

async function declinePageInvite() {
    return false;
}

export {
    FollowPageType,
    LikedPageType,
    LikedPageTypeName,
    UserTypeInPage,
    acceptPageInvite,
    declinePageInvite,
    followPage,
    getMyLikedPages,
    getOtherLikedPages,
    getPageInvites,
    unFollowPage,
    unlikePage
};
