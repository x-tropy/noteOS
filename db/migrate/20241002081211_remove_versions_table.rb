class RemoveVersionsTable < ActiveRecord::Migration[7.2]
  def change
    drop_table :versions
  end
end
