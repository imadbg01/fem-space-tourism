#!/usr/bin/env sh

set -e

pnpm run build

cd dist

git chekout -b main

git add -A

git commit -m 'deploy'

git push -u git@github.com:imadbg01/fem-space-tourism.git

cd ~