# frozen_string_literal: true

class RoutinesController < ApplicationController
  before_action :set_routine, only: %i[show update destroy]
  def index
    @routines = Routine.where(user_id: params[:user_id])
    render json: @routines
  end

  def create
    @routine = Routine.new(routine_params)
    if @routine.save
      render json: @routine, location: @routine
    else
      render json: @routine.errors
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
    @routine = Routine.find(params[:id])
    return unless @routine.user_id != params[:user_id]

    render json: { error: 'Not authorized' }, status: :unauthorized
  end

  def routine_params
    params.require(:routine).permit(:game, :title, :notes, :combos, :user_id)
  end
end
