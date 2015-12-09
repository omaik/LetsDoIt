class TasksController < ApplicationController

  respond_to :json, :html

  def index
    respond_with Task.all
  end

  def create
    respond_with Task.create(task_params)
  end

  def update
    respond_with Task.find(params[:id])
  end

  def destroy
    respond_with Task.destroy(params[:id])
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :status, :priority, :category_id, :group_id, :user_id)
  end

end
