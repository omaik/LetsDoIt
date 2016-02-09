class Category < ActiveRecord::Base
	has_and_belongs_to_many :users
  has_many :tasks
	validates :name, length: { maximum: 100 }, presence: true
end
