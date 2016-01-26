class Friendship < ActiveRecord::Base
  
  include AASM
  
  belongs_to :user
  belongs_to :friend, class_name: 'User', foreign_key: :friend_id
  
  scope :accepted, -> { where(aasm_state: 'accepted') }
  scope :pending,  -> { where(aasm_state: 'pending') }
  
  after_destroy :destroy_mutual_friendship!
  
  aasm do 
    state :pending, initial: true
    state :accepted
    state :requested
  
    event :accept do
      transitions to: :accepted, after: :update_mutual_friendship!
    end
  
  end
  
  def self.request(user1, user2)
    transaction do
      create!(user: user1, friend: user2, aasm_state: 'pending')
      create!(user: user2, friend: user1, aasm_state: 'requested')
    end
  end
  
  def mutual_friendship
    self.class.where({user_id: friend_id, friend_id: user_id}).first
  end
  
  def update_mutual_friendship!
    mutual_friendship.update_attribute(:aasm_state, 'accepted') if mutual_friendship
  end
  
  def destroy_mutual_friendship!
    mutual_friendship.delete
  end 
  
end

