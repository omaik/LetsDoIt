class RemindMailer < ApplicationMailer
  def remind_about_task(user, task)
    I18n.locale = user.language
    @address = {
      development: 'http://localhost:3000/#/home',
      production: 'http://54.175.169.251/#/home'
    }
    @fullname = "#{user.first_name} #{user.last_name}"
    @task = task.name
    mail(to: user.email, subject: "#{I18n.t('notification_about')} #{@task}")
  end
end
