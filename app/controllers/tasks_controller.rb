class TasksController < ApplicationController
  respond_to :json

  def index
    respond_with current_user.tasks
  end

  def show
    respond_with current_user.tasks.find(params[:id])
  end

  def create
    respond_with current_user.tasks.create(task_params)
  end

  def update
    respond_with current_user.tasks.find(params[:id]).update_attributes(task_params)
  end

  def destroy
    respond_with current_user.tasks.find_by(id: params[:id]).destroy
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :due_date, :status, :priority_id, :category_id, :group_id)
  end

end
