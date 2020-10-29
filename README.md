# stefankracht.de

## local server

- use `npm run dev` to start local server

## deploy

- pushing to a certain branch will publish this project:

  - **preview** : https://preview.stefankracht.de
  - **master** : https://stefankracht.de
  - pushing **to any other branch name** will create a build under a generic link like https://stefankrachtde-ladeln6x9.vercel.app (the link will be listed on the vercel.com dashboard)

- run `npm run rss-generate` before a deploy to update the static rss fee
