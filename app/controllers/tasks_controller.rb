class TasksController < ApplicationController
  respond_to :json

  def index
    respond_with current_user.tasks
  end

  def show
    respond_with Task.find(params[:id])
  end

  def create
    respond_with current_user.tasks.create(task_params)
  end

  def update
    respond_with Task.find(params[:id]).update_attributes(task_params)
  end

  def destroy
    respond_with Task.destroy(params[:id])
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :due_date, :status, :priority, :category_id, :group_id)
  end

end
