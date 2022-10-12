#!/bin/bash

set -e

set -x

APP_NAME="modern-age-proxy-dev"

REPOSITORY_URI=004266138750.dkr.ecr.us-west-2.amazonaws.com/canvasmedical/embed_proxy:latest
REPOSITORY_NAME=canvasmedical/embed_proxy

echo "This will deploy '$APP_NAME' to aptible"

if [ "$NO_INPUT" == "" ]; then
  read -rp "Are you sure you wish to continue? (y/N) "

  if [ "$REPLY" != "y" ]; then
      exit
  fi
fi

# Push to Amazon Container Service
function push_to_ecr () {
  local REPOSITORY_URI=$1
  local REPOSITORY_NAME=$2
  local DOCKERFILE=${3:-Dockerfile}

  # Enable Docker buildkit.
  export DOCKER_BUILDKIT=1

  # Login to Docker
  aws ecr get-login-password --region us-west-2 |\
    docker login --username AWS --password-stdin 004266138750.dkr.ecr.us-west-2.amazonaws.com

  # linux needs calls to docker to go through sudo
  DOCKER_COMMAND=docker
  if [[ $(uname) == "Linux" ]]; then
      DOCKER_COMMAND="sudo docker"
  fi

  # Use coreutils for grep and sed if available (usually for MacOS compatibility)
  SED_COMMAND="$(command -v gsed >/dev/null && echo gsed || echo sed)"

  # Use the tag name if it exists... (Command needs to evaluate to 0 to not kill the shell.)
  GIT_COMMIT_BRANCH=$(git describe --tags --exact-match || echo 2> /dev/null)

  # ...and the branch name if it doesn't
  if [[ -z "$GIT_COMMIT_BRANCH" ]]; then
    GIT_COMMIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  fi

  # Slugify the branch name to make it docker tag friendly.
  # BRANCH_SLUG=$(echo "$GIT_COMMIT_BRANCH" | iconv -t "ascii//TRANSLIT" | $SED_COMMAND -r "s/[^a-zA-Z0-9]+/-/g" | $SED_COMMAND -r "s/^-+\|-+$//g" | tr "[:upper:]" "[:lower:]")

    # --cache-from "$REPOSITORY_NAME:master" \
    # --cache-from "$REPOSITORY_NAME:$BRANCH_SLUG" \

  $DOCKER_COMMAND build \
    --pull \
    --target prod \
    --platform linux/amd64 \
    --tag "$REPOSITORY_NAME" \
    --file "$DOCKERFILE" \
    .

  # $DOCKER_COMMAND tag "$REPOSITORY_NAME:latest" "$REPOSITORY_URI"
  $DOCKER_COMMAND push "$REPOSITORY_URI"
}

function deploy_aptible() {
  local APP_NAME=$1

  local ECS_SERVICE_NAME=$2
  local REPOSITORY_URI=$3

  # Set ENV Var for Aptible Deployments
  APTIBLE_PRIVATE_REGISTRY_USERNAME="AWS"
  APTIBLE_PRIVATE_REGISTRY_PASSWORD=$(aws ecr get-login-password --region us-west-2)

  aptible deploy \
    --app "$ECS_SERVICE_NAME" \
    --docker-image "$REPOSITORY_URI" \
    --private-registry-username "$APTIBLE_PRIVATE_REGISTRY_USERNAME" \
    --private-registry-password "$APTIBLE_PRIVATE_REGISTRY_PASSWORD"
}

push_to_ecr "$REPOSITORY_URI" "$REPOSITORY_NAME"

deploy_aptible \
  "$APP_NAME" \
  "$APP_NAME" \
  "$REPOSITORY_URI"
