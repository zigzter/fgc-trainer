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

      def active
        @active_session = RoutineSession
                          .includes(routine: :combos)
                          .find_by(user_id: @current_user[:id], completed: false)
        if @active_session
          render json: @active_session, include: { routine: { include: :combos } }
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
