<script setup>
const baseUrl = "https://fly.storage.tigris.dev/vite/noteOS/images/landing/";
</script>

<template>
  <div class="article">
    <h1
      id="6fdd1a85-f383-4870-83f6-ed06a84f4590"
      data-toc-id="6fdd1a85-f383-4870-83f6-ed06a84f4590"
    >
      How to Install <i>noteOS</i>
    </h1>
    <p>
      An easy way to host <i>noteOS</i> is by using the hosting service provided by
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        class="external"
        href="https://fly.io/docs/about/pricing/#free-allowances"
        >Fly.io</a
      >. However, you are free to choose any other cloud service provider that
      suits your needs. <i>noteOS</i> is designed with a lightweight and efficient
      technology architecture, ensuring minimal hardware requirements. This
      allows users to comfortably utilize the free tiers offered by most cloud
      providers while still enjoying a stable and reliable hosting experience.
    </p>
    <p>
      <strong>T</strong>his guide walks you through the initial deployment
      process and shows you techniques you can use to troubleshoot issues you
      may encounter in a new environment. Before we getting started, you might
      need to create an free account at
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        href="https://Fly.io"
        >Fly.io</a
      >
      to follow this installation guide step by step.
    </p>
    <h2
      id="7f22f4a4-62ab-4ff3-9bb4-a334f3e69ae9"
      data-toc-id="7f22f4a4-62ab-4ff3-9bb4-a334f3e69ae9"
    >
      Clone Source Code
    </h2>
    <div
      class="code-block-wrap relative scrollable"
      data-controller="copy-code"
    >
      <span
        class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
        >bash</span
      >
      <div class="actions">
        <button
          class="copy-code-button"
          data-copy-code-target="button"
          data-action="click->copy-code#copyToClipboard"
        >
          Copy
        </button>
      </div>
      <pre><code class="language-bash hljs" data-highlighted="yes" data-copy-code-target="code">git <span
          class="hljs-built_in">clone</span> https://github.com/x-tropy/noteOS.git</code></pre>
    </div>
    <h2
      id="84f697e8-06da-4726-bdc3-56a99bd65f2c"
      data-toc-id="84f697e8-06da-4726-bdc3-56a99bd65f2c"
    >
      <strong>Provision Rails and Postgres Servers</strong>
    </h2>
    <p>
      To configure and launch your Rails app, you can use
      <code>fly launch</code> and follow the wizard.
    </p>
    <div
      class="code-block-wrap relative scrollable"
      data-controller="copy-code"
    >
      <span
        class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
        >bash</span
      >
      <div class="actions">
        <button
          class="copy-code-button"
          data-copy-code-target="button"
          data-action="click->copy-code#copyToClipboard"
        >
          Copy
        </button>
      </div>
      <pre><code class="language-bash hljs" data-highlighted="yes" data-copy-code-target="code">fly launch</code></pre>
    </div>
    <div
      class="code-block-wrap relative scrollable"
      data-controller="copy-code"
    >
      <span
        class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
        >bash</span
      >
      <div class="actions">
        <button
          class="copy-code-button"
          data-copy-code-target="button"
          data-action="click->copy-code#copyToClipboard"
        >
          Copy
        </button>
      </div>
      <pre><code class="language-bash hljs" data-highlighted="yes" data-copy-code-target="code">Creating app <span
          class="hljs-keyword">in</span> ~/list
Scanning <span class="hljs-built_in">source</span> code
Detected a Rails app
? Choose an app name (leave blank to generate one): list
? Select Organization: John Smith (personal)
? Choose a region <span class="hljs-keyword">for</span> deployment: Ashburn, Virginia (US) (iad)
Created app list <span class="hljs-keyword">in</span> organization personal
Admin URL: https://fly.io/apps/list
Hostname: list.fly.dev
Set secrets on list: RAILS_MASTER_KEY
? Would you like to <span class="hljs-built_in">set</span> up a Postgresql database now? Yes
For pricing information visit: https://fly.io/docs/about/pricing/#postgresql-clu
? Select configuration: Development - Single node, 1x shared CPU, 256MB RAM, 1GB disk
Creating postgres cluster <span class="hljs-keyword">in</span> organization personal

