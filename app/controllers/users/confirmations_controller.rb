class Users::ConfirmationsController < Devise::ConfirmationsController
  skip_before_action :authenticate!

  def create
    user = User.find_by(email: params[:email])
    if user
      I18n.locale = user.language
      user.send_confirmation_instructions
      head :ok
    else
      head :not_found
    end
  end

  def show
    user = User.find_by(confirmation_token: params[:confirmation_token])
    if user
      user.confirm
      sign_in user
      redirect_to '/#/home'
    else
      redirect_to root_path
    end
  end
end
