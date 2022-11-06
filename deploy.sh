#!/bin/zsh
git checkout production
git merge main
git push
git checkout main
