# Proxy

This proxy handles the OAuth authentication for the JS embedded widgets when they communicate with the FHIR API.

## Local Development

<details>
  <summary>With Docker</summary>

### Environment Variables

```bash
cp .env.example .env
```

Once you have copied the example, go into `.env` and replace the environment variables with valid values from your Canvas instance.
Note that you should register your patient app as a third-party app associated with your canvas instance. The `CLIENT_ID` and `CLIENT_SECRET` needed in your `.env` file is from your created third-party app. Here are [instructions](https://docs.canvasmedical.com/reference/authentication#registering-a-third-party-application-on-canvas) on how to register a new app.

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

In the proxy project folder, run:

```sh
mkdir deploy
zip -r deploy/deploy_proxy.zip .
```

Create an app using any PHI safe Docker environment. We recommend using [Aptible](https://deploy-docs.aptible.com/docs/apps) to deploy your proxy application. You can use the zip file created above to upload the proxy to your selected environment.

## Patient Authentication

In order to retrieve the `patient_key` required for all FHIR API requests:

- Call the `/Auth` endpoint with `key` and `patient` parameters
  - `key` is the API key stored as an environment variable on the proxy which is then provided to the customer.
  - `patient` is the patient's ID.
  - This would look like http://your-proxy-url.com/Auth?key=YOUR_API_KEY_HERE&patient=YOUR_PATIENT_ID_HERE, with `YOUR_API_KEY_HERE` and `YOUR_PATIENT_ID_HERE` replaced.
  - Assuming a valid API key, this endpoint will return a response with a body like `{"patient_key":"YOUR_PATIENT_KEY_HERE"}` where `YOUR_PATIENT_KEY_HERE` is what you will need for the `patient_key` parameter for all your other requests.
