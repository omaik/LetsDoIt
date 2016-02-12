require 'rails_helper'

describe Category do

  let(:category) { FactoryGirl.create(:category) }

  subject { category }

  it { should respond_to(:name) }
  it { should have_and_belong_to_many(:users)}
  it { should be_valid }


  describe 'when name is not present' do
    before { category.name = ' ' }
    it { should_not be_valid }
  end

  describe 'when name is too longer' do
    before { category.name = 'a' * 101 }
    it { should_not be_valid }
  end
  
end