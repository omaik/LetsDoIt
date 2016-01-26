# Uncomment if you want to use whenever in development environment
# set :environment, 'development'

directory = ENV["PWD"]

every 1.day, at: '7:00 am'  do
  command " cd #{directory} && source .env && RAILS_ENV=#{environment} bundle exec rake reminder:send"
end
