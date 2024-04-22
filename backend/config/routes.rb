# frozen_string_literal: true

Rails.application.routes.draw do
  resources :routines
  get 'up' => 'rails/health#show', as: :rails_health_check
end
