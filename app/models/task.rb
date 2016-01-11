class Task < ActiveRecord::Base
  has_and_belongs_to_many :users
  belongs_to :priority
  validates :name, length: { maximum: 30 }, presence: true
  validates :description, length: { maximum: 500 }
  validates :status, numericality: { integer: true, less_than: 3 }
end
