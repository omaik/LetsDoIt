class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.datetime :due_date
      t.integer :status
      t.integer :priority
      t.integer :category_id
      t.integer :group_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
