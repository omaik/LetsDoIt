RSpec.describe Users::ConfirmationsController, type: :controller do
  include Devise::TestHelpers

  before(:each) { request.env['devise.mapping'] = Devise.mappings[:user] }

  let(:user) { FactoryGirl.create(:user) }

  describe 'POST #create' do
    it 'Send confirmation instructions to user' do
      post :create, email: user.email, format: :json
      expect(User.find_by(email: user[:email]).confirmation_sent_at).not_to eq(nil)
    end
    it 'Dont send instructions if email wrong' do
      post :create, email: "kjfgfgfl@fkjjkgf.kjjk", format: :json
      expect(response).to have_http_status(404)
    end
  end

  describe 'Get #show' do
    it 'Confirm user if token correct' do
      get :show, confirmation_token: user.confirmation_token, format: :json
      expect(User.last.confirmed?).to eq(true)
    end
    it 'Dont confirm user if token incorrect' do
      get :show, confirmation_token: user.confirmation_token << 'jkfjkg', format: :json
      expect(User.last.confirmed?).to eq(false)
    end
  end
end
