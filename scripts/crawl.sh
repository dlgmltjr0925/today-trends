#!/bin/sh
# config git
git config --global user.email "dlgmltjr0925@gmail.com" 
git config --global user.name "HeeSeok Lee"
git config --global credential.helper '!f() { sleep 1; echo "username=${GITHUB_USERNAME}"; echo "password=${GITHUB_PASSWORD}";^C; f'

# Clone repository
git clone https://github.com/dlgmltjr0925/today-trends.git
cd today-trendsc

# Install node_modules
yarn && yarn crawl

# Check the Git status
git_status=$(git status --porcelain)

# Check if the working tree is clean or has changes
if [ -z "$git_status" ]; then
  echo "Git working tree is clean."
else
  echo "Git working tree has changes:"
  echo "$git_status"

  git add .
  git commit -m "chores: update data"

  git push
fi

