class Attachment < ApplicationRecord
  has_one_attached :contents
end
