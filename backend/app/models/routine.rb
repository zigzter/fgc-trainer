class Routine < ApplicationRecord
  has_many :combos, dependent: :destroy
  has_many :routine_sessions, dependent: :nullify
  before_create :assign_id

  validates :game, presence: true, length: { minimum: 3 }
  validates :title, presence: true, length: { minimum: 1 }

  private

  def assign_id
    self.id = generate_id
    self.id = generate_id while Routine.exists?(id:)
  end
end
