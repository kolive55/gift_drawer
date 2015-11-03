class User < ActiveRecord::Base
  has_a :match
  validates :name, presences: true
end
