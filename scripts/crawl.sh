#!/bin/sh
mkdir ~/.ssh
echo "-----BEGIN OPENSSH PRIVATE KEY-----" > ~/.ssh/id_rsa
echo ${SSH_PRIVATE_KEY} | tr ' ' '\n' >> ~/.ssh/id_rsa
echo "-----END OPENSSH PRIVATE KEY-----" >> ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Clone repository
echo "Host github.com\n\tStrictHostKeyChecking no" > ~/.ssh/config
chmod 400 ~/.ssh/config

git clone git@github.com:dlgmltjr0925/today-trends.git
cd today-trends

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
    
  # config git
  git config --global user.email "dlgmltjr0925@gmail.com" 
  git config --global user.name "HeeSeok Lee"

  git add .
  git commit -m "chores: update data"

  git push
fi

