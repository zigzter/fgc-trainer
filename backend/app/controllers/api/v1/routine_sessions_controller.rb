module Api
  module V1
    class RoutineSessionsController < ApplicationController
      before_action :set_routine_session, only: %i[show update destroy]

      def index
        @routine_sessions = RoutineSession.includes(:routine).where(user_id: @current_user[:id])
        render json: @routine_sessions, include: :routine
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
        @routine_session = RoutineSession.includes(:routine).find_by(id: params[:id])
        if @routine_session.nil?
          render json: { error: 'Routine session not found' }, status: :not_found
          nil
        elsif @routine_session.user_id != @current_user[:id]
          render json: { error: 'Not authorized' }, status: :unauthorized
          nil
        else
          render json: @routine_session, include: :routine
        end
      end

      def routine_session_params
        params.require(:routine_session).permit(:routine_id)
      end
    end
  end
end
