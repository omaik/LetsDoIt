class PrioritiesController < ApplicationController
  respond_to :json

  def index
    respond_with Priority.for_user(current_user.id)
  end

  def create
    respond_with current_user.priorities.create(priority_params)
  end

  def show
    respond_with Priority.for_user(current_user).find_by(id: params[:id])
  end

  def update
    respond_with current_user.priorities.find_by(id: params[:id]).update_attributes(priority_params)
  end

  def destroy
    respond_with current_user.priorities.find_by(id: params[:id]).destroy
  end

  def priority_params
    params.require(:priority).permit(:name, :value, :color)
  end
end
