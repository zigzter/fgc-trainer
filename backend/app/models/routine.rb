require 'securerandom'

class Routine < ApplicationRecord
  has_many :combos, dependent: :destroy
  before_create :assign_id

  validates :game, presence: true, length: { minimum: 3 }
  validates :title, presence: true, length: { minimum: 1 }

  private

  def assign_id
    self.id = SecureRandom.alphanumeric(8)
    self.id = SecureRandom.alphanumeric(8) while Routine.exists?(id:)
  end
end
