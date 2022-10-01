# Share API Polyfill

This is a (6kb) polyfill for the `Web Share API` that can be used on desktop, too, so your users can share in their Twitter, Facebook, Messenger, LinkedIn, SMS, email, print, Telegram or WhatsApp.

It also supports multi-language ([see the list of languages](#multi-language) - and you can help us with that :) ).

This is a single file import polyfill which relies on the `navigator.share()` method of the [Web Share API](https://www.w3.org/TR/web-share/).

![JavaScript Share API Polyfill in a Browser](https://github.com/on2-dev/share-api-polyfill/blob/master/demo/demo.gif?raw=true)  
[see the Share API Polyfill in action](https://on2-dev.github.io/share-api-polyfill/demo/)

## Installing it:

Import it like so:

```html
<script src="https://unpkg.com/share-api-polyfill/dist/share-min.js"></script>
```

> Note that we are using the unpkg CDN to load it. You could also save it in your own structure so you can cache it with service workers and have it "close" to your own domain.

You can also install it using npm:

```sh
npm install share-api-polyfill --save
# or
yarn add share-api-polyfill
```

Now, it will use the native share panel if it is available (only available on mobile devices), and if not, it will enable an HTML structure on your page showing options for your users.

Here, check this demo and see the [share api polyfill in action](https://on2-dev.github.io/share-api-polyfill/demo/).

## The Share API

The official Share Api works like this:

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
Also, you can pass in a list of hashtags to be used when sharing on Twitter or Facebook. Only one hashtag can be shared on Facebook, so the first one on the list will be shared.

```js
navigator.share({
  title: 'Web Share API Polyfill',
  text: 'A polyfill for the Share API. Use it to share in both desktops and mobile devices.',
  url: location.href,

  // extra, optional options
  fbId: '123456789123456',
  hashtags: ['javascript', 'shareAPI', 'Polyfill']
})
.then( _ => console.log('Yay, you shared it :)'))
.catch( error => console.log('Oh noh! You couldn\'t share it! :\'(\n', error));
```

> You can pass the hashtags as a single (comma-separated) string or as an array.

### Multi-language

It will try and use the supported languages based on the user's `browser language` configuration.  
If the language is not found, it will use a fallback (default English).

Currently supported languages:

- cs
- de
- it
- da
- en
- es
- fr
- hi
- hu
- is
- ja
- ko
- nl
- ta
- pl
- pt
- ru
- sv
- sk
- tr
- zh

> Feel free to contribute with more languages by sending Pull Requests for them :)

### Turning features off - on Desktop

You can disable some of the social buttons from the tool by passing a second object as the argument.  
As your mobile device will probably have native support for the share API, it will be ignored, being applied only for desktops.

Example:

```js
navigator.share({
    title: 'Web Share API Polyfill',
    text: 'A polyfill for the Share API. Use it to share in both desktops and mobile devices.',
    url: location.href,

    fbId: '123456789123456',
    hashtags: 'javascript,shareAPI,polyfill'
  },
  {
    // change these configurations to hide specific unnecessary icons
    copy: true,
    email: true,
    print: true,
    sms: true,
    messenger: true,
    facebook: true,
    whatsapp: true,
    twitter: true,
    linkedin: true,
    telegram: true,
    skype: true,
    pinterest: true,
    language: 'pt' // specify the default language
  }
)
  .then( _ => console.log('Yay, you shared it :)'))
  .catch( error => console.log('Oh noh! You couldn\'t share it! :\'(\n', error));
```

  > If you disable Skype, it will no longer load Skype's SDK, which might be something you want, in case you would like to improve the privacy in your project, avoiding loading **third-party libraries**.

## It's open source

Yup, it's open source, and you can contribute to it! :)

Please refer to our [CONTRIBUTING.md](https://github.com/on2-dev/share-api-polyfill/blob/master/CONTRIBUTING.md) and help us improve this tool.

To build it locally, install the dependencies:

```sh
npm install
```

Build it with gulp:

```sh
npm run build
```

And try it locally:

```sh
npm run demo
```

Also, if you need to change the icons, they are SVGs located on the share.js script.
You will find the original vector (.svg) in the src/icons directory in case you want to change it and copy the SVG code.

## Donate ❤️

Buy us a coffee :)

BTC: 1GuTME1bGbk7hY7ssrUBh3M1k4AeyVCSjW<br/>
ETH: 0x49f1612d4a8e9165f2eb94be79af9dbbf3815af5
