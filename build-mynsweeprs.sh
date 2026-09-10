#!/bin/bash
#
rootDir=$(dirname "$PWD")
#
# dirctories to build and deploy
directoriesYarn=(
    "$rootDir/mynsweepr-hooks"
    "$rootDir/mynsweepr-react"
    "$rootDir/mynsweepr-react19"
)
directoriesNpm=(
    "$rootDir/mynsweepr-angular"
)
# command to run
commandYarn="yarn run build:deploy"
commandNpm="npm run build:deploy"
#
# loop through each directory and run the command if it exists
for dir in "${directoriesYarn[@]}"; do 
  if [ -d "$dir" ]; then 
    echo "Installing yarn and dependencies for $dir..."
    (cd "$dir" && yarn install)
    echo "Building and deploying $dir..."
    (cd "$dir" && bash $commandYarn)
  else
    echo "Directory $dir does not exist. Skipping..."
  fi
done
#
# loop through each directory and run the command if it exists
for dir in "${directoriesNpm[@]}"; do 
  if [ -d "$dir" ]; then 
    echo "Installing npm and dependencies for $dir..."
    (cd "$dir" && npm -g npm@latest && npm install)
    echo "Building and deploying $dir..."
    (cd "$dir" && bash $commandNpm)
  else
    echo "Directory $dir does not exist. Skipping..."
  fi
done