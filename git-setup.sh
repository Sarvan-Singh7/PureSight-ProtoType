#!/usr/bin/env bash

# git-setup.sh
# This script initializes a git repository (if not already), adds all files, commits, and pushes to the remote repository.

# Exit on any error
set -e

# Repository URL (replace with your actual repo if different)
REPO_URL="https://github.com/Sarvan-Singh7/PureSight-ProtoType.git"

# Ensure we are in the project root (the directory containing this script)
cd "$(dirname "$0")"

# Initialize git if .git directory does not exist
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
fi

# Add remote origin if not already set
if ! git remote | grep -q '^origin$'; then
  echo "Adding remote origin..."
  git remote add origin "$REPO_URL"
else
  # Update URL in case it changed
  git remote set-url origin "$REPO_URL"
fi

# Ensure .gitignore exists (create a minimal one if missing)
if [ ! -f ".gitignore" ]; then
  echo "Creating default .gitignore..."
  cat <<EOF > .gitignore
node_modules/
/dist/
.env
.DS_Store
npm-debug.log
yarn-debug.log
yarn-error.log
EOF
fi

# Stage all changes
git add .

# Commit (use a generic message if there are no previous commits)
if git rev-parse --verify HEAD >/dev/null 2>&1; then
  # There is at least one commit; create a new commit only if there are changes
  if git diff-index --quiet HEAD --; then
    echo "No changes to commit."
  else
    git commit -m "Update project files"
  fi
else
  # First commit
  git commit -m "Initial commit"
fi

# Push to the remote repository (force push if needed for an empty repo)
git push -u origin master

echo "Repository push complete."
