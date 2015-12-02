require 'rails_helper'

describe User do

  before do
    @user = User.new(username: "Example User", email: "user@example.com", password:"qwerty123", password_confirmation:"qwerty123")
  end

  subject { @user }

  it { should respond_to(:username) }
  it { should respond_to(:email) }

  it { should be_valid }

  describe "when name is not present" do
    before { @user.username = " " }
    it { should_not be_valid }
  end

  describe "when name is too long" do
    before { @user.username = "a" * 51 }
    it { should_not be_valid }
  end

  describe "when username is already taken" do
    before do
      user_with_same_username = @user.dup
      user_with_same_username.save
    end
    it { should_not be_valid }
  end
end
