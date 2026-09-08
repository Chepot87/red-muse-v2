# Red Muse Nail Studio

A responsive, static nail studio website with a services page, image gallery, artist profile, and Calendly booking integration.

## Local preview

Requires Node.js. No dependency installation or build step is needed.

```sh
node preview.cjs
```

Open http://127.0.0.1:4173. Press Ctrl+C to stop the server.

## Structure

- `index.html`: home, services, and accessible image gallery
- `about.html`: artist profile
- `booking.html`: booking calendar
- `style.css`: shared styling and responsive layouts
- `script.js`: navigation and gallery interactions
- `img/`: website images

## Configuration to confirm

The current Calendly URL is `https://calendly.com/norvakweb/consultation-call`, which displays a 15-minute consultation call. Confirm the intended studio calendar and update both its widget URL and fallback link in `booking.html` if needed.

The Instagram profile URL has not been configured. The home page currently displays a placeholder label.

Google Fonts and Calendly require an internet connection. The website respects reduced-motion preferences and provides keyboard navigation for the gallery.
