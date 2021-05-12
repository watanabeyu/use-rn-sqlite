#!/bin/bash

# check this version is enable to release or not
npx can-npm-publish
if [ $? -eq 1 ] ; then
  exit 1
fi