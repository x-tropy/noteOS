class UpdateActiveStorageAttachmentsForAttachmentModel < ActiveRecord::Migration[7.2]
  def up
    # Update references to 'Item' to 'Attachment'
    ActiveStorage::Attachment.where(record_type: 'Item').find_each do |attachment|
      attachment.update(record_type: 'Attachment')
    end
  end

  def down
    # Rollback changes, in case you need to undo the migration
    ActiveStorage::Attachment.where(record_type: 'Attachment').find_each do |attachment|
      attachment.update(record_type: 'Item')
    end
  end
end
