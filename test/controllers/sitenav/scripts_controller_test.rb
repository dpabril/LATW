require 'test_helper'

class Sitenav::ScriptsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get sitenav_scripts_index_url
    assert_response :success
  end

  test "should get one" do
    get sitenav_scripts_one_url
    assert_response :success
  end

end
