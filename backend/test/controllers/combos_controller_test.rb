require "test_helper"

class CombosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get combos_index_url
    assert_response :success
  end

  test "should get create" do
    get combos_create_url
    assert_response :success
  end

  test "should get update" do
    get combos_update_url
    assert_response :success
  end

  test "should get destroy" do
    get combos_destroy_url
    assert_response :success
  end

  test "should get show" do
    get combos_show_url
    assert_response :success
  end
end
