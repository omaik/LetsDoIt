require 'rails_helper'

describe User do
  let(:user) { FactoryGirl.create(:user) }
  let(:second_user) {FactoryGirl.create(:user)}

  subject { user }


  it { should respond_to(:username) }
  it { should respond_to(:email) }

  it { should be_valid }

  describe "when name is not present" do
    before { user.username = " " }
    it { should_not be_valid }
  end

  describe "when name is too long" do
    before { user.username = "a" * 51 }
    it { should_not be_valid }
  end

  describe "when username is already taken" do
    before do
      user.username = second_user.username
    end
    it { should_not be_valid }
  end
end

