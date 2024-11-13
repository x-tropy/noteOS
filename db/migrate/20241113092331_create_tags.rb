class CreateTags < ActiveRecord::Migration[7.2]
  def change
    create_table :tags do |t|
      t.string :name, null: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
    add_index :tags, [:name, :user_id], unique: true
  end
end
