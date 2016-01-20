class Users::ConfirmationsController < Devise::ConfirmationsController

  def show
    @user = User.find_by(confirmation_token: params[:confirmation_token])
    if @user.persisted?
      @user.confirm!
      sign_in @user
      redirect_to '/#/home'
    else
      redirect_to root_path
    end
  end
end
