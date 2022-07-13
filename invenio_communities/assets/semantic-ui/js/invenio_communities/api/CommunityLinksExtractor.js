// This file is part of Invenio-communities
// Copyright (C) 2022 CERN.
//
// Invenio-communities is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

export class CommunityLinksExtractor {
  #urls;

  constructor(community) {
    if (!community?.links) {
      throw TypeError("Request resource links are undefined");
    }
    this.#urls = community.links;
  }

  get selfUrl() {
    if (!this.#urls.self) {
      throw TypeError("Self link missing from resource.");
    }
    return this.#urls.self;
  }

  get membersUrl() {
    if (!this.#urls.members) {
      throw TypeError("Members link missing from resource.");
    }
    return this.#urls.members;
  }

  get publicMembersUrl() {
    if (!this.#urls.public_members) {
      throw TypeError("Public members link missing from resource.");
    }
    return this.#urls.public_members;
  }

  get invitations() {
    if (!this.#urls.invitations) {
      throw TypeError("Invitations link missing from resource.");
    }
    return this.#urls.invitations;
  }
}
