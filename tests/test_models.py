# -*- coding: utf-8 -*-
#
# This file is part of Invenio.
# Copyright (C) 2016-2019 CERN.
#
# Invenio is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""Model functions tests."""

from __future__ import absolute_import, print_function

import pytest

from invenio_communities.models import Community


@pytest.mark.parametrize('case_modifier', [
    (lambda x: x),
    (lambda x: x.upper()),
    (lambda x: x[0].upper() + x[1:]),
])
def test_filter_community(app, db, communities_for_filtering, user,
                          case_modifier):
    """Test the community filter task."""
    (comm0, comm1, comm2) = communities_for_filtering

    # Case insensitive
    results = Community.filter_communities(
                p=case_modifier('beautiful'),
                so='title').all()
    assert len(results) == 1
    assert {c.id for c in results} == {comm0.id}

    # Keyword search
    results = Community.filter_communities(
                p=case_modifier('errors'),
                so='title').all()
    assert len(results) == 1
    assert {c.id for c in results} == {comm2.id}

    # Partial keyword present
    results = Community.filter_communities(
                p=case_modifier('test'),
                so='title').all()
    assert len(results) == 3
    assert {c.id for c in results} == {comm0.id,
                                       comm1.id, comm2.id}

    # Order matter
    results = Community.filter_communities(
                p=case_modifier('explicit implicit'),
                so='title').all()
    assert len(results) == 1
    assert {c.id for c in results} == {comm0.id}

    results = Community.filter_communities(
                p=case_modifier('implicit explicit'),
                so='title').all()
    assert len(results) == 0
    assert {c.id for c in results} == set()
