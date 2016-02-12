class AddProfileToUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.column :sex, :string, limit: 60
      t.column :day, :integer, limit: 2
      t.column :month, :integer, limit: 2
      t.column :year, :integer, limit: 4
      t.column :country, :string, limit: 60
      t.column :city, :string, limit: 60
    end
  end
end
