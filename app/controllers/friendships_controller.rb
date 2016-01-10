class FriendshipsController < ApplicationController
  before_action :authenticate_user!
    
  def index
    render json: {relations:{friends: current_user.friends, pending: current_user.pending_friends, requested: current_user.requested_friends}}
  end
  
  # Friendship request action
  def create
      if params[:friend_id]
        @friend = User.find_by(id: params[:friend_id])
        @friendship = Friendship.request(current_user, @friend)
        render json: {status:"ok", message: "Success!"}
      end
  end
  
  # Accept friendship request action
  def accept
    @friend = User.find_by(id: params[:id])
    @user_friendship = current_user.friendships.where(friend_id: @friend.id).first
    if @user_friendship.accept!
      render json: {status:"ok", message: "Success!"}
    end
  end
  
  def destroy
    @active_friendsdhip = current_user.friendships.where(friend_id: params[:id]).first
    @active_friendsdhip.destroy 
    render json: {status:"ok", message: "Success!"}
  end
  
end

