module Api
  module V1
    class ComboAttemptsController < ApplicationController
      before_action :set_combo_attempt, only: %i[update destroy]

      def index
        @combo_attempts = ComboAttempt.where(routine_session_id: params[:routine_session_id])
        render json: @combo_attempts
      end

      def create
        @combo_attempt = ComboAttempt.new
        if @combo_attempt.save
          render json: @combo_attempt, status: :created
        else
          render json: @combo_attempt.errors, status: :unprocessable_entity
        end
      end

      def bulk_create
        combo_ids = params[:combo_ids]
        combo_attempts = combo_ids.map do |combo_id|
          { combo_id:, routine_session_id: @routine_session.id }
        end

        if ComboAttempt.insert_all(combo_attempts)
          render status: :created
        else
          render status: :unprocessable_entity
        end
      end

      def update
        if @combo_attempt.update(combo_attempt_params)
          render json: @combo_attempt
        else
          render json: @combo_attempt.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @combo_attempt.destroy
      end

      private

      def set_combo_attempt
        @combo_attempt = ComboAttempt.find_by(id: params[:id])
        return unless @combo_attempt.nil?

        render json: { error: 'Combo attempt not found' }, status: :not_found
      end

      def combo_attempt_params
        params.require(:combo_attempt).permit(:reps_done, :reps_correct)
      end
    end
  end
end
