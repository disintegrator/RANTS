#!/bin/bash

set -ex

apollo-codegen introspect-schema $1/schema.graphql --output $1/schema.json
apollo-codegen \
  generate $1/client/**/*.graphql \
  --schema $1/schema.json \
  --target typescript \
  --output $1/client/index.ts
