require 'rails_helper'

RSpec.describe Users::SessionsController, type: :controller do

  include Devise::TestHelpers
  include Warden::Test::Helpers
  let(:user) { FactoryGirl.create(:user) }
  before do
    user.confirm!
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  describe 'GET /' do
    it 'should not have a current_user' do
      expect(subject.current_user).not_to eq(true)
    end
  end

  describe 'POST #new with email' do
    it 'creates new current_user with email' do
      post :new, user: {login: user.email, password: user.password}, format: :json
      expect(response.code).to eq('201')
    end
  end

  describe 'POST #new with username' do
    it 'creates new current_user with username' do
      post :new, user: {login: user.username, password: user.password}, format: :json
      expect(response.code).to eq('201')
    end
  end

  describe 'POST #create with email' do
    it 'creates new session' do
      post :create, user: {login: user.email, password: user.password}, format: :json
      expect(subject.session).not_to eq(nil)
    end
    it 'creates new current_user' do
      post :create, user: {login: user.email, password: user.password}, format: :json
      expect(subject.signed_in?).not_to eq(false)
    end
  end

  describe 'POST #create with username' do
    it 'creates new session' do
      post :create, user: {login: user.username, password: user.password}, format: :json
      expect(subject.session).not_to eq(nil)
    end
    it 'creates new current_user' do
      post :create, user: {login: user.username, password: user.password}, format: :json
      expect(subject.signed_in?).to eq(true)
    end
  end

  describe 'GET /home' do
    it 'creates new current_user' do
      user = FactoryGirl.create(:user)
      user.confirm!
      sign_in user
      expect(subject.current_user).not_to eq(nil)
    end
  end

  describe 'POST #delete' do
    it 'delete session' do
      post :destroy, format: :json
      expect(response.code).to eq('204')
    end
    it 'delete session' do
      post :destroy, format: :json
      expect(subject.signed_in?).to eq(false)
    end
  end

end
