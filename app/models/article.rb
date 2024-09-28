class Article < ApplicationRecord
  extend FriendlyId
  belongs_to :author, class_name: 'User'
  has_rich_text :content
  has_paper_trail
  has_many :comments
  friendly_id :title, use: :slugged
end
