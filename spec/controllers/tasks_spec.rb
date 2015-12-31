require 'rails_helper'

RSpec.describe TasksController, type: :controller do

  include Devise::TestHelpers
  let(:task) { user.tasks.create(FactoryGirl.attributes_for(:task)) }
  let(:task2) { user2.tasks.create(FactoryGirl.attributes_for(:task)) }
  let(:user) { FactoryGirl.create(:user) }
  let(:user2) { FactoryGirl.create(:user) }
  before { sign_in user }

  describe 'GET #index' do
    it 'call tasks form database' do
      get :index, format: :json
      expect(response.body).to include
        ({ id: task.id, name: task.name, description: task.description, due_date: task.due_date,
        status: task.status, category_id: nil, group_id: 13, priority_id: task.priority_id }.to_json)
    end
  end

  describe 'GET #show' do
    it 'calls task form database' do
      get :show, id: task.id, format: :json
      expect(response.body).to include
        ({ id: task.id, name: task.name, description: task.description, due_date: task.due_date,
        status: task.status, category_id: nil, group_id: 13, priority_id: task.priority_id }.to_json)
    end
  end

  describe 'POST #create' do
    it 'creates task' do
      post :create, task: {name: 'My task', priority_id: '1', status: '2'}, format: :json
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

  describe 'User should see only his own tasks' do
    before { sign_in user2 }

    it 'should not get other user task' do
      get :index, format: :json
      expect(response.body).not_to include
        ({ id: task.id, name: task.name, description: task.description, due_date: task.due_date,
        status: task.status, priority: task.priority, category_id: nil, group_id: 13 }.to_json)
    end

    it 'should get user2 task' do
      get :index, format: :json
      expect(response.body).to include
        ({ id: task2.id, name: task2.name, description: task2.description, due_date: task2.due_date,
        status: task2.status, priority: task2.priority, category_id: nil, group_id: 13 }.to_json)
    end
  end
end
