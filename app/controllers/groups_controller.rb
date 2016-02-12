class GroupsController < ApplicationController
  respond_to :json

  def index
    respond_with current_user.groups
  end

  def show
    respond_with current_user.groups.find(params[:id])
  end

  def create
    respond_with current_user.groups.create(group_params)
  end
  
  def add_friend_to_group
    current_user.groups.find_by(id: params[:group_id]).users << current_user.friendships.find_by(friend_id: params[:friend_id]).friend
    User.find_by(id: params[:friend_id]).tasks += current_user.groups.find_by(id: params[:group_id]).tasks
    head  :created
  end
  
  def delete_friend_from_group
    user = User.find_by(id: params[:member])
    current_user.groups.find_by(id: params[:id]).users.delete(user)
    user.tasks -= current_user.groups.find_by(id: params[:id]).tasks
    head  :ok
  end
  
  def members
    users = current_user.groups.find_by(id: params[:id]).users - [current_user]
    respond_with ({data: users})
  end

  def update
    respond_with current_user.groups.find(params[:id]).update_attributes(group_params)
  end

  def destroy
    tasks = Task.where(group_id: params[:id])
    tasks.each do |task| 
      task.group_id = nil
      task.save
    end
    respond_with current_user.groups.find(params[:id]).destroy
  end

  private

  def group_params
    params.require(:group).permit(:name, :description)
  end
  
end
