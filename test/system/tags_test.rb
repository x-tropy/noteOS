require "application_system_test_case"

class TagsTest < ApplicationSystemTestCase
  setup do
    @tag = tags(:one)
  end

  test "visiting the index" do
    visit tags_url
    assert_selector "h1", text: "Tags"
  end

  test "should create tag" do
    visit tags_url
    click_on "New tag"

    fill_in "Color", with: @tag.color
    fill_in "Name", with: @tag.name
    fill_in "User", with: @tag.user_id
    click_on "Create Tag"

    assert_text "Tag was successfully created"
    click_on "Back"
  end

  test "should update Tag" do
    visit tag_url(@tag)
    click_on "Edit this tag", match: :first

    fill_in "Color", with: @tag.color
    fill_in "Name", with: @tag.name
    fill_in "User", with: @tag.user_id
    click_on "Update Tag"

    assert_text "Tag was successfully updated"
    click_on "Back"
  end

  test "should destroy Tag" do
    visit tag_url(@tag)
    click_on "Destroy this tag", match: :first

    assert_text "Tag was successfully destroyed"
  end
end
