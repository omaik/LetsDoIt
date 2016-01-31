require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  include Devise::TestHelpers
  let(:user) { FactoryGirl.create(:user) }
  let(:user2) { FactoryGirl.create(:user) }
  before do
    sign_in user
    user.confirm!
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  describe 'GET #index' do
    it 'calls user from database' do
      get :index, id: user.id, format: :json
      expect(response.body).to include
        ({ id: user.id, first_name: user.first_name, last_name: user.last_name, sex: user.sex, day: user.day, month: user.month, year: user.year, country: user.country, city: user.city, password: user.password, password_confirmation: user.password_confirmation }.to_json)
    end
  end

  describe 'GET #show' do
    it 'calls user from database' do
      get :show, id: user.id, format: :json
      expect(response.body).to include
        ({ id: user.id, first_name: user.first_name, last_name: user.last_name, sex: user.sex, day: user.day, month: user.month, year: user.year, country: user.country, city: user.city, password: user.password, password_confirmation: user.password_confirmation }.to_json)
    end
  end

  describe 'GET #edit' do
    it 'can edit the user' do
      get :edit, id: user.id, format: :json
      expect(response.body).to include
        ({ id: user.id, first_name: user.first_name, last_name: user.last_name, sex: user.sex, day: user.day, month: user.month, year: user.year, country: user.country, city: user.city, password: user.password, password_confirmation: user.password_confirmation }.to_json)
    end
  end

  describe 'PUT #update' do
    let(:user_update) do
      put :update, id: user.id,
        user: { last_name: 'Stakh', day: 5, city:'Kiev', avatar_file_name:'original_harry-potter-Favim.com-2262918.jpg' }, format: :json
    end
    it 'should update the last_name of the given user' do
      user_update
      expect(user.reload.last_name).to eq ('Stakh')
    end
    it 'should update the day of the given user' do
      user_update
      expect(user.reload.day).to eq (5)
    end
    it 'should update the city of the given user' do
      user_update
      expect(user.reload.city).to eq ('Kiev')
    end
    it 'should update the avatar_file_name of the given user' do
      user_update
      expect(user.reload.avatar_file_name).to eq ('original_harry-potter-Favim.com-2262918.jpg')
    end
  end

  describe 'User should see only his own profile' do
    before { sign_in user2 }

    it 'should not get other user profile' do
      get :index, format: :json
      expect(response.body).not_to include
        ({ id: user.id, first_name: user.first_name, last_name: user.last_name, sex: user.sex, day: user.day, month: user.month, year: user.year, country: user.country, city: user.city, password: user.password, password_confirmation: user.password_confirmation }.to_json)
    end
    it 'should get user2 profile' do
      get :index, format: :json
      expect(response.body).to include
        ({ id: user2.id, first_name: user2.first_name, last_name: user2.last_name, sex: user2.sex, day: user2.day, month: user2.month, year: user2.year, country: user2.country, city: user2.city, password: user2.password, password_confirmation: user2.password_confirmation }.to_json)
    end
  end

end
