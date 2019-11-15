#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'www.ymatzki.info' > CNAME

git init
git add -A
git commit -m "deploy version $(date +%Y%m%d%H%M%S)"

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:ymatzki/ymatzki.github.io.git master

cd -