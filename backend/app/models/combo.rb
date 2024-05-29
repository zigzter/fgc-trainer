class Combo < ApplicationRecord
  positioned
  belongs_to :routine
  positioned on: :routine
  before_create :assign_id

  validate :validate_inputs

  private

  def assign_id
    self.id = SecureRandom.alphanumeric(8)
    self.id = SecureRandom.alphanumeric(8) while Combo.exists?(id:)
  end

  def validate_inputs
    errors.add(:inputs, 'must be an array of strings') unless inputs.all? { |input| input.is_a?(String) }
  end
end