. . .

Postgres cluster list-db is now attached to namelist
? Would you like to <span class="hljs-built_in">set</span> up an Upstash Redis database now? Yes
? Select an Upstash Redis plan Free: 100 MB Max Data Size

Your Upstash Redis database namelist-redis is ready.

. . .

      create  Dockerfile
      create  .dockerignore
      create  bin/docker-entrypoint
      create  config/dockerfile.yml
Wrote config file fly.toml

Your Rails app is prepared <span class="hljs-keyword">for</span> deployment.

Before proceeding, please review the posted Rails FAQ:
https://fly.io/docs/rails/getting-started/dockerfiles/.

Once ready: run <span class="hljs-string">'fly deploy'</span> to deploy your Rails app.</code></pre>
    </div>
    <p>
      You can set a name for the app, choose a default region, and choose to
      launch and attach either or both a PostgreSQL and Redis databases. Be sure
      to include Redis is if you make use of Action Cable, caching, and popular
      third-party gems like Sidekiq.
    </p>
    <h2
      id="ccf362d1-25a7-443c-80a7-7027667460b5"
      data-toc-id="ccf362d1-25a7-443c-80a7-7027667460b5"
    >
      <strong>Deploy your application</strong>
    </h2>
    <p>Deploying your application is done with the following command:</p>
    <div
      class="code-block-wrap relative scrollable"
      data-controller="copy-code"
    >
      <span
        class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
        >bash</span
      >
      <div class="actions">
        <button
          class="copy-code-button"
          data-copy-code-target="button"
          data-action="click->copy-code#copyToClipboard"
        >
          Copy
        </button>
      </div>
      <pre><code class="language-bash hljs" data-highlighted="yes" data-copy-code-target="code">fly deploy</code></pre>
    </div>
    <p>
      This will take a few seconds as it uploads your application, builds a
      machine image, deploys the images, and then monitors to ensure it starts
      successfully. Once complete visit your app with the following command:
    </p>
    <div
      class="code-block-wrap relative scrollable"
      data-controller="copy-code"
    >
      <span
        class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
        >bash</span
      >
      <div class="actions">
        <button
          class="copy-code-button"
          data-copy-code-target="button"
          data-action="click->copy-code#copyToClipboard"
        >
          Copy
        </button>
      </div>
      <pre><code class="language-bash hljs" data-highlighted="yes"
                 data-copy-code-target="code">fly apps open</code></pre>
    </div>
    <p>If all went well, you’ll see your Rails application homepage.</p>
    <h2
      id="74d14785-2424-4fb4-ada5-b38192bcd77d"
      data-toc-id="74d14785-2424-4fb4-ada5-b38192bcd77d"
    >
      <strong>Troubleshooting your initial deployment</strong>
    </h2>
    <p>
      Since this is an existing Rails app, its highly likely it might not boot
      because you probably need to configure secrets or other service
      dependencies. Let’s walk through how to troubleshoot these issues so you
      can get your app running.
    </p>
    <h3
      id="f0292d73-cb04-439e-a1d3-2a48cd2dbca7"
      data-toc-id="f0292d73-cb04-439e-a1d3-2a48cd2dbca7"
    >
      <strong>View log files</strong>
    </h3>
    <p>
      If your application didn’t boot on the first deploy, run
      <code>fly logs</code> to see what’s going on.
    </p>
    <div
      class="code-block-wrap relative scrollable"
      data-controller="copy-code"
    >
      <span
        class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
        >bash</span
      >
      <div class="actions">
        <button
          class="copy-code-button"
          data-copy-code-target="button"
          data-action="click->copy-code#copyToClipboard"
        >
          Copy
        </button>
      </div>
      <pre><code class="language-bash hljs" data-highlighted="yes" data-copy-code-target="code">fly logs</code></pre>
    </div>
    <p>
      This shows the past few log file entries and tails your production log
      files.
    </p>
    <p>
      Rails stack tracebacks can be lengthy, and the information you often want
      to see is at the top. If not enough information is available in the
      <code>fly logs</code> command, try running <code>fly dashboard</code>, and
      select <code>Monitoring</code> in the left-hand column.
    </p>
    <h3
      id="42a35d0a-0cf3-4516-88db-2810ad0137a9"
      data-toc-id="42a35d0a-0cf3-4516-88db-2810ad0137a9"
    >
      <strong>Open a Rails console</strong>
    </h3>
    <p>
      It can be helpful to open a Rails console to run commands and diagnose
      production issues. If you are not running with a sqlite3 or a volume, the
      recommended way to do this is to run a
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        href="https://fly.io/docs/reference/configuration/#console-command"
        >console</a
      >
      in an ephemeral Machine:
    </p>
    <div
      class="code-block-wrap relative scrollable"
      data-controller="copy-code"
    >
      <span
        class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
        >bash</span
      >
      <div class="actions">
        <button
          class="copy-code-button"
          data-copy-code-target="button"
          data-action="click->copy-code#copyToClipboard"
        >
          Copy
        </button>
      </div>
      <pre><code class="language-bash hljs" data-highlighted="yes" data-copy-code-target="code">fly console</code></pre>
    </div>
    <p>
      If you are running with sqlite3 or a volume, you will need to ssh into an
      existing machine. You may need to first make sure that you have enough
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        href="https://fly.io/docs/rails/getting-started/dockerfiles/#out-of-memory"
        >memory</a
      >
      to accommodate the additional session.
    </p>
    <div
      class="code-block-wrap relative scrollable"
      data-controller="copy-code"
    >
      <span
        class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
        >bash</span
      >
      <div class="actions">
        <button
          class="copy-code-button"
          data-copy-code-target="button"
          data-action="click->copy-code#copyToClipboard"
        >
          Copy
        </button>
      </div>
      <pre><code class="language-bash hljs" data-highlighted="yes" data-copy-code-target="code">fly ssh console --pty -C <span
          class="hljs-string">"/rails/bin/rails console"</span>

