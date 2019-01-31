# Share API Polyfill

This is a polyfill for the `Sharing API` that can be used in desktop too, so your users can shere in their twitter, facebook, messenger, linkedin, sms, e-mail, print, telegram or whatsapp.

It also supports multilanguage (so far, english, spanish and portuguese, but you can help us with that).

This is a very simple, single file import polyfill.

## Insalling it:

Just import it like so:

```
<script src="https://naschq.github.io/share-api-polyfill/dist/share-min.js"></script>
```

> Note that we are using the github cdn to load it, you could also save it in your own structure so you can cache it with service workers and have it "close" to your own domain.

Now, it will use the native share panel if it is available (only available on mobile devices) and, if not, it will enable an HTML structure in your page showing options for your users.

Here, check this demo and see it in action.