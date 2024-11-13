class Sketch < ApplicationRecord
  validates :title, presence: { message: "can't be blank!" }

  extend FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :author, class_name: 'User', foreign_key: 'author_id'
  has_many :comments, dependent: :destroy

  has_many :taggings, as: :taggable, dependent: :destroy
  has_many :tags, through: :taggings

  def should_generate_new_friendly_id?
    title_changed? || super
  end
end
