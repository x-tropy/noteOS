class CreateSketches < ActiveRecord::Migration[7.2]
  def change
    unless table_exists?(:sketches)
      create_table :sketches do |t|
        t.string :title
        t.text :content
        t.string :slug
        t.integer :author_id, null: false
        t.timestamps
      end

      add_index :sketches, :author_id
    end
  end
end
