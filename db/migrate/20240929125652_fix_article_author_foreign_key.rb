class FixArticleAuthorForeignKey < ActiveRecord::Migration[7.2]
  def change
    remove_foreign_key :articles, :authors
    add_foreign_key :articles, :users, column: :author_id
  end
end
