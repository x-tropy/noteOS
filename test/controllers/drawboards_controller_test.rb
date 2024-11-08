require "test_helper"

class DrawboardsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get drawboards_index_url
    assert_response :success
  end

  test "should get show" do
    get drawboards_show_url
    assert_response :success
  end

  test "should get new" do
    get drawboards_new_url
    assert_response :success
  end

  test "should get edit" do
    get drawboards_edit_url
    assert_response :success
  end
end
