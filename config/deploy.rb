require 'capistrano/rails'
require 'capistrano/bundler'
require 'capistrano/rvm'
require 'capistrano/setup'
require 'capistrano/deploy'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
require 'capistrano/ssh_doctor'

set :application, 'LetsDoIt'
set :repo_url, 'git@gitlab.com:rtriska/LetsDoIt.git'
set :deploy_to, '/www/LetsDoIt'
set :scm, :git
set :branch, 'develop'
set :user, 'ubuntu'
set :use_sudo, false
set :rails_env, 'production'
set :deploy_via, :remote_cache
set :keep_releases, 2
set :pty, true

server "54.175.169.251", :roles => [:app, :web, :db], :primary => true

namespace :deploy do
  task :start do ; end
  task :stop do ; end

  desc 'Symlink shared config files'
  task :symlink_config_files do
    run "#{ sudo } ln -s #{ deploy_to }/shared/config/database.yml #{ current_path }/config/database.yml"
  end

    desc 'Precompile assets after deploy'
  task :precompile_assets do
    run <<-CMD
      cd #{ current_path } &&
      #{ sudo } bundle exec rake assets:precompile RAILS_ENV=#{ rails_env }
    CMD
  end

  desc 'Restart applicaiton'
  task :restart do
    run "#{ try_sudo } touch #{ File.join(current_path, 'tmp', 'restart.txt') }"
  end
end

after 'deploy', 'deploy:symlink_config_files'
after 'deploy', 'deploy:restart'
after 'deploy', 'deploy:precompile_assets'

