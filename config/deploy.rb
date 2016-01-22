set :application, 'LetsDoIt'
set :repo_url, 'git@gitlab.com:rtriska/LetsDoIt.git'
set :deploy_to, '/www/LetsDoIt'
set :scm, :git
set :branch, 'develop'
set :user, 'ubuntu'
set :use_sudo, false
set :deploy_via, :remote_cache
set :keep_releases, 2
set :pty, true
set :unicorn_rack_env, -> { 'production' }
set :rails_env, 'production'

namespace :deploy do
  task :start do ; end
  task :stop do ; end
end
