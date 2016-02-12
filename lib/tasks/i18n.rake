namespace :i18n do
  desc 'convert json to yml'
  task :convert do
    path = 'config/locales/'
    ['en', 'ua'].each do |file|
      translation_yml = File.open(path + "#{file}.yml", 'r') { |f| f.read }
      translation_json = JSON.dump(YAML::load(translation_yml).values.first)
      File.open(path + "#{file}.json", 'w') { |f| f.write(translation_json) }
    end
  end
end
