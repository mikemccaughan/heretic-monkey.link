#!/bin/bash

rootDir=$(dirname "$PWD")

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

# loop through each directory and run the command if it exists
for dir in "${directoriesYarn[@]}"; do 
  if [ -d "$dir" ]; then 
    echo "Building and deploying $dir..."
    (cd "$dir" && $commandYarn)
  else
    echo "Directory $dir does not exist. Skipping..."
  fi
done

# loop through each directory and run the command if it exists
for dir in "${directoriesNpm[@]}"; do 
  if [ -d "$dir" ]; then 
    echo "Building and deploying $dir..."
    (cd "$dir" && $commandNpm)
  else
    echo "Directory $dir does not exist. Skipping..."
  fi
done