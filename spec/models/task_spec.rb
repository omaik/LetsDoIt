require 'rails_helper'

describe Task do
	
	before do
    @task = Task.new(name: "Test", description: "My first task", status: 2, priority: 1, category_id: 12, group_id: 13, user_id: 543)
  end

  subject { @task }

  it { should respond_to(:name) }
  it { should respond_to(:description) }
  it { should respond_to(:status) }
  it { should respond_to(:priority) }
  it { should respond_to(:category_id) }
  it { should respond_to(:group_id) }
  it { should respond_to(:user_id) }

  it { should be_valid }

  describe "when name is not present" do
    before { @task.name = " " }
    it { should_not be_valid }
  end

  describe "when name is too longe" do
    before { @task.name = "a" * 31 }
    it { should_not be_valid }
  end

	
  describe "when decription is too longe" do
    before { @task.description = "a" * 501 }
    it { should_not be_valid }
  end

	
  describe "when status is too longe" do
    before { @task.status = 17 }
    it { should_not be_valid }
  end

	
  describe "when priority is too longe" do
    before { @task.priority = 32 }
    it { should_not be_valid }
  end


  describe "when category_id is too small" do
    before { @task.category_id = "" }
    it { should_not be_valid }
  end


  describe "when group_id is too small" do
    before { @task.group_id = "" }
    it { should_not be_valid }
  end


  describe "when user_id is too small" do
    before { @task.user_id = "" }
    it { should_not be_valid }
  end
end