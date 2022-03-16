import { http } from "./config";

export class InvenioCommunityMembersApi {
  constructor(community_id) {
    this.community_id = community_id;
  }

  get endpoint() {
    return `/api/communities/${this.community_id}/members`;
  }

  getMembers = async () => {
    return await http.get(this.endpoint);
  };

  deleteMember = async (payload) => {
    return await http.delete(this.endpoint, {
      data: payload,
    });
  };

  updateMember = async (payload) => {
    return await http.put(this.endpoint, payload);
  };
}

export class InvenioCommunityInvitationsApi {
  createInvite = async (community_id, payload) => {
    const endpoint = `/api/communities/${community_id}/invitations`;
    return await http.post(endpoint, payload);
  };

  updateInvite = async (request_id, payload) => {
    const endpoint = `/api/requests/${request_id}`;
    return await http.put(endpoint, payload);
  };

  updateRole = async (role, request) => {
    const updatedItem = { ...request, role };

    return this.updateInvite(request.id, updatedItem);
  };
}

export class InvenioCommunityActionsApi {
  #links;

  constructor(links) {
    this.#links = links;
  }
 
  declineAction = async (payload) => {
    return await http.post(this.#links.actions.decline, { payload: payload });
  };
}
