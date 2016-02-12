require 'rails_helper'

describe Group do

  let(:group) { FactoryGirl.create(:group) }

  subject { group }

  it { should respond_to(:name) }
  it { should respond_to(:description) }
  it { should have_and_belong_to_many(:users)}
  it { should be_valid }

  describe 'when name is not present' do
    before { group.name = ' ' }
    it { should_not be_valid }
  end

  describe 'when name is too long' do
    before { group.name = 'a' * 31 }
    it { should_not be_valid }
  end

  describe 'when decription is too long' do
    before { group.description = 'a' * 501 }
    it { should_not be_valid }
  end

end
