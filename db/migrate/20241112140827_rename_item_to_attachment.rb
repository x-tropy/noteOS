class RenameItemToAttachment < ActiveRecord::Migration[7.2]
  def change
    rename_table :items, :attachments
  end
end
