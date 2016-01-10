class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])
      #sign_in_and_redirect @user
      # sign_in @user
      # head :created
      if @user.persisted?
        sign_in @user
        redirect_to '/#/home'
      else
        redirect_to root_path
      end
  end
end
