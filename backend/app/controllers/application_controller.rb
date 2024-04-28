require 'jwt'
require 'net/http'

class ApplicationController < ActionController::API
  before_action :authenticate_request
  rescue_from ActiveRecord::RecordNotDestroyed, with: :not_destroyed
  attr_reader :current_user

  private

  def authenticate_request
    auth_header = request.headers['Authorization']
    token = auth_header.split(' ').last if auth_header
    decoded_token = decode_token(token)
    @current_user = {
      username: decoded_token['username'],
      id: decoded_token['sub']
    }
  rescue JWT::DecodeError => e
    puts e
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  end

  def decode_token(token)
    _, header = JWT.decode(token, nil, false, { algorithm: 'RS256' })
    # TODO: Cache or store this
    jwks_raw = Net::HTTP.get URI('https://cognito-idp.us-east-1.amazonaws.com/us-east-1_lQbpoIEmv/.well-known/jwks.json')
    jwks_hash = JSON.parse(jwks_raw)
    jwk = jwks_hash['keys'].find { |key| key['kid'] == header['kid'] }
    raise 'JWK key not found for kid' unless jwk

    decoding_key = JWT::JWK.import(jwk).public_key
    options = {
      algorithm: 'RS256',
      verify_iat: true,
      verify_expiration: true,
      verify_not_before: true,
      iss: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_lQbpoIEmv',
      verify_iss: true
    }
    decoded_token = JWT.decode(token, decoding_key, true, options).first

    # The built-in audience verifying expects an "aud" key, which AWS puts under the "client_id" key
    expected_client_id = '18kvmudvk3dnl76n62hqltt7pm'
    raise JWT::VerificationError, 'Invalid client_id.' unless decoded_token['client_id'] == expected_client_id

    decoded_token
  end

  def not_destroyed(error)
    render json: { errors: error.record.errors }, status: :unprocessable_entity
  end
end
