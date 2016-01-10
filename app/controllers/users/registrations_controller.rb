class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private
  def user_params
    params.require(:user).permit(:username, :first_name, :last_name, :email, :password, :password_confirmation)
  end
end

