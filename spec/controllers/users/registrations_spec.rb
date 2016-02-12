RSpec.describe Users::RegistrationsController, type: :controller do

  before(:each) { request.env['devise.mapping'] = Devise.mappings[:user] }

  let(:user) { FactoryGirl.attributes_for(:user) }
  let(:created_user) { FactoryGirl.create(:user) }

  describe 'POST #create' do
    it 'Registrate new user' do
      post :create, user: user, format: :json
      expect(User.exists?(email: user[:email])).to eq(true)
    end
    it 'Do not registrate new user, when username is already taken' do
      user[:username] = created_user.username
      post :create, user: user, format: :json
      expect(User.exists?(email: user[:email])).to eq(false)
    end
  end
end
