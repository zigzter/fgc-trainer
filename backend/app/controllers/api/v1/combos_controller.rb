# frozen_string_literal: true

module Api
  module V1
    class CombosController < ApplicationController
      before_action :set_combo, only: %i[show update destroy]
      rescue_from ActiveRecord::RecordNotDestroyed, with: :not_destroyed

      def index
        @combos = Combo.where(routine_id: params[:routine_id]).order(:position)
        render json: @combos
      end

      def create
        @combo = Combo.new(combo_params)
        if @combo.save
          render json: @combo, status: :created
        else
          render json: @combo.errors, status: :unprocessable_entity
        end
      end

      def update
        relative_position = combo_params[:direction]
        target = combo_params[:target]
        position_params = if relative_position && target
                            { position: { relative_position => target } }
                          else
                            {}
                          end
        if @combo.update(combo_params.except(:direction, :target).merge(position_params))
          render json: @combo
        else
          render json: @combo.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @combo.destroy
      end

      def show
        render json: @combo
      end

      private

      def set_combo
        @combo = Combo.find_by(id: params[:id])
        return unless @combo.nil?

        render json: { error: 'Combo not found' }, status: :not_found
        nil
      end

      def combo_params
        params.require(:combo).permit(
          :id,
          :name,
          :notes,
          :reps,
          :position,
          :routine_id,
          :created_at,
          :updated_at,
          :target,
          :direction,
          inputs: []
        )
      end

      def reorder_params
        params.require(:combo).permit(before: [:id])
      end
    end
  end
end
