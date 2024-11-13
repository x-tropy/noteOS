class Attachment < ApplicationRecord
  has_one_attached :contents

  has_many :taggings, as: :taggable, dependent: :destroy
  has_many :tags, through: :taggings
end
