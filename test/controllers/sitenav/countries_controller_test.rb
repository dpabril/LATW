require 'test_helper'

class Sitenav::CountriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get sitenav_countries_index_url
    assert_response :success
  end

  test "should get one" do
    get sitenav_countries_one_url
    assert_response :success
  end

end
