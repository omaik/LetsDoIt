class Task < ActiveRecord::Base
  has_and_belongs_to_many :users
  validates :name, length: { maximum: 30 }, presence: true
  validates :description, length: { maximum: 500 }
  validates :status, numericality: { integer: true }, length: { maximum: 1 }
  validates :priority, numericality: { integer: true }, length: { maximum: 1 }
end
