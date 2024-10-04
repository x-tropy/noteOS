class DropActionTextRichTexts < ActiveRecord::Migration[7.2]
  def change
    drop_table :action_text_rich_texts
  end
end
