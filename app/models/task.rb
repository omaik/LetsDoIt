class Task < ActiveRecord::Base
  validates :name, length: { maximum: 30 }, presence: true
  validates :description, length: { maximum: 500 }
  validates :status, numericality: { integer: true }, length: { maximum: 1 }
  validates :priority, numericality: { integer: true }, length: { maximum: 1 }
  validates :group_id, numericality: { integer: true }, length: { minimum: 1 }
  validates :user_id, numericality: { integer: true }, length: { minimum: 1 }
end
