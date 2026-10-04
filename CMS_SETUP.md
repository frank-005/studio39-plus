# Studio 39+ content editing

The editor is available at **https://studio39ke.com/admin/**. It is a private editing interface; visitors to the main website do not see it. The public site reads the JSON documents in `src/content/`. When you publish a change, Decap commits the updated content file to the `main` branch. The existing GitHub Actions workflow then rebuilds and deploys the site to GitHub Pages.

## First time: enable sign in

The site is hosted on GitHub Pages. GitHub requires a small OAuth proxy for Decap sign in; GitHub Pages cannot run that server. An administrator must deploy a trusted Decap-compatible GitHub OAuth proxy (for example, the Cloudflare Worker template linked from the [Decap GitHub backend guide](https://decapcms.org/docs/github-backend/)) and create a GitHub OAuth App for it.

In the OAuth App, set the callback URL to the proxy's `/callback` address. Keep its client secret only in the proxy's secret store. Then add the proxy origin to `backend.base_url` in `public/admin/config.yml` (for example `https://cms-auth.example.com`) and set the OAuth App's homepage to `https://studio39ke.com`. Do not put a client secret, access token, or password in this repository. Editors sign in with GitHub accounts that have write access to `frank-005/studio39-plus`.

## Editing and publishing

1. Open `/admin/` and choose **Login with GitHub**.
2. Use **Pages → Homepage** to edit the hero slides and buttons, introduction, featured projects and services, and calls to action. Featured items refer to the existing projects and services; their descriptions are maintained in one place.
3. Use **Projects** to edit a project or choose **New Project**. Keep the existing URL slug when updating a project. Mark **Published** off to hide a project from the website. Mark **Featured on homepage** to use it when the homepage selection is empty; normally select it in Homepage → Featured projects as well.
4. In a project's **Gallery images**, add images, captions, and alt text; drag entries to reorder them. Existing project images and drawings stay in their current folders. New uploads are saved under `public/uploads/` and use the website's normal public image paths.
5. Use **Services** to edit reusable service pages and their homepage order/visibility.
6. Use **Pages → About** for the About page, and **Pages → Site settings and SEO** for studio contacts, social links, page metadata, and default social image.
7. Choose **Save** to commit and publish. GitHub Actions builds the public website after the commit; allow the deployment to finish before expecting the live site to update. There is no separate draft preview workflow on this GitHub Pages setup.

## Adding fields

CMS fields are declared in `public/admin/config.yml`. A field name must match the existing JSON key read by the frontend. For new public content, also connect the field to the relevant React page/data module, provide a fallback for missing values, and keep the existing layout and accessibility behavior. Project URLs are generated from their existing slugs, so changing a slug requires a deliberate redirect and link review.

## Hosting notes

- `public/admin/` is copied to the site root by Vite, so the editor URL is `/admin/`.
- The backend points to the existing `frank-005/studio39-plus` repository and `main` content branch. Do not point it at the deployment-only `gh-pages` branch.
- The OAuth proxy and GitHub OAuth App are manual one-time requirements. Never commit their secret values.
- The Decap admin script is pinned to version 3.16.3 on jsDelivr. `public/_headers` includes the required script and GitHub API sources for hosts that honor this header format. GitHub Pages does not apply `_headers`; enforce response headers at a CDN or hosting layer if required.
