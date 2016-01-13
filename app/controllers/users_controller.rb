class UsersController < ApplicationController
  respond_to :json
  def show
    respond_with @user = User.find(params[:id])
  end

  def edit
    respond_with current_user
  end

  def update
    @user = User.find(params[:id])
    @user.update_attributes(user_params)
    current_user.update_attributes(social_avatar: current_user.avatar.url)
    render json: current_user
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :sex, :day, :month, :year,
      :country, :city, :email, :avatar, :avatar_file_name, :avatar_content_type, :avatar_file_size, :avatar_updated_at )
  end

end
