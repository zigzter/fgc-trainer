class RoutineSession < ApplicationRecord
  belongs_to :routine
  before_create :assign_id

  def assign_id
    self.id = generate_id
    self.id = generate_id while Combo.exists?(id:)
  end
end
