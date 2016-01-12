require 'rails_helper'

describe Task do

  let(:task) { FactoryGirl.create(:task) }

  subject { task }

  it { should respond_to(:name) }
  it { should respond_to(:description) }
  it { should respond_to(:status) }
  it { should have_and_belong_to_many(:users)}
  it { should belong_to(:priority)}
  it { should belong_to(:group)}
  it { should be_valid }

  describe 'when name is not present' do
    before { task.name = ' ' }
    it { should_not be_valid }
  end

  describe 'when name is too longe' do
    before { task.name = 'a' * 31 }
    it { should_not be_valid }
  end

  describe 'when decription is too longe' do
    before { task.description = 'a' * 501 }
    it { should_not be_valid }
  end

  describe 'when status is too longe' do
    before { task.status = 17 }
    it { should_not be_valid }
  end
end
