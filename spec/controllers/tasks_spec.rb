require 'rails_helper'

RSpec.describe TasksController, type: :controller do

    let(:task) { Task.create(id: 11, name: 'Task', description: 'My task', status: 2, priority: 1, group_id: 3, user_id: 5) }

  describe 'GET #index' do
    it 'respondes' do
      get :index
      expect(response).to have_http_status(200)
    end

    it 'renders the index template' do
      get :index
      expect(response).to render_template('index')
    end

    it 'call tasks form database' do
      Task.all.to_json
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST #create' do
    it 'creates task' do
      post :create, task: {name: 'My task', priority: '1', status: '2'}, format: :json
      expect(response).to have_http_status(201)
    end
  end

  describe 'Delete #destroy' do
    it 'deletes task' do
      delete :destroy, id: task.id, format: :json
      expect(Task.all).not_to include task
    end
  end
end
