FROM ruby:3.3@sha256:a91b6ac1b9b18d33812480856e4bc39c5c492ff9c6cc810d916cc3f0cc1d0eab

WORKDIR /site
COPY Gemfile Gemfile.lock ./
RUN bundle config set frozen true && bundle install
COPY . .

EXPOSE 4000
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000"]
