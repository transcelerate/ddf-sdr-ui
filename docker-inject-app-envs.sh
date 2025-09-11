#!/bin/sh

# This script captures all environment variables whose name starts with APP_ and places them inside
# of index.html, underneath the window.env variable, for use within the web app - for example, for 
# configuring API base URLs.

# Capture all environment variables starting with APP_ and make JSON string from them
ENV_JSON="$(jq --compact-output --null-input 'env | with_entries(select(.key | startswith("APP_")))')"

# Escape sed replacement's special characters: \, &, /.
# No need to escape newlines, because --compact-output already removed them.
# Inside of JSON strings newlines are already escaped.
ENV_JSON_ESCAPED="$(printf "%s" "${ENV_JSON}" | sed -e 's/[\&/]/\\&/g')"

sed -i "s/<noscript id=\"env-insertion-point\"><\/noscript>/<script>var env=${ENV_JSON_ESCAPED}<\/script>/g" /usr/share/nginx/html/index.html 
