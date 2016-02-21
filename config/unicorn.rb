working_directory File.expand_path("../..", __FILE__)
worker_processes 5
listen '/tmp/unicorn.sock'
timeout 30
pid "/tmp/unicorn_letsdoit.pid"
stdout_path '/www/dev-2/LetsDoIt/log/unicorn.log'
stderr_path '/www/dev-2/LetsDoIt/log/unicorn.log'