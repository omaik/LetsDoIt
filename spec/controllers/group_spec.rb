require 'rails_helper'

RSpec.describe GroupsController, type: :controller do

  let(:group) { FactoryGirl.create(:group) }

  describe 'GET #index' do
    it 'call groups form database' do
      Group.all.to_json
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST #create' do
    it 'creates group' do
      post :create, group: {name: 'My group', description: 'My group is for group'}, format: :json
      expect(Group.all).to include group
    end
  end

  describe 'Delete #destroy' do
    it 'deletes group' do
      delete :destroy, id: group.id, format: :json
      expect(Group.all).not_to include group
    end
  end
end
