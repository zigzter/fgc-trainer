class RoutineSession < ApplicationRecord
  belongs_to :routine
  before_create :assign_id, :set_started_at
  validate :limit_active_sessions

  private

  def limit_active_sessions
    return unless RoutineSession.exists?(user_id:, completed: false)

    errors.add(:base, 'Only one active session can exist at once')
  end

  def set_started_at
    self.started_at = Time.now
  end

  def assign_id
    self.id = generate_id
    self.id = generate_id while Combo.exists?(id:)
  end
end
