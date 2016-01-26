require 'rails_helper'

RSpec.describe FriendshipsController, type: :controller do
  include Devise::TestHelpers
  let(:user) { FactoryGirl.create(:user) }
  let(:user2) { FactoryGirl.create(:user) }
  let(:request) {
    user.confirm
    user2.confirm
    sign_in user
    post :create, friend_id: user2.id, format: :json
  }
  
  let(:accept_request){
    sign_out user
    sign_in user2
    post :accept, id: user.id, format: :json
  }
  
  before { request }
  
  describe 'POST #create' do
    it 'should send requset for friendship' do
      expect(user.pending_friends).to include user2
    end

    it 'should add person who send request into requested friends' do
      expect(user2.requested_friends).to include user
    end
  end

  describe 'POST #accept' do
    before { accept_request }
  
    it 'should accept friendship request' do
      expect(user2.friends).to include user
    end
    
    it 'should update friend list of user wich requested friendship' do
      expect(user.friends).to include user2
    end
  end
  
  describe 'DELETE #destroy' do
    before do
      accept_request
      delete :destroy, id: user.id, format: :json
    end
    
    it 'should destroy active friendship' do
      expect(user2.friends).not_to include user
    end
    
    it 'should update friend list of former friend after destroy' do
      expect(user.friends).not_to include user2
    end
  end

end
