require 'test_helper'

class Sitenav::LanguagesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get sitenav_languages_index_url
    assert_response :success
  end

  test "should get one" do
    get sitenav_languages_one_url
    assert_response :success
  end

end
