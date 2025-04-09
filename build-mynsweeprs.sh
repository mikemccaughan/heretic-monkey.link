#!/bin/bash

# dirctories to build and deploy
directoriesYarn=(
    "/c/Users/ms/Source/Repos/mynsweepr-hooks"
    "/c/Users/ms/Source/Repos/mynsweepr-react"
    "/c/Users/ms/Source/Repos/mynsweepr-react19"
)
directoriesNpm=(
    "/c/Users/ms/Source/Repos/mynsweepr-angular"
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