#!/bin/sh

set -e

echo "Cleaning project"
rm -rf _site/

echo "Installing dependencies"
bundle install

echo "Bulding site with --future"
bundle exec jekyll build --future

echo "Linting html"
bundle exec htmlproofer ./_site

echo "Running github-pages health-check"
github-pages health-check
