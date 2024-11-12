class CreateItems < ActiveRecord::Migration[7.2]
  def change
    create_table :attachments do |t|
      t.string :name

      t.timestamps
    end
  end
end
