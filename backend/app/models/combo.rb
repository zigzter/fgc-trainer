class Combo < ApplicationRecord
  belongs_to :routine
  has_many :combo_attempts, dependent: :nullify
  positioned on: :routine
  before_create :assign_id

  validate :validate_inputs

  private

  def assign_id
    self.id = generate_id
    self.id = generate_id while Combo.exists?(id:)
  end

  def validate_inputs
    errors.add(:inputs, 'must be an array of strings') unless inputs.all? { |input| input.is_a?(String) }
  end
end
