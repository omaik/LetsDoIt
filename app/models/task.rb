class Task < ActiveRecord::Base
  has_and_belongs_to_many :users
  before_save { self.due_date += 3.hours if self.due_date }
  belongs_to :priority
  belongs_to :group
  validates :name, length: { maximum: 30 }, presence: true
  validates :description, length: { maximum: 500 }
  validates :status, numericality: { integer: true, less_than: 3 }
end
