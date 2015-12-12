class Group < ActiveRecord::Base
  belongs_to :user
  validates :name, length: { maximum: 30 }, presence: true
  validates :description, length: { maximum: 500 }
end
