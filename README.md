# stefankracht.de

## local server

- use `npm run dev` to start local server

## deploy

- use `npm run rss-generate` to update the static rss feed
- the `now` command will deploy to a remote server and provide a subdomain to preview the result
  - `now --prod` will do the same thing and also alias to the production domain
  - `now alias stefankracht.de` will alias the last `now`
- `npm run deploy` chain `npm run rss-generate` and `now --prod`
