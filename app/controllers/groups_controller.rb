class GroupsController < ApplicationController
  respond_to :json

  def index
    respond_with Group.all
  end

  def show
    respond_with Group.find(params[:id])
  end

  def create
    respond_with Group.create(group_params)
  end

  def update
    respond_with Group.find(params[:id]).update_attributes(group_params)
  end

  def destroy
    respond_with Group.destroy(params[:id])
  end

  private

  def group_params
    params.require(:group).permit(:name, :description, :user_id)
  end

end
