class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def generate_id
    SecureRandom.alphanumeric(8)
  end
end