Loading production environment (Rails 7.0.4.2)
irb(main):001:0&gt; </code></pre>
    </div>
    <h2
      id="439ea73f-93aa-498e-bda7-5c29e210367d"
      data-toc-id="439ea73f-93aa-498e-bda7-5c29e210367d"
    >
      <strong>Common initial deployment issues</strong>
    </h2>
    <p>
      Now that you know the basics of troubleshooting production deployments,
      lets have a look at some common issues people have when migrating their
      existing Rails applications to Fly.
    </p>
    <h3
      id="04f07af2-bf80-4029-9d07-8afc41024c60"
      data-toc-id="04f07af2-bf80-4029-9d07-8afc41024c60"
    >
      <strong>Access to Environment Variables at Build Time</strong>
    </h3>
    <p>
      Some third-party gems and services require configuration including the
      setting of secrets/environment variables. The
      <code>assets:precompile</code> step will load your configuration and may
      fail if those secrets aren’t set even if they aren’t actually used by the
      <code>assets:precompile</code> step.
    </p>
    <p>
      Rails itself has such a variable, and you will see some combination of
      <code>SECRET_KEY_BASE</code> and <code>DUMMY</code> in most Dockerfiles.
    </p>
    <p>
      In many cases, you can avoid the problem by adding an
      <code>if</code> statement. For example, if your code looks like:
    </p>
    <div
      class="code-block-wrap relative scrollable"
      data-controller="copy-code"
    >
      <span
        class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
        >ruby</span
      >
      <div class="actions">
        <button
          class="copy-code-button"
          data-copy-code-target="button"
          data-action="click->copy-code#copyToClipboard"
        >
          Copy
        </button>
      </div>
      <pre><code class="language-ruby hljs" data-highlighted="yes" data-copy-code-target="code"><span
          class="hljs-title class_">Stripe</span>.api_key = <span class="hljs-title class_">Rails</span>.application.credentials.stripe[<span
          class="hljs-symbol">:secret_key</span>]</code></pre>
    </div>
    <p>
      Changing the configuration file to the following will avoid the build time
      error:
    </p>
    <div
      class="code-block-wrap relative scrollable"
      data-controller="copy-code"
    >
      <span
        class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
        >ruby</span
      >
      <div class="actions">
        <button
          class="copy-code-button"
          data-copy-code-target="button"
          data-action="click->copy-code#copyToClipboard"
        >
          Copy
        </button>
      </div>
      <pre><code class="language-ruby hljs" data-highlighted="yes" data-copy-code-target="code"><span
          class="hljs-keyword">if</span> <span class="hljs-title class_">Rails</span>.application.credentials.stripe
  <span class="hljs-title class_">Stripe</span>.api_key = <span class="hljs-title class_">Rails</span>.application.credentials.stripe[<span
            class="hljs-symbol">:secret_key</span>]
