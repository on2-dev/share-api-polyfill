# Share API Polyfill

This is a polyfill for the `Web Share API` that can be used in desktop too, so your users can share in their twitter, facebook, messenger, linkedin, sms, e-mail, print, telegram or whatsapp.

It also supports multilanguage (so far, available in English, Spanish, Portuguese and Chinese, and you can help us with that :) ).

This is a very simple, single file import polyfill.

![JavaScript Share API Polyfill in a Browser](https://github.com/NascHQ/share-api-polyfill/blob/master/demo/demo.gif?raw=true)

## Installing it:

Just import it like so:

```html
<script src="https://unpkg.com/share-api-polyfill/dist/share-min.js"></script>
```

> Note that we are using the unpkg cdn to load it, you could also save it in your own structure so you can cache it with service workers and have it "close" to your own domain.

You can also install it using npm:

```sh
npm install share-api-polyfill --save
# or
yarn add share-api-polyfill
```

Now, it will use the native share panel if it is available (only available on mobile devices) and, if not, it will enable an HTML structure in your page showing options for your users.

Here, check this demo and see the [share api polyfill in action](https://naschq.github.io/share-api-polyfill/demo/).

## The Share API

The oficial share api works like this:

```js
navigator.share({
    title: 'Web Share API Polyfill',
    text: 'A polyfill for the Share API. Use it to share in both desktops and mobile devices.',
    url: location.href
})
.then( _ => console.log('Yay, you shared it :)'))
.catch( error => console.log('Oh noh! You couldn\'t share it! :\'(\n', error));
```

But in this case, you can also pass your `Facebook App Id` to enable sharing with **messenger**.
Also, you can pass in a list of hashtags to be used when sharing with twitter.

```js
navigator.share({
    title: 'Web Share API Polyfill',
    text: 'A polyfill for the Share API. Use it to share in both desktops and mobile devices.',
    url: location.href,

    fbId: '123456789123456',
    hashtags: 'javascript,shareAPI,polyfill'
})
.then( _ => console.log('Yay, you shared it :)'))
.catch( error => console.log('Oh noh! You couldn\'t share it! :\'(\n', error));
```

## It's open source

Yup, it's open source and you can contribute to it :)

Please refer to our [CONTRIBUTING.md](https://github.com/NascHQ/share-api-polyfill/blob/master/CONTRIBUTING.md) and help us improve this tool.

To re-build id, just install the dependencies:

```sh
npm install
```

And build it with gulp

```sh
npm run build
```

And try it locally

```sh
npm run demo
```

Also, if you need to change the icons, they are SVGs located on the share.js script.
You will find the oridinal vector (.svg) in the src/icons directory in case you want to change it and copy the svg code.