class User < ActiveRecord::Base
  has_one :match
  validates :name, presence: true
end
