class ForgetMailer < ApplicationMailer
  default template_path: 'users/mailer'
  default from: ENV['GMAIL_USERNAME']

  def reset_password_instructions(password, user)
    @password = password
    @user = user
    mail(to: @user.email, subject: I18n.t('reset_password_LetsDoIt'))
  end
end
