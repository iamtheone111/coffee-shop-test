# The Coffee Shop

It uses `expo` framework which makes it very easy to test both in browser and on mobile.

To start:

```sh
yarn install
yarn start
```

It will open page in a browser.

Then you can test browser version by clicking `Run in web browser`.

To test it on mobile install `expo` application from store, connect the phone to the same wifi network, screenshot QR code from the browser page and voila.

## Assessment completion

Barista can make one coffee at a time with specific delay for each kind of coffee.

When item appears in a queue it has `queued` state, when barista starts making it state becomes `in progress`, and `ready` when it's ready.

Item should be removed from queue in average of 3 seconds - did not have time to implement it.
