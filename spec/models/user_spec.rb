require 'rails_helper'

describe User do
  let(:user) { FactoryGirl.create(:user) }
  let(:second_user) {FactoryGirl.create(:user)}

  subject { user }


  it { should respond_to(:username) }
  it { should respond_to(:email) }
  it { should respond_to(:first_name) }
  it { should respond_to(:last_name) }
  it { should have_and_belong_to_many(:tasks)}
  it { should have_and_belong_to_many(:groups)}
  it { should have_many(:priorities)}
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

  describe "when country is too long" do
    before { user.country = "a" * 51 }
    it { should_not be_valid }
  end

  describe "when city is too long" do
    before { user.city = "a" * 51 }
    it { should_not be_valid }
  end

  describe "method stat" do
    it "should respond with stat_data" do
      expect(user.stat.keys).to eq([:category, :due_date, :finished, :priority])
    end
  end
end

