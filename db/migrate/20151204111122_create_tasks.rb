class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.belongs_to :priority, index: true
      t.string :name
      t.text :description
      t.datetime :due_date
      t.integer :status
      t.integer :category_id
      t.integer :group_id

      t.timestamps null: false
    end
  end
end
