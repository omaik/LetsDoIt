class Users::ConfirmationsController < Devise::ConfirmationsController
  skip_before_action :authenticate!
  respond_to :json
  def create
    user = User.find_by(email: params[:email])
    if user
      I18n.locale = user.language
      user.send_confirmation_instructions
    end
    respond_with({email: user.email}, location: '/#/confirmation')
  end

  def show
    user = User.find_by(confirmation_token: params[:confirmation_token])
    if user.persisted?
      user.confirm!
      sign_in user
      redirect_to '/#/home'
    else
      redirect_to root_path
    end
  end
end
