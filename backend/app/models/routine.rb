require 'securerandom'

class Routine < ApplicationRecord
  before_create :assign_id

  private

  def assign_id
    self.id = SecureRandom.alphanumeric(8)
    while Routine.exists?(id: self.id)
      self.id = SecureRandom.alphanumeric(8)
    end
  end
end
