# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :routines
      resources :combos
      resources :routine_sessions do
        collection do
          get :active
        end
      end
      resources :combo_attempts
    end
  end
  get 'up' => 'rails/health#show', as: :rails_health_check
end
