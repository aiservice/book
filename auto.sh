#!/bin/bash

commit_name="`date +%Y%m%d%H%k%M`_commit"
echo "====git auto push start..."
git add .
git commit -m "fix code"
git push
echo "====git auto push end..."

