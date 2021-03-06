source 'https://rubygems.org'
ruby '2.2.1'

gem 'therubyracer', '0.12.2'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.4'
# Use mysql as the database for Active Record
gem 'mysql2', '~> 0.3.18'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use jquery as the JavaScript library
gem 'jquery-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc
# Bootstrap CSS
gem 'bootstrap-sass', '3.3.6'
# Managing attached files
gem 'paperclip', '4.3.2'
# For sending emails in background
gem 'resque', '1.25.2'
# Flexible authentication solution for Rails with Warden
gem 'devise', '3.5.2'
# For sending mails in background
gem 'devise-async', '0.10.1'
# OAuth gem for facebook authentication
gem 'omniauth-facebook'
#  API for performing paginated queries with Active Record
gem 'will_paginate', '3.0.7'
gem 'responders', '~> 2.0'
# Protection from CSRF
gem 'angular_rails_csrf'
# Haml generators for Rails 4, also enables Haml as the templating engine
gem 'haml-rails', '~> 0.9'
# Font Awesome Rails Gem for awesome fonts in rails
gem 'font-awesome-rails', '~> 4.5'
# State machine
gem 'aasm'
# Use your angular templates with rails' asset pipeline
gem 'angular-rails-templates', '0.2.0'
# Clean ruby syntax for writing and deploying cron jobs.
gem 'whenever', '0.9.4'
# Publish-subscribe messaging system
gem 'faye'
# Load environment variables from .env into ENV in development.
gem 'dotenv-rails'




group :development, :test, :gitlabci do
  # Local development server
  gem 'thin', '~> 1.6', '>= 1.6.4'
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
  # Debugging
  gem 'pry-rails', '~> 0.3.4'
  # Combine 'pry' with 'byebug'. Adds 'step', 'next', 'finish', 'continue' and 'break' commands to control execution.
  gem 'pry-byebug', '~> 3.3'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  # Testing framework for JavaScript
  gem 'jasmine', '2.4.0'
end

group :development do
  gem 'capistrano', '~> 3.1.0'
  gem 'capistrano-rails',   '~> 1.1', require: false
  gem 'capistrano-bundler', '~> 1.1', require: false
  gem 'capistrano-rvm',   '~> 0.1', require: false
  gem 'capistrano-ssh-doctor', '~> 1.0'
end

group :test, :gitlabci do
  # Unit test framework
  gem 'rspec-rails', '~> 3.4'
  gem 'factory_girl_rails', '4.2.1'
  gem 'shoulda-matchers', '3.0.1'
end

group :production do
  # Use Unicorn as the production server
  gem 'unicorn'
end

