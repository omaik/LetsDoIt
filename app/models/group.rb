class Group < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :tasks
  validates :name, length: { maximum: 30 }, presence: true
  validates :description, length: { maximum: 500 }
end
