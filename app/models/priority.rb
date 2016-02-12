class Priority < ActiveRecord::Base
  belongs_to :user
  scope :for_user, -> (owner_id) { where('user_id = ? OR user_id IS NULL', owner_id) }
  validates :name, presence: true, length: { maximum: 12}, uniqueness: { scope: :user_id, message: 'is taken by another proirity'}
  validates :value, presence: true, numericality: { greater_than: 0, less_than: 1000, only_integer: true }, uniqueness: { scope: :user_id, message: 'is taken by another proirity'}
  validates :color, length: { is: 7 }
end
