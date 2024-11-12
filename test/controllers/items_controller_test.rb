require "test_helper"

class ItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @attachment = items(:one)
  end

  test "should get index" do
    get items_url
    assert_response :success
  end

  test "should get new" do
    get new_item_url
    assert_response :success
  end

  test "should create attachment" do
    assert_difference("Attachment.count") do
      post items_url, params: { attachment: { name: @attachment.name } }
    end

    assert_redirected_to item_url(Attachment.last)
  end

  test "should show attachment" do
    get item_url(@attachment)
    assert_response :success
  end

  test "should get edit" do
    get edit_item_url(@attachment)
    assert_response :success
  end

  test "should update attachment" do
    patch item_url(@attachment), params: { attachment: { name: @attachment.name } }
    assert_redirected_to item_url(@attachment)
  end

  test "should destroy attachment" do
    assert_difference("Attachment.count", -1) do
      delete item_url(@attachment)
    end

    assert_redirected_to items_url
  end
end
