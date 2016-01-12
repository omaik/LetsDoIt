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

  def update
    respond_with current_user.groups.find(params[:id]).update_attributes(group_params)
  end

  def destroy
    respond_with current_user.groups.destroy(params[:id])
  end

  private

  def group_params
    params.require(:group).permit(:name, :description)
  end

end
