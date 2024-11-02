# README

## Dev log

- rails new noteos
- fly launch (without tigris)
- link repo to github
- downgrade to 512mb, require 1 min_machines_running
- add /.idea to .gitignore
- create noteos bucket on tigris
- add custom domain: noteos.fly.dev -> noteos.org
- set up local development.sqlite3 (wsl -> windows)
- add views: Home#index, Home#about
- manual prettier in RubyMine: `shift + alt + F`
- [integrate with Devise](https://dev.to/kevinluo201/how-to-setup-very-basic-devise-in-rails-7-55ia)
- [setup CD](https://fly.io/docs/launch/continuous-deployment-with-github-actions/#speed-run-your-way-to-continuous-deployment) (continuous deployment)
- Sign out: use turbo_method to send DELETE request to server
- set up action text
- install paper_trail, friendly_id
- generate model Article (title, slug, author)
- update Article model
- generate friendly_id_slugs
- generate versions: g paper_trail:install
- generate model Comment & 1 migration
- generate controller Articles
- customized article views (time to reboot sever!)
- rails generate migration FixArticleAuthorForeignKey
- set node environment for RubyMine
- ~~install @hotwired/stimulus~~ stimulus is built-in
- use tiptap (instead of trix)
- add gem "vite_rails"
- [use stimulus with vite](https://sasikala-r.medium.com/rails-7-with-vite-stimulus-tailwind-c3ecf2191ea9)
- use yarn to add node packages (run "yarn" to init yarn.lock file)
- put stimulus under vite's control
- fly deploy (with vite & node)
- add Tailwind
- add Vue
- use Tailwind in Vue
- install [Tiptap](https://tiptap.dev/docs/editor/getting-started/install/vue3)
- remove action_text?
- active record + tigris
- Tiptap + Vue now works!
- add fonts: juzhen, jetbrains mono, noto sans sc, source serif pro
- add syntax highlight for code block: js, ts, css, html, vue, ruby, erb, sql, bash, json,
- add tabler icons
- rewrite code language label
- TODO: add horizontal rule, link
- add crelt to simplify HTML element creation
- add syntax highlighting for SFC Vue: https://github.com/highlightjs/highlightjs-vue
- add syntax highlighting for markdown
- responsive design: /articles/index, /articles/show
- add image support (use tigris)
- FIX: font loading slow
- TODO: add image & attachment support in editor
- TODO: placeholder
- TODO: add /handle in url
- add: vite-plugin-rails, remove: vite-plugin-ruby, vite-plugin-full-reload, vite-plugin-stimulus-hmr
- TODO: add: confirm before delete article
- TODO: emoji
- TODO: task item
- TODO: table
- TODO: details
- TODO: youtube
- TODO: bubble & float menu
- TODO: callout
- add tooltip for toolbar items
- add Bilibili video (iframe) embed
