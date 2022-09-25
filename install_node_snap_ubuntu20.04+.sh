#!/usr/bin/env bash

sudo snap install node --classic &&
    echo "Node version: $(node --version)" &&
    echo "NPM version: $(npm --version)"
