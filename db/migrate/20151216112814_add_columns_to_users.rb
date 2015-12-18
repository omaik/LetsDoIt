class AddColumnsToUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.column :first_name, :string, limit: 60
      t.column :last_name, :string, limit: 60
      t.column :provider, :string, limit: 20
      t.column :uid, :string, limit: 60
      t.column :social_avatar, :string, limit: 255
    end
  end
end

