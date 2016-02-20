class Users::PasswordsController < Devise::PasswordsController
  respond_to :json
  skip_before_action :authenticate!

  def create
    user = User.find_by(email: params[:email])
    if user
      user.send_pass
      head :ok
    else
      head :not_found
    end
  end
end
