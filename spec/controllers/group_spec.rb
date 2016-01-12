require 'rails_helper'

RSpec.describe GroupsController, type: :controller do
  include Devise::TestHelpers
  let(:group) { user.groups.create(FactoryGirl.attributes_for(:group)) }
  let(:group2) { user2.groups.create(FactoryGirl.attributes_for(:group)) }
  let(:user) { FactoryGirl.create(:user) }
  let(:user2) { FactoryGirl.create(:user) }
  before { sign_in user }
  
  describe 'GET #index' do
    it 'call groups form database' do
      Group.all.to_json
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST #create' do
    it 'creates group' do
      post :create, group: {name: 'My group', description: 'My group is for group', user_id: user.id}, format: :json
      expect(Group.all).to include group
    end
  end

  describe 'Delete #destroy' do
    it 'deletes group' do
      delete :destroy, id: group.id, format: :json
      expect(Group.all).not_to include group
    end
  end

  describe 'User should see only his own groups' do
    before { sign_in user2 }

    it 'should not get other user group' do
      get :index, format: :json
      expect(response.body).not_to include
        ({ id: group.id, name: group.name, description: group.description }.to_json)
    end

    it 'should get user2 group' do
      get :index, format: :json
      expect(response.body).to include
        ({ id: group2.id, name: group2.name, description: group2.description }.to_json)
    end
  end

end
