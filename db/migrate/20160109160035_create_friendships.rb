class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :user_id
      t.integer :friend_id
      t.string :aasm_state

      t.timestamps null: false
    end
    
    add_index :friendships, [:user_id, :friend_id, :aasm_state]
  end
end

