# frozen_string_literal: true

module Api
  module V1
    class CombosController < ApplicationController
      before_action :set_combo, only: %i[show update destroy]
      rescue_from ActiveRecord::RecordNotDestroyed, with: :not_destroyed

      def index
        @combos = Combo.where(routine_id: params[:routine_id])
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
        if @combo.update(routine_params)
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
        params.require(:combo).permit(:name, { inputs: [] }, :notes, :routine_id)
      end
    end
  end
end
