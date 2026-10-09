# chelnak.github.io

Jekyll blog hosted on GitHub Pages.

## Local preview

Install Docker, then run from this directory:

```sh
docker compose up --build
```

Open <http://localhost:4000>. The image contains a snapshot of the checkout;
after editing files, stop the preview and run the same command again.
This works without configuring Docker host-folder sharing.

Stop it with Ctrl+C, then `docker compose down`.

With Ruby 3.3 and Bundler installed locally instead:

```sh
bundle install
bundle exec jekyll serve
```

## Validation

```sh
docker compose run --rm site sh build.sh
```

The build checks generated HTML and internal links. Older posts may contain
dead external links; those are excluded from this check. Historical HTTP URLs and missing image alt text are allowed; missing local assets still fail. Use
`bundle exec htmlproofer ./_site` for a full external-link audit.

## Dependencies

`github-pages` is pinned to 232, matching the hosted Pages dependency set.
Commit `Gemfile.lock` when updating gems. Hawkins has been removed; Jekyll's
built-in `--livereload` option is available for native local previews.

Bootstrap and Bootswatch Flatly 5.3.8 are vendored in `assets/vendor`, with
their MIT licenses. Bootstrap 5 does not require jQuery. The prebuilt theme
avoids requiring a newer Sass compiler than GitHub Pages supplies.

Upstream assets:

- <https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js>
- <https://cdn.jsdelivr.net/npm/bootswatch@5.3.8/dist/flatly/bootstrap.min.css>

Local overrides live in `assets/main.scss` and `_sass/custom.scss`.
