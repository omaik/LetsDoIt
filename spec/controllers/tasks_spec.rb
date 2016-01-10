require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  include Devise::TestHelpers
  let(:task) { FactoryGirl.create(:task) }
  let(:user) { FactoryGirl.create(:user) }
  before { sign_in user }
  describe 'GET #index' do
    it 'call tasks form database' do
      get :index, format: :json
      expect(response.body).to include
        ({ id: task.id, name: task.name, description: task.description, due_date: task.due_date,
        status: task.status, priority: task.priority, category_id: nil, group_id: 13, user_id: task.user_id }.to_json)
    end
  end

  describe 'GET #show' do
    it 'calls task form database' do
      get :show, id: task.id, format: :json
      expect(response.body).to include
        ({ id: task.id, name: task.name, description: task.description, due_date: task.due_date,
        status: task.status, priority: task.priority, category_id: nil, group_id: 13, user_id: task.user_id }.to_json)
    end
  end

  describe 'POST #create' do
    it 'creates task' do
      post :create, task: {name: 'My task', priority: '1', status: '2'}, format: :json
      expect(Task.all).to include task
    end
  end

  describe 'PUT #update' do
    let(:task_update) do
      put :update, id: task.id,
        task: { description: 'New task description' }, format: :json
    end

    it 'should update passed parameters of the given task' do
      task_update
      expect(task.reload.description).to eq ('New task description')
    end
  end

  describe 'DELETE #destroy' do
    it 'deletes task' do
      delete :destroy, id: task.id, format: :json
      expect(Task.all).not_to include task
    end
  end
end
