class Article < ApplicationRecord
  belongs_to :author, class_name: 'User'
  has_rich_text :content
  has_paper_trail
  has_many :comments
end
