require 'test_helper'

class Sitenav::SiteControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get sitenav_site_home_url
    assert_response :success
  end

  test "should get search" do
    get sitenav_site_search_url
    assert_response :success
  end

end
