# Proxy
This proxy handles the OAuth authentication for the JS embedded widgets when they communicate with the FHIR API.

## Local Development

<details>
  <summary>With Docker</summary>

  ### Environment Variables
  ```bash
  cp .env.example .env
  ```

  Once you have copied the example, go into `.env` and replace the environment variables with valid values.

  ### Build / Run
  If you're building the docker containers for the first time, or if you know a dependency has been added (e.g., ruby gem), run this:
  ```bash
  docker-compose build
  ```

  Once the containers have been built, starting the app is just:
  ```bash
  docker-compose up

  # And a shortcut for rebuilding containers while spinning them up at the same time:
  docker-compose up --build
  ```

  ### Running tests
  ```bash
  # Set up the test database
  docker-compose run --rm -e RAILS_ENV=test app ./bin/rails db:create db:migrate

  # Run specs
  docker-compose run --rm app rspec

  # Run specs while checking coverage
  docker-compose run --rm -e COVERAGE=1 app rspec
  ```

  ### Running the Ruby Formatter
  ```bash
  # Check for exceptions:
  bundle exec rubocop

  # Let Rubocop autocorrect things
  bundle exec rubocop -A
  ```
</details>

<details>
  <summary>Running Locally</summary>

  ### Tooling and Dependencies
  - If you have `asdf` installed, `.tool-versions` is set up for the Ruby version.
  - Redis
    - Check for existing Redis by running

      ```bash
      redis-server --version
      ```

    - If Redis isn't installed, install it! If on macOS, with Homebrew installed (above) run

      ```bash
      brew install redis

      # have launchd start Redis now and restart at login
      brew services start redis

      # confirm that Redis started successfully
      brew services ls
      ```

  ### Application Dependencies
  If you don't have Bundler installed for Ruby:
  ```bash
  gem install bundler
  ```

  Install dependencies:
  ```bash
  # Install Ruby gems:
  bundle install
  ```

  ### Run the application
  ```bash
  bundle exec rails server
  ```

  Then open [http://localhost:3000](http://localhost:3000) with your favorite internet browser.

  ### Run the test suite
  ```bash
  bundle exec rspec
  ```

  Optionally, run the suite and check coverage:
  ```bash
  COVERAGE=1 bundle exec rspec

  # wait for specs to run, and then:
  open coverage/index.html
  ```

  ### Running the Ruby Formatter
  ```bash
  # Check for exceptions:
  bundle exec rubocop

  # Let Rubocop autocorrect things
  bundle exec rubocop -A
  ```
</details>


## Deployment

To deploy:

1. In the project folder, run:

    ```sh
    zip -r deploy/deploy_proxy.zip .
    ```

2. Log into AWS account and navigate to the `Proxyapplication-env` environment in Elastic Beanstalk.
3. Click the `Upload and deploy` button
4. Select your zip file located at `deploy/deploy_proxy.zip` in the project folder and give it a version label.
5. Click the `Deploy` button.

Available environments:

| Name         | URL                               |
| ---          | ---                               |
| `staging`    | http://proxyapplication-env.eba-8mfhdmgm.us-east-1.elasticbeanstalk.com/    |
