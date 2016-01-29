class FriendshipsController < ApplicationController
  include ActionController::Live
  respond_to :json
  before_action :authenticate_user!
    
  def index
    respond_with ({friends: current_user.friends, pending: current_user.pending_friends, requested: current_user.requested_friends})
  end
  
  def event
    response.headers['Content-Type'] = 'text/event-stream'
    sse = SSE.new(response.stream, retry: 1000)
    sse.write({friends: current_user.friends, pending: current_user.pending_friends, requested: current_user.requested_friends})
  ensure
    sse.close
  end
  
  # Friendship request action
  def create
    if params[:friend_id]
      friend = User.find_by(id: params[:friend_id])
      Friendship.request(current_user, friend)
      respond_with friend
    end
  end

  # Accept friendship request action
  def accept
    friend = User.find_by(id: params[:id])
    user_friendship = current_user.friendships.where(friend_id: friend.id).first
    user_friendship.accept!
    respond_with  user_friendship
  end
  
  def destroy
    active_friendsdhip = current_user.friendships.where(friend_id: params[:id]).first
    respond_with active_friendsdhip.destroy 
  end
end

