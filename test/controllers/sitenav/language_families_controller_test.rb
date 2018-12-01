require 'test_helper'

class Sitenav::LanguageFamiliesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get sitenav_language_families_index_url
    assert_response :success
  end

  test "should get one" do
    get sitenav_language_families_one_url
    assert_response :success
  end

end
