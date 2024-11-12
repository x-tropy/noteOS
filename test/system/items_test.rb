require "application_system_test_case"

class ItemsTest < ApplicationSystemTestCase
  setup do
    @attachment = items(:one)
  end

  test "visiting the index" do
    visit items_url
    assert_selector "h1", text: "Items"
  end

  test "should create attachment" do
    visit items_url
    click_on "New attachment"

    fill_in "Name", with: @attachment.name
    click_on "Create Attachment"

    assert_text "Attachment was successfully created"
    click_on "Back"
  end

  test "should update Attachment" do
    visit item_url(@attachment)
    click_on "Edit this attachment", match: :first

    fill_in "Name", with: @attachment.name
    click_on "Update Attachment"

    assert_text "Attachment was successfully updated"
    click_on "Back"
  end

  test "should destroy Attachment" do
    visit item_url(@attachment)
    click_on "Destroy this attachment", match: :first

    assert_text "Attachment was successfully destroyed"
  end
end
