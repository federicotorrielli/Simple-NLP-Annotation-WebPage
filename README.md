# Simple React Annotation Page

## Intro

The following is a simple React application that allows users to annotate words in standard NLP fashion. The application
is built using the following technologies:

- React
- Vite
- Tailwind CSS
- TypeScript

## Getting Started

To get started, clone the repository, make sure you have _yarn_ and install the dependencies:

```bash
git clone git@github.com:federicotorrielli/BasicOrAdvanced.git
cd BasicOrAdvanced
yarn install
```

Modify the `src/App.tsx` file _firebaseConfig_ variable with your own Firebase configuration.
To get started with Firebase, follow the instructions [here](https://firebase.google.com/docs/web/setup).

Start the development server:

```bash
yarn dev
```

That's it! You should be able to see the application running at [http://localhost:3000](http://localhost:3000).

## Publish on Github Pages

Create a new workflow `deploy.yml` modifying `YOUR_NAME` and `YOUR_REPO` everywhere you see.

```
name: build-gh-pages

on:
  push:
    branches:
      - main
      - master

defaults:
  run:
    shell: bash

jobs:
  build-gh-pages:
    name: ${{ matrix.command }}
    runs-on: ubuntu-20.04
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Use Node.js 16
        uses: actions/setup-node@v1
        with:
          node-version: 16

      - run: yarn install

      - name: Build core
        run: yarn build

      - name: Push build to gh-pages branch
        run: |
          git config --global user.name "bot"
          git config --global user.email "YOUR_NAME@users.noreply.github.com'"
          git clone https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/YOUR_NAME/YOUR_REPO --depth 1 --branch gh-pages gh-pages
          cd gh-pages
          git rm -rf .
          cp -r ../dist/* .
          git add -A
          git commit -m "Update gh-pages"
          git remote set-url origin https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/YOUR_NAME/YOUR_REPO
          git push origin gh-pages
```

## License

BSD 3-Clause License: [https://opensource.org/licenses/BSD-3-Clause](https://opensource.org/licenses/BSD-3-Clause)

### How it works?

The BSD 3-Clause license is a type of open-source license that allows for the use, modification, and distribution of
software, with the condition that the original copyright notice and the license terms are retained in the source code.