<span class="hljs-keyword">end</span></code></pre>
    </div>
    <p>
      If that is not sufficient and you need more such dummy values, add them
      directly to the <code>Dockerfile</code>. Just be sure that any such values
      you add to your Dockerfile don’t contain actual secrets as your Dockerfile
      will generally be committed to git or otherwise may be visible.
    </p>
    <p>
      If you have need for actual secrets at build time, take a look at
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        href="https://fly.io/docs/apps/build-secrets/"
        >Build Secrets</a
      >.
    </p>
    <p>
      Finally, if there are no other options you can generate a Dockerfile that
      will run <code>assets:precompile</code> at deployment time with the
      following command:
    </p>
    <div
      class="code-block-wrap relative scrollable"
      data-controller="copy-code"
    >
      <span
        class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
        >bash</span
      >
      <div class="actions">
        <button
          class="copy-code-button"
          data-copy-code-target="button"
          data-action="click->copy-code#copyToClipboard"
        >
          Copy
        </button>
      </div>
      <pre><code class="language-bash hljs" data-highlighted="yes" data-copy-code-target="code">bin/rails generate dockerfile --precompile=defer</code></pre>
    </div>
    <p>This will result in larger images that are slower to deploy:</p>
    <ul>
      <li>
        <p>
          The precompile step will be run for each server you deploy rather that
          once during build time to produce an image that can be deployed
          multiple times.
        </p>
      </li>
      <li>
        <p>
          Normally Dockerfiles are structured so that packages that are only
          needed at build time (e.g. Node.js) are not present on the deployed
          machine.<br />If you defer the <code>assets:precompile</code> step,
          these packages will need to be present in order to deploy.
        </p>
      </li>
    </ul>
    <p>
      If you are evaluating
      <a target="_blank" rel="noopener noreferrer nofollow" href="http://Fly.io"
        >Fly.io</a
      >
      for the first time there may be some value in setting precompile to defer
      initially for evaluation and then work over time to eliminate the issues
      that prevent you from running this step at build time. Once those issues
      are resolved, regenerate your Dockerfile using the following command:
    </p>
    <div
      class="code-block-wrap relative scrollable"
      data-controller="copy-code"
    >
      <span
        class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
        >bash</span
      >
      <div class="actions">
        <button
          class="copy-code-button"
          data-copy-code-target="button"
          data-action="click->copy-code#copyToClipboard"
        >
          Copy
        </button>
      </div>
      <pre><code class="language-bash hljs" data-highlighted="yes" data-copy-code-target="code">bin/rails generate dockerfile --precompile=build</code></pre>
    </div>
    <p></p>
  </div>
</template>

<style scoped></style>
