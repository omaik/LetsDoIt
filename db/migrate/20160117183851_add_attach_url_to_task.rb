class AddAttachUrlToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :attach_url, :text
  end
end
