require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get articles_index_url
    assert_response :success
  end

  test "should get show" do
    get articles_show_url
    assert_response :success
  end

  test "should get new" do
    get articles_new_url
    assert_response :success
  end

  test "should get create" do
    get articles_create_url
    assert_response :success
  end

  test "should get edit" do
    get articles_edit_url
    assert_response :success
  end

  test "should get update" do
    get articles_update_url
    assert_response :success
  end
end
