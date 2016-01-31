class UsersController < ApplicationController
  respond_to :json

  def index
    indexes = current_user.friendships.pluck(:friend_id) << current_user.id
    search_result = User.where(["id NOT IN (?) AND (first_name LIKE ? or last_name LIKE ?)", indexes, "%#{params[:search]}%", "%#{params[:search]}%"])
    respond_with search_result
  end

  def show
    respond_with current_user
  end

  def edit
    respond_with current_user
  end

  def update
    check = ''
    user = User.find(params[:id])
    if check != current_user.avatar.url
      current_user.update_attributes(social_avatar: current_user.avatar.url)
    end
    user.update_attributes(user_params)
    respond_with current_user
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :sex, :day, :month, :year,
      :country, :city, :email, :avatar, :avatar_file_name, :avatar_content_type, :avatar_file_size, :avatar_updated_at, :language )
  end
end

