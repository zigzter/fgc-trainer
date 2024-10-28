class ComboAttempt < ApplicationRecord
  belongs_to :routine_session
  belongs_to :combo
  before_create :assign_id

  private

  def assign_id
    self.id = generate_id
    self.id = generate_id while ComboAttempt.exists?(id:)
  end
end
