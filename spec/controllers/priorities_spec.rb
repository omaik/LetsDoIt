require 'rails_helper'

RSpec.describe PrioritiesController, type: :controller do
  include Devise::TestHelpers
  let(:priority) { user.priorities.create(FactoryGirl.attributes_for(:priority)) }
  let(:user) { FactoryGirl.create(:user) }
  let(:priority2) { user.priorities.create(FactoryGirl.attributes_for(:priority)) }
  let(:user2) { FactoryGirl.create(:user) }
  before do
    user.confirm!
    sign_in user
  end

  describe 'Get #index' do
    it 'invoke priorities from DB' do
      get :index, format: :json
      expect(response.body).to include
        ({id: priority.id, name: priority.name, value: priority.value, user_id: priority.user_id, color: priority.color}.to_json)
    end
    it 'respond with status 200' do
      get :index, format: :json
      expect(response).to have_http_status(200)
    end
    it 'Could see his priorities' do
      get :index, format: :json
      expect(response.body).to include
        ({ id: priority.id, user_id: priority.user_id, name: priority.name, value: priority.value, color: priority.color}.to_json)
    end
    it 'Could not see another user priorities' do
      expect(response.body).not_to include
        ({ id: priority2.id, user_id: priority2.user_id, name: priority2.name, value: priority2.value, color: priority2.color}.to_json)
    end
  end

  describe 'Get #show' do
    it 'respond with status 200' do
      get :show, id: priority.id, format: :json
      expect(response).to have_http_status(200)
    end
    it 'respond with choosen priority' do
      get :show, id: priority.id, format: :json
      expect(response.body).to include
      ({ id: priority.id, user_id: priority.user_id, name: priority.name, value: priority.value, color: priority.color}.to_json)
    end
  end

  describe 'Post #create' do
    it 'respond with status 201' do
      post :create, priority: {name:'Taskn', user_id: 1, value: 200, color:'#ff0000'}, format: :json
      expect(response).to have_http_status(201)
    end
    it 'should include priority' do
      post :create, priority: {name:'Taskn', user_id: 1, value: 200, color:'#ff0000'}, format: :json
      expect(Priority.all).to include(priority)
    end
  end

  describe 'Delete #destroy' do
    it 'respond with status' do
      delete :destroy, id: priority.id, format: :json
      expect(response).to have_http_status(204)
    end
    it 'can destroy it own priorities' do
      delete :destroy, id: priority.id, format: :json
      expect(Priority.all).not_to include(priority)
    end
    it 'cannot destroy other users priorities' do
      delete :destroy, id: priority2.id, format: :json
      expect(Priority.all).to include(priority)
    end
  end

  describe 'Put #update' do
    let(:priority_update) do
      put :update, id: priority.id,
        priority: { value: 500 }, format: :json
    end
    it 'should respond with status 204'do
      priority_update
      expect(response).to have_http_status(204)
    end
    it 'should respond with updated priority'do
      priority_update
      expect(priority.reload.value).to eq(500)
    end
  end


end
