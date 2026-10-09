#!/bin/sh
set -eu
bundle check || bundle install
bundle exec jekyll build --future
# Check local output without depending on old external sites.
bundle exec htmlproofer ./_site --disable-external --no-enforce-https --ignore-missing-alt
