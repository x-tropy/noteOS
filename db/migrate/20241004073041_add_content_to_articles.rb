class AddContentToArticles < ActiveRecord::Migration[7.2]
  def change
    add_column :articles, :content, :text
  end
end
