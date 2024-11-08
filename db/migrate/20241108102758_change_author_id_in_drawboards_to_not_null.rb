class ChangeAuthorIdInDrawboardsToNotNull < ActiveRecord::Migration[7.2]
  def change
    change_column_null :drawboards, :author_id, false
  end
end
