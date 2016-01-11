class CreatePriorities < ActiveRecord::Migration
  def change
    create_table :priorities do |t|
      t.belongs_to :user, index: true
      t.string :name
      t.integer :value
      t.string :color
      t.timestamps null: false
    end
  end
end
