namespace :reminder do
  desc 'remind about task'
  task send: :environment do
    tasks = Task.where("remind_me = ? AND due_date BETWEEN ? AND ?", true, Time.new.midnight, Time.new.midnight + 1.day)
    tasks.each do |task|
      task.users.each do |user|
        RemindMailer.remind_about_task(user, task).deliver_now
      end
    end
  end
end
