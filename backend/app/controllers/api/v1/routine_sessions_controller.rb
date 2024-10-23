module Api
  module V1
    class RoutineSessionsController < ApplicationController
      before_action :set_routine_session, only: %w[show update destroy]
      def index
        @routine_sessions = RoutineSession.where(user_id: @current_user[:id])
      end

      def create
        @routine_session = RoutineSession.new(routine_session_params.merge(user_id: @current_user[:id]))
        if @routine_session.save
          render json: @routine_session, status: :created
        else
          render json: @routine_session.errors, status: :unprocessable_entity
        end
      end

      def update; end

      def destroy
        @routine_session.destroy
      end

      def show
        render json: @routine_session
      end

      private

      def set_routine_session
        @routine_session = RoutineSession.find_by(id: routine_session_params[:id])
        if @routine_session.nil?
          render json: { error: 'Routine session not found' }, status: :not_found
          nil
        elsif @routine_session.user_id != @current_user[:id]
          render json: { error: 'Not authorized' }, status: :unauthorized
          nil
        end
      end

      def routine_session_params
        params.require(:routine_session).permit(:routine_id)
      end
    end
  end
end
