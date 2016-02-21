class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  def create
    I18n.locale = sign_up_params[:language]
    super
  end

  private

  def sign_up_params
    params.require(:user).permit(:username,
                                 :first_name,
                                 :last_name,
                                 :email,
                                 :password,
                                 :password_confirmation,
                                 :avatar,
                                 :language)
  end
end
