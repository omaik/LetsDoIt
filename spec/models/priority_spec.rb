require 'rails_helper'

describe Priority do
  let(:priority) { FactoryGirl.create(:priority) }
  let(:second_priority) { FactoryGirl.create(:priority) }

  subject { priority }

  it { should respond_to(:name) }
  it { should respond_to(:value) }
  it { should respond_to(:color) }
  it { should belong_to(:user) }

  describe 'when name is not present' do
    before { priority.name = ' ' }
    it { should_not be_valid }
  end

  describe 'when name is too long' do
    before { priority.name = 'a'*13 }
    it { should_not be_valid }
  end

  describe 'when value is incorrect' do
    before { priority.value = 2.2 }
    it { should_not be_valid }
  end

  describe 'when value is too small' do
    before { priority.value = 0 }
    it { should_not be_valid }
  end

  describe 'when value is too big' do
    before { priority.value = 1000 }
    it { should_not be_valid }
  end

  describe 'when value is not unique' do
    before { priority.value = second_priority.value }
    it {should_not be_valid}
  end

  describe 'when name is not unique' do
    before { priority.name = second_priority.name }
    it {should_not be_valid}
  end

  describe 'when color is not correct(too short)' do
    before { priority.color = '#fffff' }
    it {should_not be_valid}
  end

  describe 'when color is not correct(too long)' do
    before { priority.color = '#fffffff' }
    it {should_not be_valid}
  end
end
