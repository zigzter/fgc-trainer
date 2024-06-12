# frozen_string_literal: true

module Api
  module V1
    class RoutinesController < ApplicationController
      before_action :set_routine, only: %i[show update destroy]
      rescue_from ActiveRecord::RecordNotDestroyed, with: :not_destroyed

      def index
        @routines = Routine.where(user_id: @current_user[:id])
        render json: @routines
      end

      def create
        @routine = Routine.new(routine_params.merge(user_id: @current_user[:id]))
        if @routine.save
          render json: @routine, status: :created
        else
          render json: @routine.errors, status: :unprocessable_entity
        end
      end

      def update
        if @routine.update(routine_params)
          render json: @routine
        else
          render json: @routine.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @routine.destroy
      end

      def show
        render json: @routine
      end

      private

      def set_routine
        @routine = Routine.find_by(id: params[:id])
        if @routine.nil?
          render json: { error: 'Routine not found' }, status: :not_found
          nil
        elsif @routine.user_id != @current_user[:id]
          render json: { error: 'Not authorized' }, status: :unauthorized
          nil
        end
      end

      def routine_params
        params.require(:routine).permit(:game, :title, :notes)
      end

      def not_destroyed
        render json: {}, status: :unprocessable_entity
      end
    end
  end
end
