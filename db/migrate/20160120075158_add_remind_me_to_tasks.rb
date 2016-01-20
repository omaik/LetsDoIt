class AddRemindMeToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :remind_me, :boolean, default: false
  end
end
