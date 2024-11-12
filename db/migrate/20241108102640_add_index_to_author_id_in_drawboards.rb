class AddIndexToAuthorIdInDrawboards < ActiveRecord::Migration[7.2]
  def change
    add_index :drawboards, :author_id
  end
end
