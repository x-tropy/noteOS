class Tag < ApplicationRecord
  belongs_to :user
  validates :name, presence: true, uniqueness: { scope: :user_id } # Unique per user

  has_many :taggings, dependent: :destroy
  has_many :articles, through: :taggings, source: :taggable, source_type: 'Article'
  has_many :sketches, through: :taggings, source: :taggable, source_type: 'Sketch'
  has_many :attachments, through: :taggings, source: :taggable, source_type: 'Attachment'
end
