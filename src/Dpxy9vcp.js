import { h as callGraphql, p as parseSafe, g as getMyUid } from './B213zw-8.js';

const FriendRequestType = {
  INCOMING_REQUEST: 'INCOMING_REQUEST',
  OUTGOING_REQUEST: 'OUTGOING_REQUEST',
  DECLINED: 'DECLINED',
  ACCEPTED: 'ACCEPTED',
  CANCELED: 'CANCELED'
};

const FriendRequestsTypeName = {
  INCOMING_REQUEST: {
    vi: 'Đã nhận',
    en: 'Incoming',
    color: 'default',
    icon: 'fa-solid fa-arrow-turn-down'
  },
  OUTGOING_REQUEST: {
    vi: 'Đã gửi',
    en: 'Outgoing',
    color: 'default',
    icon: 'fa-solid fa-arrow-turn-up'
  },
  DECLINED: {
    vi: 'Đã từ chối',
    en: 'Declined',
    color: 'error',
    icon: 'fa-solid fa-xmark'
  },
  ACCEPTED: {
    vi: 'Đã chấp nhận',
    en: 'Accepted',
    color: 'success',
    icon: 'fa-solid fa-check'
  },
  CANCELED: {
    vi: 'Đã hủy',
    en: 'Canceled',
    color: 'error',
    icon: 'fa-solid fa-xmark'
  }
};

const DOCS = {
  incomingList: '3387424654654854',
  outgoingList: '3032982086830073',
  accept: '2835274736570442',
  decline: '2975776009179538',
  cancel: '3226051994092510'
};

function toObject(value) {
  return typeof value === 'string' ? parseSafe(value) : value;
}

async function graphql(params) {
  return toObject(await callGraphql({
    fb_api_caller_class: 'RelayModern',
    ...params
  }));
}

function pictureUrl(node) {
  return node?.profile_picture?.uri || node?.profile_picture?.url || node?.image?.uri || node?.image?.url;
}

function textValue(value) {
  return typeof value === 'string' ? value : value?.text || '';
}

function mapRequestEdge(edge, pageInfo = {}, type = FriendRequestType.INCOMING_REQUEST) {
  const node = edge?.node || {};
  const mutual = node?.text_top_mutual_friends?.text_items || node?.mutual_friends || [];
  return {
    id: node.id,
    uid: node.id,
    name: node.name,
    avatar: pictureUrl(node),
    url: node.url || node.profile_url || (node.id ? `https://www.facebook.com/${node.id}` : undefined),
    desc: textValue(node.social_context),
    seen: edge?.is_seen,
    time: ((edge?.time || node?.time || 0) * 1000) || undefined,
    type,
    cursor: edge?.cursor || pageInfo?.end_cursor,
    mutual_friends: Array.isArray(mutual) ? mutual.map(item => ({
      id: item?.id || item?.node?.id,
      name: item?.name || item?.node?.name,
      avatar: pictureUrl(item?.node || item),
      url: item?.url || item?.node?.url
    })).filter(item => item.id || item.name) : []
  };
}

function readConnection(response, key) {
  const connection = response?.data?.viewer?.[key] || {};
  return {
    edges: Array.isArray(connection.edges) ? connection.edges : [],
    pageInfo: connection.page_info || {},
    total: connection.count || connection.total_count || 0
  };
}

async function fetchRequests({ cursor = '', type = FriendRequestType.INCOMING_REQUEST, fast = false } = {}) {
  const incoming = type === FriendRequestType.INCOMING_REQUEST;
  const response = await graphql({
    fb_api_req_friendly_name: incoming ? 'getIncomingFriendRequestsFast' : 'getOutgoingFriendRequestsFast',
    doc_id: incoming ? DOCS.incomingList : DOCS.outgoingList,
    variables: {
      count: fast ? 100 : 20,
      cursor: cursor || null,
      scale: 2
    }
  });
  const { edges, pageInfo, total } = readConnection(
    response,
    incoming ? 'friending_possibilities' : 'outgoing_friend_requests_connection'
  );
  const data = edges
    .map(edge => mapRequestEdge(edge, pageInfo, type))
    .filter(item => item.id && item.name);
  return { total, data, page_info: pageInfo };
}

async function getIncomingFriendRequestsFast(cursor = '') {
  return fetchRequests({ cursor, type: FriendRequestType.INCOMING_REQUEST, fast: true });
}

async function getOutgoingFriendRequestsFast(cursor = '') {
  return fetchRequests({ cursor, type: FriendRequestType.OUTGOING_REQUEST, fast: true });
}

async function getIncomingFriendRequests(cursor = '') {
  const result = await fetchRequests({ cursor, type: FriendRequestType.INCOMING_REQUEST });
  return result.data;
}

async function getOutgoingFriendRequests(cursor = '') {
  const result = await fetchRequests({ cursor, type: FriendRequestType.OUTGOING_REQUEST });
  return result.data;
}

async function actorId() {
  return await getMyUid() || 'me';
}

async function acceptFriendRequest(uid = '') {
  const response = await graphql({
    fb_api_req_friendly_name: 'FriendingCometFriendRequestConfirmMutation',
    doc_id: DOCS.accept,
    variables: {
      input: {
        friend_requester_id: String(uid),
        source: 'friends_tab',
        actor_id: await actorId(),
        client_mutation_id: 1
      },
      scale: 2,
      refresh_num: 0
    }
  });
  return response?.data?.friend_request_accept?.friend_requester?.id === String(uid)
    || !!response?.data?.friend_request_accept?.friend_requester?.friendship_status;
}

async function declineFriendRequest(uid = '') {
  const response = await graphql({
    fb_api_req_friendly_name: 'FriendingCometFriendRequestDeleteMutation',
    doc_id: DOCS.decline,
    variables: {
      input: {
        friend_requester_id: String(uid),
        source: 'friends_tab',
        actor_id: await actorId(),
        client_mutation_id: 1
      },
      scale: 2,
      refresh_num: 0
    }
  });
  return response?.data?.friend_request_delete?.friend_requester?.id === String(uid)
    || !!response?.data?.friend_request_delete?.friend_requester?.friendship_status;
}

async function cancelOutgoingFriendRequest(uid = '') {
  const response = await graphql({
    fb_api_req_friendly_name: 'FriendingCometFriendRequestCancelMutation',
    doc_id: DOCS.cancel,
    variables: {
      input: {
        cancelled_friend_requestee_id: String(uid),
        source: 'profile',
        actor_id: await actorId(),
        client_mutation_id: 1
      },
      scale: 2
    }
  });
  return !!response?.data?.friend_request_cancel;
}

export {
  FriendRequestType,
  FriendRequestsTypeName,
  acceptFriendRequest,
  cancelOutgoingFriendRequest,
  declineFriendRequest,
  getIncomingFriendRequests,
  getIncomingFriendRequestsFast,
  getOutgoingFriendRequests,
  getOutgoingFriendRequestsFast
};
