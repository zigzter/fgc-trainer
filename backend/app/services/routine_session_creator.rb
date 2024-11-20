class RoutineSessionCreator
  def initialize(user:, routine:)
    @user = user
    @routine = routine
  end

  def call
    ActiveRecord::Base.transaction do
      routine_session = RoutineSession.create!(routine_id: @routine[:id], user_id: @user[:id])

      combo_attempts = @routine.combos.map do |combo|
        ComboAttempt.new(
          id: generate_id,
          routine_session_id: routine_session.id,
          combo_id: combo.id,
          reps_correct: 0,
          reps_done: combo[:reps]
        )
      end

      ComboAttempt.import!(combo_attempts)

      routine_session
    rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved => e
      Rails.logger.error "RoutineSession creation failed: #{e.message}"
      raise ActiveRecord::Rollback
    end
  end

  private

  def generate_id
    loop do
      id = SecureRandom.alphanumeric(8)
      break id unless ComboAttempt.exists?(id:)
    end
  end
end
