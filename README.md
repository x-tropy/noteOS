# README

## Dev log

* rails new noteos
* fly launch (without tigris)
* link repo to github
* downgrade to 512mb, require 1 min_machines_running
* add /.idea to .gitignore
* create noteos bucket on tigris
* add custom domain: noteos.fly.dev -> noteos.org
* set up local development.sqlite3 (wsl -> windows)
* add views: Home#index, Home#about
* manual prettier in RubyMine: `shift + alt + F`
* [integrate with Devise](https://dev.to/kevinluo201/how-to-setup-very-basic-devise-in-rails-7-55ia)
* [setup CD](https://fly.io/docs/launch/continuous-deployment-with-github-actions/#speed-run-your-way-to-continuous-deployment) (continuous deployment)
* Sign out: use turbo_method to send DELETE request to server
* set up action text
* install paper_trail, friendly_id
* generate model Article (title, slug, author)
* update Article model
* generate friendly_id
