class AddAuthorIdToDrawboards < ActiveRecord::Migration[7.2]
  def change
    add_column :drawboards, :author_id, :integer
  end
end
