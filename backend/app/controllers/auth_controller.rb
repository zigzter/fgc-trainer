# frozen_string_literal: true

class AuthController < ApplicationController
  def sign_in
    user = {
      USERNAME: params[:username],
      PASSWORD: params[:password]
    }
    begin
      resp = Cognito.authenticate(user).authentication_result
    rescue StandardError => e
      resp = e
    end
    render json: resp
  end

  def sign_up
    user = {
      USERNAME: params[:username],
      PASSWORD: params[:password],
      EMAIL: params[:email]
    }
    begin
      resp = Cognito.create_user(user)
    rescue StandardError => e
      resp = e
    end
    render json: resp
  end

  def sign_out
    if request.headers['Authorization']
      Cognito.sign_out(request.headers['Authorization'])
      resp = { type: 'success', message: 'Successfully signed out' }
    else
      resp = { type: 'error', message: 'empty token' }
    end
    render json: resp
  end
end
