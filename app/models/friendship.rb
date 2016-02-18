class Friendship < ActiveRecord::Base
  include AASM
  
  belongs_to :user
  belongs_to :friend, class_name: 'User', foreign_key: :friend_id
  
  
  after_destroy :destroy_mutual_friendship!
  
  aasm do 
    state :pending, initial: true
    state :accepted
    state :requested
  
    event :accept do
      transitions to: :accepted, after:  [:update_mutual_friendship!, :send_acceptance_email]
    end
  
  end
  
  def self.request(user1, user2)
    transaction do
      friendship = create!(user: user1, friend: user2, aasm_state: 'pending')
      create!(user: user2, friend: user1, aasm_state: 'requested')
      friendship.send_request_email
    end
  end
  
  def mutual_friendship
    self.class.find_by({user_id: friend_id, friend_id: user_id})
  end
  
  def update_mutual_friendship!
    mutual_friendship.update_attribute(:aasm_state, 'accepted') if mutual_friendship
  end
  
  def destroy_mutual_friendship!
    mutual_friendship.delete
  end 
  
  def send_request_email
    FriendshipMailer.friend_requested(id).deliver_now
  end
  
  def send_acceptance_email
    FriendshipMailer.friend_request_accepted(id).deliver_now
  end
end

