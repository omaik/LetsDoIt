require 'rails_helper'

RSpec.describe CategoriesController, type: :controller do

  include Devise::TestHelpers
  let(:category) { user.categories.create(FactoryGirl.attributes_for(:category)) }
  let(:category2) { user2.categories.create(FactoryGirl.attributes_for(:category2)) }
  let(:user) { FactoryGirl.create(:user) }
  let(:user2) { FactoryGirl.create(:user) }
  before do
    user.confirm!
    sign_in user
  end

  describe 'GET #index' do
    it 'call categories form database' do
      get :index, format: :json
      expect(response.body).to include
        ({ id: category.id, name: category.name}.to_json)
    end
  end

  describe 'GET #show' do
    it 'calls category form database' do
      get :show, id: category.id, format: :json
      expect(response.body).to include
        ({ id: category.id, name: category.name}.to_json)
    end
  end

  describe 'POST #create' do
    it 'creates category' do
      post :create, category: {name: 'My category'}, format: :json
      expect(Category.all).to include category
    end
  end

  describe 'DELETE #destroy' do
    it 'deletes category' do
      delete :destroy, id: category.id, format: :json
      expect(Category.all).not_to include category
    end
  end

  describe 'User should see only his own category' do
    before { sign_in user2 }

    it 'should not get other user category' do
      get :index, format: :json
      expect(response.body).to include
        ({ id: category.id, name: category.name}.to_json)
    end

    it 'should get user2 category' do
      get :index, format: :json
      expect(response.body).to include
        ({ id: category.id, name: category.name}.to_json)
    end
  end
end

