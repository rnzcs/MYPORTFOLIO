# Renz Portfolio

A responsive developer portfolio featuring an introduction, about section, selected work, and contact form.

## Live portfolio

- Vercel: https://portfolio-one-xi-glrl91glot.vercel.app
- Firebase Hosting: https://renzportfolio.web.app

## Run locally

Open `index.html` in a browser, or use a simple static server.

The contact form opens a prefilled message in the visitor's default email app. Sending the message is completed from that app.

## Deploy to Vercel

Import this GitHub repository into Vercel. It is a static site: select **Other** as the framework, leave the build command empty, and use the repository root as the output directory.

You can also deploy from the repository root with the Vercel CLI:

```sh
vercel login
vercel --prod
```

## Deploy to Firebase Hosting

Create a Firebase project, then from the repository root:

```sh
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```

`.firebaserc` links this repository to the `renzportfolio` Firebase project. The site is static and does not require Firebase client keys or a database.
