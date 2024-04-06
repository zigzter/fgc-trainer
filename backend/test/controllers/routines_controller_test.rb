require "test_helper"

class RoutinesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get routines_index_url
    assert_response :success
  end

  test "should get create" do
    get routines_create_url
    assert_response :success
  end

  test "should get update" do
    get routines_update_url
    assert_response :success
  end

  test "should get destroy" do
    get routines_destroy_url
    assert_response :success
  end

  test "should get show" do
    get routines_show_url
    assert_response :success
  end
end
