# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  post 'auth/sign_in', to: 'auth#sign_in'
  post 'auth/sign_up', to: 'auth#sign_up'
  post 'auth/sign_out', to: 'auth#sign_out'

  # Defines the root path route ("/")
  # root "posts#index"
end
