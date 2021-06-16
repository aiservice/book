#!/bin/bash

commit_name="commit_`date +%Y%m%d%H`"
echo "====git auto push start...$commit_name"
git add .
git commit -m $commit_name
git push
echo "====git auto push end..."

