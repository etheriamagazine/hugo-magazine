# hugo-etheria

A Hugo module-based theme for Etheria Magazine.


Copyright


## imgproxy
This hugo theme uses [imgproxy](https://imgproxy.net) for image optimization. See the
[partial templates](./layouts/partials/imgproxy)

### Configuring URL signature
For a secure operation of imgproxy, image URLs need to be [signed](https://docs.imgproxy.net/usage/signing_url) with a pair of key & salt pair shared by both, the imgproxy instance and the 
hugo build process.

On the <ins>imgproxy instance</ins>, use hex enconding to set the `IMGPROXY_SALT` &
`IMGPROXY_KEY` environment vars.
```bash
export IMGPROXY_SALT=$(echo "my_secret_salt" | xxd -g 2 -p | tr -d "\n")
export IMGPROXY_KEY=$(echo "my_secret_key" | xxd -g 2 -p | tr -d "\n")
```

On a <ins>hugo build</ins>, make sure `HUGO_IMGPROXY_SALT` and `HUGO_IMGPROXY_KEY` are
set to the same values in clear text.
```bash
export HUGO_IMGPROXY_SALT=my_secret_salt
export HUGO_IMGPROXY_KEY=my_secret_key
```

If using either `bun` or `npm` with `dotenv` pakckage, you can place this secrets in an .env file

```bash
# .env file
HUGO_IMGPROXY_SALT=my_secret_salt
HUGO_IMGPROXY_KEY=my_secret_key
```
## Building & serving site

Starting server & watch with example content:
```
npm run dev
```


Build:
```
npm run build:css && hugo
```

Build site
```
npm run watch:css & hugo server ; fg
```


Content by Pepa & Susana.
Migration from WordPress to Hugo by Germán.
