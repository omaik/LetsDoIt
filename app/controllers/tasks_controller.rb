class TasksController < ApplicationController
  respond_to :json

  def index
    respond_with current_user.tasks
  end

  def show
    respond_with current_user.tasks.find(params[:id])
  end

  def create
    task = current_user.tasks.create(task_params)
    response_attr = task.attributes
    response_attr['attach_url'] = task.attachment.url if task.attachment.url != ''
    task.update_attributes(response_attr)
    respond_with task
  end

  def update
    @task = current_user.tasks.find(params[:id])
    @task.update_attributes(task_params)
    @task.update_attributes(attach_url: @task.attachment.url) if @task.attachment.url != ''
    respond_with @task
  end

  def destroy
    respond_with current_user.tasks.find_by(id: params[:id]).destroy
  end

  private

  def task_params

    params.require(:task).permit(:name, :description, :due_date, :status, :priority_id, :category_id, :group_id,
                                 :attachment, :attachment_content_type, :attachment_file_name, :attachment_file_size,
                                 :attachment_updated_at, :attach_url, :remind_me)
  end

end
