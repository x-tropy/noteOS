class AddIndexToAuthorIdInDrawboards < ActiveRecord::Migration[7.2]
  def change
    add_index :sketches, :author_id
  end
end
