class Article < ApplicationRecord
  validates :title, presence: { message: "can't be blank!" }

  extend FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :author, class_name: 'User'
  has_many :comments, dependent: :destroy

  def should_generate_new_friendly_id?
    title_changed? || super
  end
end
