class ForgetMailer < ApplicationMailer
  default template_path: 'users/mailer'
  default from: ENV['GMAIL_USERNAME']

  def reset_password_instructions(password, user)
    I18n.locale = user.language
    @password = password
    @user = user
<<<<<<< HEAD
    mail(to: @user.email, subject: I18n.t('reset_password_LetsDoIt'))
=======
    mail(to: @user.email, subject: "#{I18n.t('reset_password_LetsDoIt')}")
>>>>>>> --no-edit
  end
end
