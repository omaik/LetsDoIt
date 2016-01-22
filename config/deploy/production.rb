set :stage, :production
set :branch, 'develop'
set :rails_env, 'production'
set :linked_files, %w{config/database.yml}

role :app, %w{ubuntu@54.175.169.251}
role :web, %w{ubuntu@54.175.169.251}
role :db,  %w{ubuntu@54.175.169.251}

server '54.175.169.251', user: 'ubuntu', roles: %w{web app}, my_property: :my_value

set :ssh_options, {
  forward_agent: true,
  auth_methods: ['publickey'],
  keys: ["/home/#{ENV['LOGNAME']}/SSU.pem"]
}
