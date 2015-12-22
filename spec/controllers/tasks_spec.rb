require 'rails_helper'

RSpec.describe TasksController, type: :controller do

  let(:task) { FactoryGirl.create(:task) }

  describe 'GET #index' do
    it 'call tasks form database' do
      Task.all.to_json
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST #create' do
    it 'creates task' do
      post :create, task: {name: 'My task', priority: '1', status: '2'}, format: :json
      expect(Task.all).to include task
    end
  end

  describe 'Delete #destroy' do
    it 'deletes task' do
      delete :destroy, id: task.id, format: :json
      expect(Task.all).not_to include task
    end
  end
end
