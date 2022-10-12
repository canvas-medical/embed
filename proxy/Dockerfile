FROM ruby:2.7

RUN apt-get update \
    && apt-get -y install build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

ADD Gemfile /app/
ADD Gemfile.lock /app/
WORKDIR /app
ENV BUNDLER_VERSION='2.1.2'
RUN bundle install

ADD . /app

EXPOSE 3000

# This command is suitable for local development, and should be updated
# when using this Dockerfile in production.
CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0", "-p", "3000"]
