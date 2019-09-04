#!/bin/sh

set -e

echo "Restoring dependencies"
bundle install

echo "Linting markdown"
bundle exec mdl _posts/ --config .markdownlint.json
bundle exec mdl __pages/ --config .markdownlint.json

echo "Cleaning project"
rm -rf _site/

echo "Bulding site with --future"
bundle exec jekyll build --future

echo "Linting html"
bundle exec htmlproofer ./_site

echo "Running github-pages health-check"
github-pages health-check
