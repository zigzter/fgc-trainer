class RoutineSession < ApplicationRecord
  belongs_to :routine
  before_create :assign_id, :set_started_at

  def set_started_at
    self.started_at = Time.now
  end

  def assign_id
    self.id = generate_id
    self.id = generate_id while Combo.exists?(id:)
  end
end
