module Api
  module V1
    class RoutineSessionsController < ApplicationController
      before_action :set_routine_session, only: %i[show update destroy]

      def index
        @routine_sessions = RoutineSession
                            .includes(:routine)
                            .where(user_id: @current_user[:id])
                            .order('completed_at DESC')
        render json: @routine_sessions, include: :routine
      end

      def create
        routine = Routine.includes(:combos).find(routine_session_params[:routine_id])
        service = RoutineSessionCreator.new(user: @current_user, routine:)
        routine_session = service.call
        if routine_session
          render json: @routine_session, status: :created
        else
          render json: @routine_session.errors, status: :unprocessable_entity
        end
      end

      # TODO: slim down this method
      def active
        @active_session = RoutineSession
                          .includes(:routine, combo_attempts: :combo)
                          .find_by(user_id: @current_user[:id], completed: false)
        if @active_session
          merged_data = @active_session.combo_attempts.map do |attempt|
            {
              id: attempt.id,
              routine_session_id: attempt.routine_session_id,
              combo_id: attempt.combo.id,
              combo_name: attempt.combo.name,
              inputs: attempt.combo.inputs,
              notes: attempt.combo.notes,
              feedback: attempt.feedback,
              reps_done: attempt.reps_done,
              reps_correct: attempt.reps_correct
            }
          end
          render json: {
            id: @active_session.id,
            routine: @active_session.routine,
            combo_attempts: merged_data
          }
        else
          render json: { error: 'No active session found' }, status: :not_found
        end
      end

      def update
        if @routine_session.update(routine_session_params)
          render json: @routine_session
        else
          render json: @routine.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @routine_session.destroy
      end

      def show
        render json: @routine_session, include: :routine
      end

      private

      def set_routine_session
        @routine_session = RoutineSession.includes(:routine).find_by(id: params[:id])
        if @routine_session.nil?
          render json: { error: 'Routine session not found' }, status: :not_found
          nil
        elsif @routine_session.user_id != @current_user[:id]
          render json: { error: 'Not authorized' }, status: :unauthorized
          nil
        end
      end

      def routine_session_params
        params.require(:routine_session).permit(:id, :routine_id, :completed_at, :completed)
      end
    end
  end
end
