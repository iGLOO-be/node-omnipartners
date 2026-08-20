#!/usr/bin/env bash
set -euo pipefail

# Publish only packages with changes since the last release.
# excludeDependents is set in lerna.json so a change in omnipartners does not
# trigger version bumps for @igloo-be-omnipartners/graphql-schema or hooks.

if ! yarn lerna changed >/dev/null 2>&1; then
  echo "No publishable package changes detected, skipping."
  exit 0
fi

echo "Packages to publish:"
yarn lerna changed

yarn lerna publish --yes --message 'chore(release) [skip ci]'
