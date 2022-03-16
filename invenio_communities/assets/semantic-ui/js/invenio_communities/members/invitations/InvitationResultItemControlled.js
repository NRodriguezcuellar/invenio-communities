/*
 * This file is part of Invenio.
 * Copyright (C) 2022 CERN.
 *
 * Invenio is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from "react";
import { InvitationResultItem } from "./InvitationResultItem";
import PropTypes from "prop-types";
import { randomBool } from "../mock";
import { InvenioCommunityActionsApi } from "../api/membersApiClient";
import { errorSerializer, payloadSerializer } from "../api/serializers";

export class InvitationResultItemControlled extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: "",
      success: false,
    };

    this.actionsApi = new InvenioCommunityActionsApi(props.result.links);
  }

  onRoleChange = (role) => {
    this.setState({ loading: true, success: false, error: "" });

    if (randomBool()) {
      setTimeout(
        () =>
          this.setState({
            loading: false,
            error: "",
            success: true,
            currentRole: role,
          }),
        500
      );
    } else {
      setTimeout(
        () =>
          this.setState({
            loading: false,
            error: "Example error message",
            success: false,
          }),
        500
      );
      throw Error;
    }
  };

  onCancel = async () => {
    this.setState({ loading: true });

    try {
      const payload = payloadSerializer("declined, sorry", "html");
      const response = await this.actionsApi.declineAction(payload);
      this.setState({ loading: false, success: true, error: "" });
    } catch (error) {
      this.setState({
        loading: false,
        error: errorSerializer,
        success: false,
      });
    }
  };

  onView = () => {};

  onReInvite = () => {};

  render() {
    const { result, index } = this.props;
    const { loading, error, success } = this.state;

    return (
      <InvitationResultItem
        invitation={result}
        key={index}
        onRoleChange={(role) => this.onRoleChange(role)}
        isLoading={loading}
        error={error}
        success={success}
        onErrorClose={() => this.setState({ error: "" })}
        onTimerFinish={() => this.setState({ success: false })}
        onCancel={this.onCancel}
        onView={this.onView}
        onReInvite={this.onReInvite}
      />
    );
  }
}

InvitationResultItemControlled.propTypes = {
  result: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
